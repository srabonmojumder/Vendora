export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | null;

/** Detect the card brand from the leading digits. */
export function detectCardBrand(value: string): CardBrand {
  const d = value.replace(/\D/g, "");
  if (/^4/.test(d)) return "visa";
  if (/^3[47]/.test(d)) return "amex";
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(d)) return "mastercard";
  if (/^(6011|65|64[4-9]|622)/.test(d)) return "discover";
  return null;
}

/** Digits expected in the card number for a brand (Amex is 15, others 16). */
export function cardNumberLength(brand: CardBrand): number {
  return brand === "amex" ? 15 : 16;
}

/** CVC length for a brand (Amex is 4, others 3). */
export function cvcLength(brand: CardBrand): number {
  return brand === "amex" ? 4 : 3;
}

/** Luhn checksum validation. */
export function luhnValid(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 12) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

/** True when the number has the right length for its brand and passes Luhn. */
export function isCardNumberValid(value: string): boolean {
  const brand = detectCardBrand(value);
  const digits = value.replace(/\D/g, "");
  return digits.length === cardNumberLength(brand) && luhnValid(digits);
}

/** Format a card number into brand-appropriate groups as the user types. */
export function formatCardNumber(value: string, brand: CardBrand): string {
  const d = value.replace(/\D/g, "").slice(0, cardNumberLength(brand));
  if (brand === "amex") {
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)]
      .filter(Boolean)
      .join(" ");
  }
  return d.replace(/(.{4})/g, "$1 ").trim();
}

/** Format MM/YY as the user types. */
export function formatExpiry(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 4);
  return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
}

/** Validate MM/YY: real month, not in the past, not absurdly far ahead. */
export function isExpiryValid(value: string): boolean {
  const m = value.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const mm = parseInt(m[1], 10);
  const yy = parseInt(m[2], 10);
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const curYY = now.getFullYear() % 100;
  const curMM = now.getMonth() + 1;
  if (yy < curYY || yy > curYY + 20) return false;
  if (yy === curYY && mm < curMM) return false;
  return true;
}
