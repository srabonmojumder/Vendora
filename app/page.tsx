import Hero from "@/components/Hero";
import CategoryCarousel from "@/components/CategoryCarousel";
import PromoBanner from "@/components/PromoBanner";
import ProductGrid from "@/components/ProductGrid";
import TrendyCTA from "@/components/TrendyCTA";
import BlogSection from "@/components/BlogSection";
import { newArrivals, mostWanted } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
        <Hero />

        <CategoryCarousel />

        {/* Promo banner 1 — mint */}
        <PromoBanner
          variant="light"
          label="New Arrival"
          headingBefore="Massive Fragrance Deals Up To"
          accent="50%"
          headingAfter="Discount!"
          buttonLabel="See More"
          image="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=80"
        />

        {/* New Arrival grid */}
        <ProductGrid
          title="New Arrival"
          products={newArrivals}
          tabs={[
            { label: "All", value: "all" },
            { label: "Acne Prone", value: "acne-prone" },
            { label: "Hypersensitive Skin", value: "hypersensitive" },
          ]}
        />

        {/* Promo banner 2 — dark */}
        <PromoBanner
          variant="dark"
          label="New Arrival"
          headingBefore=""
          accent="50%"
          headingAfter="Massive Fragrance Deals"
          buttonLabel="Shop Now"
          image="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1400&q=80"
        />

        {/* Most Wanted grid */}
        <ProductGrid
          title="Most Wanted Products"
          products={mostWanted}
          tabs={[
            { label: "Featured", value: "featured" },
            { label: "Latest", value: "latest" },
            { label: "Top Rating", value: "top-rating" },
          ]}
        />

        <TrendyCTA />

        <BlogSection />
    </main>
  );
}
