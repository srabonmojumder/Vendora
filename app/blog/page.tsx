import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = { title: "Blog — Vendora" };

export default function BlogPage() {
  return (
    <main>
      <PageBanner title="Latest News" crumbs={[{ label: "Blog" }]} />

      <section className="container-x py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
