"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, X, ShoppingBag, GitCompareArrows } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { useStore } from "@/context/StoreContext";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-0.5">
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

export default function ComparePage() {
  const { compare, removeFromCompare, clearCompare, addToCart } = useStore();

  return (
    <main>
      <PageBanner title="Compare Products" crumbs={[{ label: "Compare" }]} />

      <section className="container-x py-16">
        {compare.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
            <GitCompareArrows className="h-16 w-16 text-black/15" />
            <p className="text-[16px] font-light text-body">
              You haven&apos;t added any products to compare yet.
            </p>
            <Link href="/shop" className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <tbody>
                {/* Product image + name */}
                <tr>
                  <Th>Product</Th>
                  {compare.map((p) => (
                    <td key={p.id} className="border border-black/10 p-4 align-top">
                      <div className="relative mx-auto mb-3 aspect-[3/4] w-full max-w-[180px] overflow-hidden bg-[#f6f6f6]">
                        <Image src={p.image} alt={p.name} fill sizes="180px" className="object-cover" />
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          aria-label={`Remove ${p.name}`}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-heading-soft shadow transition hover:bg-brand hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <Link
                        href={`/product/${p.id}`}
                        className="block text-center text-[15px] font-medium text-heading-soft transition hover:text-brand"
                      >
                        {p.name}
                      </Link>
                    </td>
                  ))}
                </tr>

                {/* Price */}
                <tr>
                  <Th>Price</Th>
                  {compare.map((p) => (
                    <Td key={p.id}>
                      <span className="font-semibold text-brand">
                        {p.currency ?? "DHS"} {p.price}
                      </span>
                      {p.regularPrice != null && (
                        <span className="ml-2 font-light text-body line-through">
                          {p.currency ?? "DHS"} {p.regularPrice}
                        </span>
                      )}
                    </Td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <Th>Rating</Th>
                  {compare.map((p) => (
                    <Td key={p.id}>
                      <Stars rating={p.rating} />
                    </Td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <Th>Category</Th>
                  {compare.map((p) => (
                    <Td key={p.id}>{p.category ?? "Fragrance"}</Td>
                  ))}
                </tr>

                {/* Availability */}
                <tr>
                  <Th>Availability</Th>
                  {compare.map((p) => (
                    <Td key={p.id}>
                      <span className="text-brand">In stock</span>
                    </Td>
                  ))}
                </tr>

                {/* Add to cart */}
                <tr>
                  <Th>Actions</Th>
                  {compare.map((p) => (
                    <Td key={p.id}>
                      <button
                        onClick={() => addToCart(p)}
                        className="inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-[11px] font-medium uppercase tracking-button text-white transition hover:bg-brand-dark"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" /> Add To Cart
                      </button>
                    </Td>
                  ))}
                </tr>
              </tbody>
            </table>

            <div className="mt-8 flex justify-end">
              <button
                onClick={clearCompare}
                className="text-[12px] font-medium uppercase tracking-button text-body transition hover:text-brand"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="w-[140px] border border-black/10 bg-mint/50 p-4 text-left text-[12px] font-semibold uppercase tracking-button text-heading-soft">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-black/10 p-4 text-center text-[14px] text-body">
      {children}
    </td>
  );
}
