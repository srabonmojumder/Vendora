"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  CartItem,
  CheckoutDetails,
  Order,
  Product,
} from "@/lib/types";

/** Free shipping over this subtotal, otherwise a flat fee. */
export const SHIPPING_THRESHOLD = 200;
export const SHIPPING_FEE = 25;

interface StoreContextValue {
  /* Cart */
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  cartTotal: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;

  /* Orders */
  lastOrder: Order | null;
  placeOrder: (details: CheckoutDetails) => Order;

  /* Wishlist */
  wishlist: Product[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;

  /* UI */
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "vendora.cart";
const WISH_KEY = "vendora.wishlist";
const ORDER_KEY = "vendora.lastOrder";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Hydrate from localStorage on mount (avoids SSR mismatch).
  useEffect(() => {
    setCart(load<CartItem[]>(CART_KEY, []));
    setWishlist(load<Product[]>(WISH_KEY, []));
    setLastOrder(load<Order | null>(ORDER_KEY, null));
    setHydrated(true);
  }, []);

  // Persist on change (only after hydration so we don't clobber stored data).
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  /* ----------------------------- Cart ops ----------------------------- */
  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  /* --------------------------- Wishlist ops --------------------------- */
  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const isInWishlist = useCallback(
    (id: string) => wishlist.some((p) => p.id === id),
    [wishlist]
  );

  /* ----------------------------- Derived ------------------------------ */
  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart]
  );
  const cartSubtotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [cart]
  );
  const shippingFee = useMemo(
    () =>
      cartSubtotal === 0 || cartSubtotal >= SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FEE,
    [cartSubtotal]
  );
  const cartTotal = cartSubtotal + shippingFee;

  /* ----------------------------- Orders ------------------------------- */
  const placeOrder = useCallback(
    (details: CheckoutDetails): Order => {
      const subtotal = cart.reduce(
        (sum, i) => sum + i.product.price * i.qty,
        0
      );
      const shipping =
        subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
      const order: Order = {
        id: `GRJ-${Date.now().toString().slice(-8)}`,
        items: cart,
        subtotal,
        shipping,
        total: subtotal + shipping,
        details,
        createdAt: new Date().toISOString(),
      };
      setLastOrder(order);
      window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      setCart([]);
      return order;
    },
    [cart]
  );

  const value: StoreContextValue = {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    lastOrder,
    placeOrder,
    wishlist,
    wishlistCount: wishlist.length,
    toggleWishlist,
    isInWishlist,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    isSearchOpen,
    openSearch: () => setIsSearchOpen(true),
    closeSearch: () => setIsSearchOpen(false),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
