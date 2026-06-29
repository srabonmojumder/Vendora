"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CouponField() {
  const { coupon, applyCoupon, removeCoupon, addToast } = useStore();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = () => {
    const res = applyCoupon(code);
    setMsg({ ok: res.ok, text: res.message });
    if (res.ok) {
      setCode("");
      addToast(res.message);
    }
  };

  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-2 border border-brand/30 bg-mint/50 px-3 py-2.5 text-[13px]">
        <span className="flex items-center gap-2 font-medium text-brand">
          <Tag className="h-3.5 w-3.5" /> {coupon.code} (−{coupon.discountPct}%)
        </span>
        <button
          onClick={() => {
            removeCoupon();
            setMsg(null);
          }}
          aria-label="Remove coupon"
          className="text-body transition hover:text-brand"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-stretch border border-black/15">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Coupon code"
          className="w-full bg-white px-3 py-2.5 text-[13px] text-heading-soft placeholder:text-body focus:outline-none"
        />
        <button
          type="button"
          onClick={submit}
          className="shrink-0 bg-brand px-4 text-[11px] font-medium uppercase tracking-button text-white transition hover:bg-brand-dark"
        >
          Apply
        </button>
      </div>
      {msg && (
        <p className={`mt-2 text-[12px] ${msg.ok ? "text-brand" : "text-red-600"}`}>
          {msg.text}
        </p>
      )}
      <p className="mt-2 text-[11px] text-body">
        Try{" "}
        <span className="font-medium text-heading-soft">VENDORA10</span>,
        WELCOME15 or SCENT20.
      </p>
    </div>
  );
}
