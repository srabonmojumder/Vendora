"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export interface ProductTab {
  label: string;
  value: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  tabs: ProductTab[];
}

/** Applies the active tab to the product list. */
function filterProducts(products: Product[], value: string): Product[] {
  switch (value) {
    case "all":
    case "featured":
      return products;
    case "acne-prone":
      return products.filter((p) => p.tag === "acne-prone");
    case "hypersensitive":
      return products.filter((p) => p.tag === "hypersensitive");
    case "latest":
      return [...products].reverse();
    case "top-rating":
      return [...products].sort((a, b) => b.rating - a.rating);
    default:
      return products;
  }
}

export default function ProductGrid({ title, products, tabs }: ProductGridProps) {
  const [active, setActive] = useState(tabs[0]?.value ?? "all");
  const visible = useMemo(
    () => filterProducts(products, active),
    [products, active]
  );

  return (
    <section className="py-14 lg:py-20">
      <div className="container-x">
        {/* Heading row */}
        <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="section-title text-[34px] leading-tight sm:text-[42px]">
            {title}
          </h2>
          <div className="flex flex-wrap gap-6">
            {tabs.map((tab) => {
              const isActive = tab.value === active;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActive(tab.value)}
                  className={`relative pb-1.5 text-[12px] font-medium uppercase tracking-button transition-colors ${
                    isActive ? "text-brand" : "text-body hover:text-heading-soft"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((product, i) => (
            <Reveal key={product.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
