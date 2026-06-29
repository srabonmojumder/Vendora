import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ProductDetails from "@/components/ProductDetails";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { allProducts, getProductById, getRelatedProducts } from "@/lib/data";

export function generateStaticParams() {
  return allProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  return {
    title: product ? `${product.name} — Vendora` : "Product — Vendora",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(id, 4);

  return (
    <main>
      <PageBanner
        title={product.name}
        crumbs={[{ label: "Shop", href: "/shop" }, { label: product.name }]}
      />

      <ProductDetails product={product} />

      {/* Related products */}
      <section className="container-x pb-20">
        <Reveal className="mb-10 text-center">
          <h2 className="section-title text-[30px] sm:text-[40px]">
            You May Also Like
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
