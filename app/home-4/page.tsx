import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import TrendyCTA from "@/components/TrendyCTA";
import ValueProps from "@/components/ValueProps";
import BlogSection from "@/components/BlogSection";
import { mostWanted } from "@/lib/data";

export const metadata: Metadata = { title: "Home 04 — Vendora" };

/** Home 04 — minimal, product-focused layout. */
export default function HomeFour() {
  return (
    <main>
      <Hero />

      <ValueProps />

      <ProductGrid
        title="Featured Fragrances"
        products={mostWanted}
        tabs={[
          { label: "Featured", value: "featured" },
          { label: "Latest", value: "latest" },
          { label: "Top Rating", value: "top-rating" },
        ]}
      />

      <PromoBanner
        variant="light"
        label="New Season"
        headingBefore="Fresh Notes For The"
        accent="Modern"
        headingAfter="Icon"
        buttonLabel="See More"
        image="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80"
      />

      <TrendyCTA />

      <BlogSection />
    </main>
  );
}
