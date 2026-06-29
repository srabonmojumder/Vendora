import { blogPosts } from "@/lib/data";
import BlogCard from "./BlogCard";
import Reveal from "./Reveal";

export default function BlogSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-x">
        <Reveal className="mb-12 text-center">
          <h2 className="section-title text-[34px] sm:text-[44px]">Latest News</h2>
          <p className="mt-3 text-[15px] font-light text-body">
            Your source for the latest company news and insights.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
