import type { Metadata } from "next";
import PromoBanner from "@/components/PromoBanner";
import CategoryCarousel from "@/components/CategoryCarousel";
import BlogSection from "@/components/BlogSection";
import ProductGrid from "@/components/ProductGrid";
import TrendyCTA from "@/components/TrendyCTA";
import ValueProps from "@/components/ValueProps";
import { newArrivals } from "@/lib/data";

export const metadata: Metadata = { title: "Home 05 — Vendora" };

/** Home 05 — editorial / look-book forward layout. */
export default function HomeFive() {
  return (
    <main>
      <PromoBanner
        variant="light"
        label="The Look Book"
        headingBefore="A Curated World Of"
        accent="Luxury"
        headingAfter="Fragrance"
        buttonLabel="View Look Book"
        image="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80"
      />

      <CategoryCarousel />

      <BlogSection />

      <ProductGrid
        title="From The Journal"
        products={newArrivals}
        tabs={[
          { label: "All", value: "all" },
          { label: "Acne Prone", value: "acne-prone" },
          { label: "Hypersensitive Skin", value: "hypersensitive" },
        ]}
      />

      <ValueProps />

      <TrendyCTA title="Step Into The Vendora World" buttonLabel="Shop All Products" />
    </main>
  );
}
