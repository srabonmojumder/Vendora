"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    updateQty,
    removeFromCart,
    isCartOpen,
    closeCart,
  } = useStore();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    if (isCartOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-[90] flex h-full w-[90%] max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-button text-heading-soft">
            <ShoppingBag className="h-4 w-4 text-brand" />
            Cart ({cartCount})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-1.5 text-heading-soft transition hover:bg-black/5 hover:text-brand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-black/15" />
            <p className="text-[14px] font-light text-body">
              Your cart is currently empty.
            </p>
            <button onClick={closeCart} className="btn-primary mt-2">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-black/[0.06]">
                {cart.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-4 py-4">
                    <Link
                      href={`/product/${product.id}`}
                      onClick={closeCart}
                      className="relative h-24 w-20 shrink-0 overflow-hidden bg-[#f6f6f6]"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${product.id}`}
                          onClick={closeCart}
                          className="text-[14px] font-medium text-heading-soft transition hover:text-brand"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-body transition hover:text-brand"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <span className="mt-1 text-[13px] font-semibold text-brand">
                        {product.currency ?? "DHS"} {product.price}
                      </span>

                      {/* Qty stepper */}
                      <div className="mt-auto flex items-center">
                        <div className="flex items-center border border-black/15">
                          <button
                            onClick={() => updateQty(product.id, qty - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-heading-soft transition hover:bg-black/5"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-9 text-center text-[13px] font-medium">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQty(product.id, qty + 1)}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center text-heading-soft transition hover:bg-black/5"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-black/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[13px] font-medium uppercase tracking-button text-heading-soft">
                  Subtotal
                </span>
                <span className="text-[18px] font-semibold text-brand">
                  DHS {cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/cart" onClick={closeCart} className="btn-outline w-full">
                  View Cart
                </Link>
                <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
