"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, X, ShoppingBag } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { useStore } from "@/context/StoreContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <main>
      <PageBanner title="Wishlist" crumbs={[{ label: "Wishlist" }]} />

      <section className="container-x py-16">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
            <Heart className="h-16 w-16 text-black/15" />
            <p className="text-[16px] font-light text-body">
              Your wishlist is empty.
            </p>
            <Link href="/shop" className="btn-primary">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group relative flex gap-4 border border-black/10 p-4"
              >
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 text-body transition hover:text-brand"
                >
                  <X className="h-4 w-4" />
                </button>

                <Link
                  href={`/product/${product.id}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden bg-[#f6f6f6]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-col">
                  <Link
                    href={`/product/${product.id}`}
                    className="text-[15px] font-medium text-heading-soft transition hover:text-brand"
                  >
                    {product.name}
                  </Link>
                  <span className="mt-1 text-[14px] font-semibold text-brand">
                    {product.currency ?? "DHS"} {product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-auto inline-flex w-fit items-center gap-2 bg-brand px-4 py-2 text-[11px] font-medium uppercase tracking-button text-white transition hover:bg-brand-dark"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
