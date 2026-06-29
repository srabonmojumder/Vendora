"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";

const details = [
  { Icon: MapPin, title: "Address", text: "121 King Street, Collins Melbourne West Victoria 8007, Australia." },
  { Icon: Phone, title: "Phone", text: "(+01) 234-567-89" },
  { Icon: Mail, title: "Email", text: "support@mycompany.com" },
  { Icon: Clock, title: "Hours", text: "Mon–Sat: 9:00 — 20:00" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <PageBanner title="Contact Us" crumbs={[{ label: "Contact" }]} />

      <section className="container-x py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Info */}
          <Reveal>
            <span className="text-[12px] font-medium uppercase tracking-button text-brand/80">
              Get In Touch
            </span>
            <h2 className="mt-3 font-display text-[30px] leading-tight text-heading-soft sm:text-[40px]">
              We&apos;d Love To Hear From You
            </h2>
            <p className="mt-4 text-[15px] font-light leading-relaxed text-body">
              Questions about an order, a fragrance, or a partnership? Reach out
              and our team will get back to you within 24 hours.
            </p>

            <ul className="mt-8 space-y-6">
              {details.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold uppercase tracking-button text-heading-soft">
                      {title}
                    </h3>
                    <p className="mt-1 text-[14px] font-light text-body">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal delay={1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="bg-mint/60 p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Your Name" type="text" />
                <Field label="Your Email" type="email" />
              </div>
              <div className="mt-5">
                <Field label="Subject" type="text" />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-[12px] font-medium uppercase tracking-button text-heading-soft">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full border border-black/15 bg-white px-4 py-3 text-[14px] text-heading-soft focus:border-brand focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
                Send Message
              </button>

              {sent && (
                <p className="mt-4 flex items-center gap-2 text-[14px] font-medium text-brand">
                  <Check className="h-4 w-4" /> Thanks! Your message has been sent.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium uppercase tracking-button text-heading-soft">
        {label}
      </label>
      <input
        required
        type={type}
        className="w-full border border-black/15 bg-white px-4 py-3 text-[14px] text-heading-soft focus:border-brand focus:outline-none"
      />
    </div>
  );
}
