import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  const href = `/blog/${post.id}`;
  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Date badge */}
        <div className="absolute left-4 top-4 flex flex-col items-center bg-white px-3 py-2 text-center shadow-sm">
          <span className="font-display text-[20px] leading-none text-brand">
            {post.date.day}
          </span>
          <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-body">
            {post.date.month}
          </span>
        </div>
      </Link>

      <div className="mt-5">
        <Link href={href}>
          <h3 className="font-display text-[22px] text-heading-soft transition-colors group-hover:text-brand">
            {post.title}
          </h3>
        </Link>
        <p className="mt-3 text-[14px] font-light leading-relaxed text-body">
          {post.excerpt}
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-button text-brand transition-all hover:gap-2.5"
        >
          Read More <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
