"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Repeat, Plus, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-[#f5a623] text-[#f5a623]" : "fill-black/10 text-black/10"
          }`}
        />
      ))}
    </div>
  );
}

function ActionIcon({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all duration-300 hover:bg-brand hover:text-white ${
        active ? "bg-brand text-white" : "bg-white text-heading-soft"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const currency = product.currency ?? "DHS";
  const onSale = product.regularPrice != null;
  const wished = isInWishlist(product.id);

  return (
    <div className="group flex flex-col">
      {/* Image area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f6f6f6]">
        {product.discount != null && (
          <span className="absolute left-0 top-0 z-10 bg-brand px-2.5 py-1 text-[11px] font-medium tracking-wide text-white">
            -{product.discount}%
          </span>
        )}

        <Link href={`/product/${product.id}`} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Hover action icons */}
        <div className="absolute inset-x-0 bottom-4 flex translate-y-3 items-center justify-center gap-2.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ActionIcon
            label="Add to wishlist"
            active={wished}
            onClick={() => toggleWishlist(product)}
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
          </ActionIcon>
          <ActionIcon label="Compare" onClick={() => addToCart(product)}>
            <Repeat className="h-4 w-4" />
          </ActionIcon>
          <ActionIcon label="Quick add to cart" onClick={() => addToCart(product)}>
            <Plus className="h-4 w-4" />
          </ActionIcon>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-col items-center text-center">
        <Stars rating={product.rating} />
        <Link
          href={`/product/${product.id}`}
          className="mt-2 text-[14px] font-medium text-heading-soft transition-colors hover:text-brand"
        >
          {product.name}
        </Link>
        <div className="mt-1.5 flex items-center justify-center gap-2 text-[14px]">
          <span className="font-semibold text-brand">
            {currency} {product.price}
          </span>
          {onSale && (
            <span className="font-light text-body line-through">
              {currency} {product.regularPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
