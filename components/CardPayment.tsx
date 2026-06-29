"use client";

import { useEffect, useState } from "react";
import {
  detectCardBrand,
  isCardNumberValid,
  isExpiryValid,
  cvcLength,
  formatCardNumber,
  formatExpiry,
} from "@/lib/card";
import { CardBrandIcon, AcceptedCards } from "./CardBrandIcon";

interface CardPaymentProps {
  /** Reports overall validity to the parent so it can gate submission. */
  onValidityChange?: (valid: boolean) => void;
  /** Force-show all field errors (e.g. after a failed submit attempt). */
  showErrors?: boolean;
}

const fieldClass =
  "w-full border bg-white px-4 py-3 text-[14px] text-heading-soft focus:outline-none";

export default function CardPayment({
  onValidityChange,
  showErrors = false,
}: CardPaymentProps) {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [touched, setTouched] = useState({ n: false, e: false, c: false });

  const brand = detectCardBrand(number);
  const numberValid = isCardNumberValid(number);
  const expiryValid = isExpiryValid(expiry);
  const cvcValid = cvc.replace(/\D/g, "").length === cvcLength(brand);
  const valid = numberValid && expiryValid && cvcValid;

  useEffect(() => {
    onValidityChange?.(valid);
  }, [valid, onValidityChange]);

  const showN = (touched.n || showErrors) && number.length > 0 && !numberValid;
  const showNEmpty = showErrors && number.length === 0;
  const showE = (touched.e || showErrors) && !expiryValid;
  const showC = (touched.c || showErrors) && !cvcValid;

  return (
    <div className="mt-5 border border-black/10 bg-[#fafafa] p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[12px] font-medium uppercase tracking-button text-heading-soft">
          Card Details
        </span>
        <AcceptedCards active={brand} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Card number with live brand icon */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[12px] font-medium uppercase tracking-button text-heading-soft">
            Card Number
          </label>
          <div className="relative">
            <input
              inputMode="numeric"
              autoComplete="cc-number"
              value={number}
              onChange={(e) => {
                const b = detectCardBrand(e.target.value);
                setNumber(formatCardNumber(e.target.value, b));
              }}
              onBlur={() => setTouched((t) => ({ ...t, n: true }))}
              placeholder="1234 5678 9012 3456"
              className={`${fieldClass} pr-14 ${
                showN || showNEmpty
                  ? "border-red-400"
                  : numberValid
                    ? "border-brand"
                    : "border-black/15 focus:border-brand"
              }`}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 h-7 w-10 -translate-y-1/2">
              <CardBrandIcon brand={brand} className="h-full w-full" />
            </span>
          </div>
          {(showN || showNEmpty) && (
            <p className="mt-1.5 text-[12px] text-red-600">
              {showNEmpty ? "Card number is required." : "Enter a valid card number."}
            </p>
          )}
        </div>

        {/* Expiry */}
        <div>
          <label className="mb-2 block text-[12px] font-medium uppercase tracking-button text-heading-soft">
            Expiry (MM/YY)
          </label>
          <input
            inputMode="numeric"
            autoComplete="cc-exp"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            onBlur={() => setTouched((t) => ({ ...t, e: true }))}
            placeholder="08/28"
            className={`${fieldClass} ${
              showE ? "border-red-400" : "border-black/15 focus:border-brand"
            }`}
          />
          {showE && (
            <p className="mt-1.5 text-[12px] text-red-600">Invalid expiry date.</p>
          )}
        </div>

        {/* CVC */}
        <div>
          <label className="mb-2 block text-[12px] font-medium uppercase tracking-button text-heading-soft">
            CVC
          </label>
          <input
            inputMode="numeric"
            autoComplete="cc-csc"
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, "").slice(0, cvcLength(brand)))
            }
            onBlur={() => setTouched((t) => ({ ...t, c: true }))}
            placeholder={brand === "amex" ? "1234" : "123"}
            className={`${fieldClass} ${
              showC ? "border-red-400" : "border-black/15 focus:border-brand"
            }`}
          />
          {showC && (
            <p className="mt-1.5 text-[12px] text-red-600">
              Enter the {cvcLength(brand)}-digit CVC.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
