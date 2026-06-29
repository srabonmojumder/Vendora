"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

interface PromoBannerProps {
  variant: "light" | "dark";
  label: string;
  /** Heading parts; `accent` is rendered in the brand-green highlight. */
  headingBefore: string;
  accent?: string;
  headingAfter?: string;
  buttonLabel: string;
  image?: string;
}

export default function PromoBanner({
  variant,
  label,
  headingBefore,
  accent,
  headingAfter,
  buttonLabel,
  image,
}: PromoBannerProps) {
  const isDark = variant === "dark";

  if (isDark) {
    // Full-width dark banner with overlay, centered copy.
    return (
      <section className="relative overflow-hidden">
        <div className="relative min-h-[340px] bg-brand-dark lg:min-h-[420px]">
          {image && (
            <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/40" />
          <div className="container-x relative flex h-full min-h-[340px] items-center lg:min-h-[420px]">
            <Reveal className="max-w-xl py-16 text-white">
              <span className="mb-4 inline-block text-[12px] font-medium uppercase tracking-wider2 text-white/70">
                {label}
              </span>
              <h2 className="font-display text-[36px] leading-tight sm:text-[48px] lg:text-[56px]">
                {headingBefore}
                {accent && <span className="text-[#7fd1b3]"> {accent}</span>}
                {headingAfter && <> {headingAfter}</>}
              </h2>
              <a
                href="#"
                className="mt-8 inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-[11px] font-medium uppercase tracking-button text-brand transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint"
              >
                {buttonLabel} <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  // Light (mint) banner: image left, copy right.
  return (
    <section className="bg-mint">
      <div className="container-x grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:py-0">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] lg:my-12">
            {image && (
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            )}
          </div>
        </Reveal>

        <Reveal delay={1} className="order-1 lg:order-2 lg:py-20">
          <span className="mb-4 inline-block text-[12px] font-medium uppercase tracking-wider2 text-brand/80">
            {label}
          </span>
          <h2 className="font-display text-[34px] leading-[1.1] text-heading-soft sm:text-[46px] lg:text-[54px]">
            {headingBefore}
            {accent && <span className="text-brand"> {accent}</span>}
            {headingAfter && <> {headingAfter}</>}
          </h2>
          <a href="#" className="btn-primary mt-8">
            {buttonLabel} <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
