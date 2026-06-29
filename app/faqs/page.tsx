"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import PageBanner from "@/components/PageBanner";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Orders are processed within 24 hours and typically arrive in 3–5 business days. Free shipping applies to all orders over DHS 200.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day easy return policy. Items must be unopened and in their original packaging. Contact our support team to initiate a return.",
  },
  {
    q: "Are your fragrances long-lasting?",
    a: "Yes — our perfumes use high-concentration formulas (Eau de Parfum and above) designed to last throughout the day.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship to over 40 countries. Shipping rates and delivery times are calculated at checkout based on your location.",
  },
  {
    q: "Are your products cruelty-free?",
    a: "Absolutely. None of our products are tested on animals, and we source our ingredients ethically and sustainably.",
  },
  {
    q: "How should I store my perfume?",
    a: "Keep your fragrance in a cool, dry place away from direct sunlight to preserve its scent profile for as long as possible.",
  },
];

export default function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main>
      <PageBanner title="FAQs" crumbs={[{ label: "FAQs" }]} />

      <section className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center font-display text-[30px] text-heading-soft sm:text-[40px]">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] font-medium text-heading-soft">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0 text-brand" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-heading-soft" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-[15px] font-light leading-relaxed text-body">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
