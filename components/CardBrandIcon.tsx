import { CreditCard } from "lucide-react";
import type { CardBrand } from "@/lib/card";

const box = "h-full w-full";

function Visa({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} role="img" aria-label="Visa">
      <rect width="48" height="32" rx="4" fill="#fff" stroke="#e6e6e6" />
      <text
        x="24"
        y="21"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="13"
        fontWeight="700"
        fontStyle="italic"
        letterSpacing="0.5"
        fill="#1A1F71"
      >
        VISA
      </text>
    </svg>
  );
}

function Mastercard({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} role="img" aria-label="Mastercard">
      <rect width="48" height="32" rx="4" fill="#fff" stroke="#e6e6e6" />
      <circle cx="20" cy="16" r="8" fill="#EB001B" />
      <circle cx="28" cy="16" r="8" fill="#F79E1B" fillOpacity="0.85" />
    </svg>
  );
}

function Amex({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} role="img" aria-label="American Express">
      <rect width="48" height="32" rx="4" fill="#2E77BC" />
      <text
        x="24"
        y="20"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="8.5"
        fontWeight="700"
        fill="#fff"
      >
        AMEX
      </text>
    </svg>
  );
}

function Discover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} role="img" aria-label="Discover">
      <rect width="48" height="32" rx="4" fill="#fff" stroke="#e6e6e6" />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="6"
        fontWeight="700"
        fill="#222"
      >
        DISCOVER
      </text>
      <circle cx="40" cy="16" r="5.5" fill="#F76C1B" />
    </svg>
  );
}

export function CardBrandIcon({
  brand,
  className = "h-7 w-10",
}: {
  brand: CardBrand;
  className?: string;
}) {
  switch (brand) {
    case "visa":
      return <Visa className={className} />;
    case "mastercard":
      return <Mastercard className={className} />;
    case "amex":
      return <Amex className={className} />;
    case "discover":
      return <Discover className={className} />;
    default:
      return (
        <span className={`flex items-center justify-center text-body ${className}`}>
          <CreditCard className="h-5 w-5" />
        </span>
      );
  }
}

const ALL: Exclude<CardBrand, null>[] = ["visa", "mastercard", "amex", "discover"];

/** Row of accepted card brands; the active one stays bright, others dim. */
export function AcceptedCards({ active }: { active: CardBrand }) {
  return (
    <div className="flex items-center gap-2">
      {ALL.map((b) => (
        <span
          key={b}
          className={`h-6 w-9 overflow-hidden rounded transition-opacity ${
            active && active !== b ? "opacity-30" : "opacity-100"
          }`}
        >
          <CardBrandIcon brand={b} className={box} />
        </span>
      ))}
    </div>
  );
}
