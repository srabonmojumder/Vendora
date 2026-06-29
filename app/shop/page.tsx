"use client";

import { useMemo, useState } from "react";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { allProducts, categories } from "@/lib/data";

const SORTS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
] as const;

type SortValue = (typeof SORTS)[number]["value"];

export default function ShopPage() {
  const [sort, setSort] = useState<SortValue>("default");
  const [onlySale, setOnlySale] = useState(false);

  const products = useMemo(() => {
    let list = [...allProducts];
    if (onlySale) list = list.filter((p) => p.regularPrice != null);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [sort, onlySale]);

  return (
    <main>
      <PageBanner title="Shop" crumbs={[{ label: "Shop" }]} />

      <section className="container-x py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar — sticky on desktop while the product grid scrolls */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto no-scrollbar">
            <div>
              <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-button text-heading-soft">
                Categories
              </h3>
              <ul className="space-y-2.5">
                {categories.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between text-[14px] font-light text-body"
                  >
                    <span className="cursor-pointer transition hover:text-brand">
                      {c.name}
                    </span>
                    <span className="text-[12px]">({c.itemCount})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-button text-heading-soft">
                Filter
              </h3>
              <label className="flex cursor-pointer items-center gap-2.5 text-[14px] font-light text-body">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => setOnlySale(e.target.checked)}
                  className="h-4 w-4 accent-brand"
                />
                On sale only
              </label>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-8 flex flex-col gap-3 border-b border-black/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-body">
                Showing <span className="text-heading-soft">{products.length}</span>{" "}
                products
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                className="border border-black/15 bg-white px-3 py-2 text-[13px] text-heading-soft focus:border-brand focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {products.length === 0 ? (
              <p className="py-16 text-center text-[15px] font-light text-body">
                No products match your filters.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
                {products.map((p, i) => (
                  <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
