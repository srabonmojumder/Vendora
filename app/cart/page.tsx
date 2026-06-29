"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import CouponField from "@/components/CouponField";
import { useStore } from "@/context/StoreContext";

export default function CartPage() {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    coupon,
    updateQty,
    removeFromCart,
    clearCart,
  } = useStore();

  return (
    <main>
      <PageBanner title="Shopping Cart" crumbs={[{ label: "Cart" }]} />

      <section className="container-x py-16">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
            <ShoppingBag className="h-16 w-16 text-black/15" />
            <p className="text-[16px] font-light text-body">
              Your cart is currently empty.
            </p>
            <Link href="/shop" className="btn-primary">
              Return To Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
            {/* Items table */}
            <div>
              {/* Header row (desktop) */}
              <div className="hidden border-b border-black/10 pb-4 text-[11px] font-semibold uppercase tracking-button text-body sm:grid sm:grid-cols-[1fr_120px_120px_40px]">
                <span>Product</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Subtotal</span>
                <span />
              </div>

              <ul>
                {cart.map(({ product, qty }) => (
                  <li
                    key={product.id}
                    className="grid grid-cols-[80px_1fr] items-center gap-4 border-b border-black/[0.07] py-5 sm:grid-cols-[1fr_120px_120px_40px]"
                  >
                    {/* Product */}
                    <div className="col-span-2 flex items-center gap-4 sm:col-span-1">
                      <Link
                        href={`/product/${product.id}`}
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
                      <div>
                        <Link
                          href={`/product/${product.id}`}
                          className="text-[15px] font-medium text-heading-soft transition hover:text-brand"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-[14px] font-semibold text-brand">
                          {product.currency ?? "DHS"} {product.price}
                        </p>
                      </div>
                    </div>

                    {/* Qty */}
                    <div className="flex items-center sm:justify-center">
                      <div className="flex items-center border border-black/15">
                        <button
                          onClick={() => updateQty(product.id, qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-9 w-9 items-center justify-center text-heading-soft transition hover:bg-black/5"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-[14px] font-medium">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQty(product.id, qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-9 w-9 items-center justify-center text-heading-soft transition hover:bg-black/5"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <span className="text-[15px] font-semibold text-heading-soft sm:text-right">
                      {product.currency ?? "DHS"} {(product.price * qty).toLocaleString()}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="justify-self-end text-body transition hover:text-brand"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/shop"
                  className="text-[12px] font-medium uppercase tracking-button text-brand transition hover:opacity-70"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-[12px] font-medium uppercase tracking-button text-body transition hover:text-brand"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Summary */}
            <aside className="h-fit border border-black/10 p-7">
              <h2 className="mb-6 text-[15px] font-semibold uppercase tracking-button text-heading-soft">
                Cart Totals
              </h2>
              <div className="flex items-center justify-between border-b border-black/10 py-3 text-[14px]">
                <span className="text-body">Subtotal</span>
                <span className="font-medium text-heading-soft">
                  DHS {cartSubtotal.toLocaleString()}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between border-b border-black/10 py-3 text-[14px]">
                  <span className="text-body">
                    Discount {coupon ? `(${coupon.code})` : ""}
                  </span>
                  <span className="font-medium text-brand">
                    − DHS {discountAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between border-b border-black/10 py-3 text-[14px]">
                <span className="text-body">Shipping</span>
                <span className="font-medium text-heading-soft">
                  {shippingFee === 0 ? "Free" : `DHS ${shippingFee}`}
                </span>
              </div>

              {/* Coupon */}
              <div className="py-4">
                <CouponField />
              </div>

              <div className="flex items-center justify-between border-t border-black/10 py-4 text-[16px]">
                <span className="font-semibold text-heading-soft">Total</span>
                <span className="font-semibold text-brand">
                  DHS {cartTotal.toLocaleString()}
                </span>
              </div>
              <Link href="/checkout" className="btn-primary mt-2 w-full">
                Proceed To Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
