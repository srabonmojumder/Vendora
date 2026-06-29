import type { Metadata } from "next";
import CategoryCarousel from "@/components/CategoryCarousel";
import PromoBanner from "@/components/PromoBanner";
import ProductGrid from "@/components/ProductGrid";
import TrendyCTA from "@/components/TrendyCTA";
import BlogSection from "@/components/BlogSection";
import ValueProps from "@/components/ValueProps";
import { newArrivals, mostWanted } from "@/lib/data";

export const metadata: Metadata = { title: "Home 02 — Vendora" };

/** Home 02 — category-led, best-sellers focused (no hero slider). */
export default function HomeTwo() {
  return (
    <main>
      <CategoryCarousel />

      <ProductGrid
        title="Best Sellers"
        products={mostWanted}
        tabs={[
          { label: "Featured", value: "featured" },
          { label: "Latest", value: "latest" },
          { label: "Top Rating", value: "top-rating" },
        ]}
      />

      <PromoBanner
        variant="light"
        label="Limited Time"
        headingBefore="Signature Scents Up To"
        accent="40%"
        headingAfter="Off This Week"
        buttonLabel="Shop Sale"
        image="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
      />

      <ProductGrid
        title="New Arrival"
        products={newArrivals}
        tabs={[
          { label: "All", value: "all" },
          { label: "Acne Prone", value: "acne-prone" },
          { label: "Hypersensitive Skin", value: "hypersensitive" },
        ]}
      />

      <ValueProps />

      <BlogSection />

      <TrendyCTA />
    </main>
  );
}
