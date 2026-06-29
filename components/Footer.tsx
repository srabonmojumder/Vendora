"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ArrowRight,
  Check,
} from "lucide-react";
import Logo from "./Logo";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.378-.293 1.193-.333 1.36-.052.22-.174.266-.402.16-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.608 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12" />
    </svg>
  );
}

type FooterLink = { label: string; href: string };

const customService: FooterLink[] = [
  { label: "Shipping info", href: "/faqs" },
  { label: "Refunds & returns", href: "/faqs" },
  { label: "Terms & conditions", href: "/faqs" },
  { label: "My account", href: "/wishlist" },
];
const information: FooterLink[] = [
  { label: "Our blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="mb-5 text-[13px] font-semibold uppercase tracking-wider2 text-heading-soft">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[14px] font-light text-body transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const payments = ["Visa", "Mastercard", "PayPal", "Amazon"];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — brand */}
          <div>
            <Link href="/" aria-label="Vendora — home" className="inline-flex">
              <Logo className="h-16 w-auto" />
            </Link>
            <ul className="mt-6 space-y-4 text-[14px] font-light text-body">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  121 King Street, Collins Melbourne West Victoria 8007,
                  Australia.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                <a href="tel:+0123456789" className="transition hover:text-brand">
                  (+01) 234-567-89
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href="mailto:support@mycompany.com"
                  className="transition hover:text-brand"
                >
                  support@mycompany.com
                </a>
              </li>
            </ul>
          </div>

          {/* Columns 2 & 3 */}
          <LinkColumn title="Custom Service" links={customService} />
          <LinkColumn title="Information" links={information} />

          {/* Column 4 — newsletter */}
          <div>
            <h4 className="mb-5 text-[13px] font-semibold uppercase tracking-wider2 text-heading-soft">
              Newsletter
            </h4>
            <p className="text-[14px] font-light text-body">
              Get more promotions and official information
            </p>
            <form
              className="mt-5 flex items-center border-b border-black/20 focus-within:border-brand"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
                e.currentTarget.reset();
              }}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                onChange={() => subscribed && setSubscribed(false)}
                className="w-full bg-transparent py-2 text-[14px] text-heading-soft placeholder:text-body focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="p-2 text-brand transition hover:translate-x-0.5"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {subscribed && (
              <p className="mt-3 flex items-center gap-2 text-[13px] font-medium text-brand">
                <Check className="h-4 w-4" /> Thanks for subscribing!
              </p>
            )}

            <div className="mt-6 flex items-center gap-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: XIcon, label: "X" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: PinterestIcon, label: "Pinterest" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-heading-soft transition-all hover:border-brand hover:bg-brand hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-[13px] font-light text-body">
            Copyright © 2025 Vendora All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            {payments.map((p) => (
              <span
                key={p}
                className="flex h-7 items-center rounded border border-black/10 bg-white px-2 text-[10px] font-semibold uppercase tracking-wide text-heading-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
