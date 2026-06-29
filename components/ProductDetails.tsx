"use client";

import { useState } from "react";
import {
  Star,
  Heart,
  Plus,
  Minus,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import ProductGallery from "./ProductGallery";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist, openCart } = useStore();
  const [qty, setQty] = useState(1);
  const currency = product.currency ?? "DHS";
  const onSale = product.regularPrice != null;
  const wished = isInWishlist(product.id);
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  return (
    <section className="container-x py-14 lg:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery slider */}
        <ProductGallery
          images={gallery}
          name={product.name}
          discount={product.discount}
        />

        {/* Info */}
        <div>
          {product.category && (
            <span className="text-[12px] font-medium uppercase tracking-button text-body">
              {product.category}
            </span>
          )}
          <h1 className="mt-2 font-display text-[34px] leading-tight text-heading-soft sm:text-[42px]">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating
                      ? "fill-[#f5a623] text-[#f5a623]"
                      : "fill-black/10 text-black/10"
                  }`}
                />
              ))}
            </div>
            <span className="text-[13px] text-body">({product.rating}.0 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-[26px] font-semibold text-brand">
              {currency} {product.price}
            </span>
            {onSale && (
              <span className="text-[18px] font-light text-body line-through">
                {currency} {product.regularPrice}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-prose text-[15px] font-light leading-relaxed text-body">
            {product.description}
          </p>

          {/* Qty + actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-black/15">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-12 w-12 items-center justify-center text-heading-soft transition hover:bg-black/5"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-[15px] font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-12 w-12 items-center justify-center text-heading-soft transition hover:bg-black/5"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => addToCart(product, qty)}
              className="btn-primary h-12 flex-1 sm:flex-none"
            >
              Add To Cart
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Add to wishlist"
              className={`flex h-12 w-12 items-center justify-center border transition ${
                wished
                  ? "border-brand bg-brand text-white"
                  : "border-black/15 text-heading-soft hover:border-brand hover:text-brand"
              }`}
            >
              <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
            </button>
          </div>

          <button
            onClick={() => {
              addToCart(product, qty);
              openCart();
            }}
            className="btn-outline mt-3 w-full sm:w-auto"
          >
            Buy It Now
          </button>

          {/* Trust badges */}
          <ul className="mt-8 space-y-3 border-t border-black/10 pt-6 text-[13px] text-body">
            <li className="flex items-center gap-3">
              <Check className="h-4 w-4 text-brand" /> In stock, ready to ship
            </li>
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-brand" /> Free shipping on orders over DHS 200
            </li>
            <li className="flex items-center gap-3">
              <RefreshCw className="h-4 w-4 text-brand" /> 30-day easy returns
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-brand" /> Secure checkout guaranteed
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
