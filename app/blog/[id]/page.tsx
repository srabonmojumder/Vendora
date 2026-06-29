import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/Reveal";
import { blogPosts, getBlogPostById } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPostById(id);
  return { title: post ? `${post.title} — Vendora` : "Blog — Vendora" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getBlogPostById(id);
  if (!post) notFound();

  const more = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  return (
    <main>
      <PageBanner
        title={post.title}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <article className="container-x py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-[13px] text-body">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand" />
              {post.date.day} {post.date.month}, 2025
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-brand" /> By Vendora Team
            </span>
          </div>

          <h1 className="mt-4 font-display text-[30px] leading-tight text-heading-soft sm:text-[40px]">
            {post.title}
          </h1>

          <div className="mt-6 space-y-5 text-[15px] font-light leading-relaxed text-body">
            <p>{post.excerpt}</p>
            <p>
              A truly memorable fragrance is more than a scent — it is an
              experience, a signature, a quiet statement of who you are. At
              Vendora, every composition begins with the finest raw materials,
              hand-selected and balanced to create a harmony that unfolds
              throughout the day.
            </p>
            <p>
              From the bright, uplifting top notes to the warm, lingering
              base, each layer is designed to evolve on the skin and tell a
              story that is uniquely yours. Discover the art of fine perfumery
              and let your scent define your most confident moments.
            </p>
            <blockquote className="border-l-2 border-brand pl-5 text-[16px] italic text-heading-soft">
              &ldquo;A fragrance is the most intense form of memory.&rdquo;
            </blockquote>
            <p>
              Explore our curated collections and find the scent that speaks to
              your spirit — bold, vibrant and unmistakably you.
            </p>
          </div>

          <Link
            href="/blog"
            className="mt-10 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-button text-brand transition hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4" /> Back To Blog
          </Link>
        </div>
      </article>

      {/* Related posts */}
      <section className="container-x pb-20">
        <Reveal className="mb-10 text-center">
          <h2 className="section-title text-[28px] sm:text-[36px]">Related Posts</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-3">
          {more.map((p, i) => (
            <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
