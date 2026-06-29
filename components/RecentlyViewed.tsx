"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

/**
 * Records the current product as viewed, then renders the recently-viewed
 * strip (excluding the current product).
 */
export default function RecentlyViewed({ current }: { current: Product }) {
  const { recentlyViewed, addRecentlyViewed } = useStore();

  useEffect(() => {
    addRecentlyViewed(current);
  }, [current, addRecentlyViewed]);

  const items = recentlyViewed.filter((p) => p.id !== current.id).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="container-x pb-20">
      <Reveal className="mb-10 text-center">
        <h2 className="section-title text-[30px] sm:text-[40px]">Recently Viewed</h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
