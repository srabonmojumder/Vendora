"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  CartItem,
  CheckoutDetails,
  Coupon,
  Order,
  Product,
  Toast,
} from "@/lib/types";

/** Free shipping over this subtotal, otherwise a flat fee. */
export const SHIPPING_THRESHOLD = 200;
export const SHIPPING_FEE = 25;
export const MAX_COMPARE = 4;

/** Demo coupon codes (code → percent off). */
export const COUPONS: Record<string, number> = {
  VENDORA10: 10,
  WELCOME15: 15,
  SCENT20: 20,
};

interface StoreContextValue {
  /* Cart */
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  cartTotal: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;

  /* Coupon */
  coupon: Coupon | null;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;

  /* Orders */
  lastOrder: Order | null;
  placeOrder: (details: CheckoutDetails) => Order;

  /* Wishlist */
  wishlist: Product[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;

  /* Compare */
  compare: Product[];
  compareCount: number;
  addToCompare: (product: Product) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;

  /* Recently viewed */
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  /* Toasts */
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  dismissToast: (id: number) => void;

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
const COMPARE_KEY = "vendora.compare";
const COUPON_KEY = "vendora.coupon";
const RECENT_KEY = "vendora.recentlyViewed";

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
  const [compare, setCompare] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toastId = useRef(0);

  // Hydrate from localStorage on mount (avoids SSR mismatch).
  useEffect(() => {
    setCart(load<CartItem[]>(CART_KEY, []));
    setWishlist(load<Product[]>(WISH_KEY, []));
    setCompare(load<Product[]>(COMPARE_KEY, []));
    setRecentlyViewed(load<Product[]>(RECENT_KEY, []));
    setCoupon(load<Coupon | null>(COUPON_KEY, null));
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
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(COMPARE_KEY, JSON.stringify(compare));
  }, [compare, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
  }, [coupon, hydrated]);

  /* ----------------------------- Toasts ------------------------------- */
  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      const id = ++toastId.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2600);
    },
    []
  );

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

  /* ----------------------------- Coupon ------------------------------- */
  const applyCoupon = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return { ok: false, message: "Enter a coupon code." };
    const pct = COUPONS[normalized];
    if (!pct) return { ok: false, message: "Invalid coupon code." };
    setCoupon({ code: normalized, discountPct: pct });
    return { ok: true, message: `Coupon applied — ${pct}% off!` };
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

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

  /* ---------------------------- Compare ops --------------------------- */
  const addToCompare = useCallback((product: Product) => {
    setCompare((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompare((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isInCompare = useCallback(
    (id: string) => compare.some((p) => p.id === id),
    [compare]
  );

  const clearCompare = useCallback(() => setCompare([]), []);

  /* ------------------------- Recently viewed -------------------------- */
  const addRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) =>
      [product, ...prev.filter((p) => p.id !== product.id)].slice(0, 8)
    );
  }, []);

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
  const discountAmount = useMemo(
    () => (coupon ? Math.round((cartSubtotal * coupon.discountPct) / 100) : 0),
    [coupon, cartSubtotal]
  );
  const cartTotal = Math.max(0, cartSubtotal - discountAmount) + shippingFee;

  /* ----------------------------- Orders ------------------------------- */
  const placeOrder = useCallback(
    (details: CheckoutDetails): Order => {
      const subtotal = cart.reduce(
        (sum, i) => sum + i.product.price * i.qty,
        0
      );
      const discount = coupon
        ? Math.round((subtotal * coupon.discountPct) / 100)
        : 0;
      const shipping =
        subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
      const order: Order = {
        id: `VND-${Date.now().toString().slice(-8)}`,
        items: cart,
        subtotal,
        discount,
        shipping,
        total: Math.max(0, subtotal - discount) + shipping,
        couponCode: coupon?.code,
        details,
        createdAt: new Date().toISOString(),
      };
      setLastOrder(order);
      window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      setCart([]);
      setCoupon(null);
      return order;
    },
    [cart, coupon]
  );

  const value: StoreContextValue = {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    lastOrder,
    placeOrder,
    wishlist,
    wishlistCount: wishlist.length,
    toggleWishlist,
    isInWishlist,
    compare,
    compareCount: compare.length,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    recentlyViewed,
    addRecentlyViewed,
    toasts,
    addToast,
    dismissToast,
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
