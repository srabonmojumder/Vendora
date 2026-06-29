"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { searchProducts, allProducts } from "@/lib/data";

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchProducts(query), [query]);
  const popular = useMemo(() => allProducts.slice(0, 4), []);

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSearch();
    if (isSearchOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSearchOpen, closeSearch]);

  // Reset query when closed.
  useEffect(() => {
    if (!isSearchOpen) setQuery("");
  }, [isSearchOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isSearchOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isSearchOpen}
    >
      <div
        onClick={closeSearch}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div
        className={`relative mx-auto mt-0 w-full bg-white shadow-xl transition-transform duration-300 ${
          isSearchOpen ? "translate-y-0" : "-translate-y-6"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        <div className="container-x py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3 border-b-2 border-brand pb-2">
              <Search className="h-5 w-5 text-brand" />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus={isSearchOpen}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for fragrances..."
                className="w-full bg-transparent text-[16px] text-heading-soft placeholder:text-body focus:outline-none"
              />
            </div>
            <button
              onClick={closeSearch}
              aria-label="Close search"
              className="rounded-full p-1.5 text-heading-soft transition hover:bg-black/5 hover:text-brand"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Results */}
          <div className="mt-6 max-h-[60vh] overflow-y-auto">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-button text-body">
              {query.trim()
                ? `${results.length} result${results.length === 1 ? "" : "s"}`
                : "Popular products"}
            </p>

            {query.trim() && results.length === 0 ? (
              <p className="py-8 text-center text-[14px] font-light text-body">
                No products found for &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(query.trim() ? results : popular).map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 rounded p-2 transition hover:bg-mint"
                    >
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-[#f6f6f6]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-heading-soft">
                          {product.name}
                        </p>
                        <p className="text-[13px] font-semibold text-brand">
                          {product.currency ?? "DHS"} {product.price}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
