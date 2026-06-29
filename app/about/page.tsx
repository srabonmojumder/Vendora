import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Award, Sparkles, Heart } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "About Us — Vendora" };

const values = [
  { Icon: Leaf, title: "Natural Ingredients", text: "Ethically sourced essences, free from harsh chemicals." },
  { Icon: Award, title: "Master Crafted", text: "Blended by award-winning perfumers with decades of artistry." },
  { Icon: Sparkles, title: "Long Lasting", text: "High-concentration formulas that stay with you all day." },
  { Icon: Heart, title: "Cruelty Free", text: "Never tested on animals — beauty with a conscience." },
];

export default function AboutPage() {
  return (
    <main>
      <PageBanner title="About Us" crumbs={[{ label: "About Us" }]} />

      {/* Intro */}
      <section className="container-x grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
            alt="Vendora perfumery"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={1}>
          <span className="text-[12px] font-medium uppercase tracking-button text-brand/80">
            Our Story
          </span>
          <h2 className="mt-3 font-display text-[32px] leading-tight text-heading-soft sm:text-[44px]">
            Crafting Confidence, One Scent At A Time
          </h2>
          <p className="mt-5 text-[15px] font-light leading-relaxed text-body">
            Founded on a passion for fine fragrance, Vendora blends timeless
            tradition with modern artistry. Every bottle is a story — composed
            from the world&apos;s rarest essences and designed to celebrate the
            bold, the vibrant and the unforgettable.
          </p>
          <p className="mt-4 text-[15px] font-light leading-relaxed text-body">
            From the first spritz to the lingering dry-down, our perfumes are
            made to define your most confident moments and become a part of who
            you are.
          </p>
          <Link href="/shop" className="btn-primary mt-8">
            Explore Collection
          </Link>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-mint py-16 lg:py-24">
        <div className="container-x">
          <Reveal className="mb-12 text-center">
            <h2 className="section-title text-[30px] sm:text-[40px]">Why Choose Us</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }, i) => (
              <Reveal
                key={title}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="bg-white p-8 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-[20px] text-heading-soft">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] font-light text-body">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
