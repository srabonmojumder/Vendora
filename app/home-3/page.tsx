import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PromoBanner from "@/components/PromoBanner";
import ProductGrid from "@/components/ProductGrid";
import CategoryCarousel from "@/components/CategoryCarousel";
import TrendyCTA from "@/components/TrendyCTA";
import ValueProps from "@/components/ValueProps";
import { newArrivals, mostWanted } from "@/lib/data";

export const metadata: Metadata = { title: "Home 03 — Vendora" };

/** Home 03 — promo-forward, trending-first arrangement. */
export default function HomeThree() {
  return (
    <main>
      <Hero />

      <PromoBanner
        variant="dark"
        label="Editor's Pick"
        headingBefore="Discover The"
        accent="Art"
        headingAfter="Of Fine Fragrance"
        buttonLabel="Explore Now"
        image="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1400&q=80"
      />

      <ProductGrid
        title="Trending Now"
        products={newArrivals}
        tabs={[
          { label: "All", value: "all" },
          { label: "Acne Prone", value: "acne-prone" },
          { label: "Hypersensitive Skin", value: "hypersensitive" },
        ]}
      />

      <CategoryCarousel />

      <ValueProps />

      <ProductGrid
        title="Most Wanted Products"
        products={mostWanted}
        tabs={[
          { label: "Featured", value: "featured" },
          { label: "Latest", value: "latest" },
          { label: "Top Rating", value: "top-rating" },
        ]}
      />

      <TrendyCTA title="Find Your Signature Scent Today" buttonLabel="Browse Collection" />
    </main>
  );
}
