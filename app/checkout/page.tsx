"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, Wallet, Banknote, Lock, ShoppingBag } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import CouponField from "@/components/CouponField";
import CardPayment from "@/components/CardPayment";
import { useStore } from "@/context/StoreContext";
import type { CheckoutDetails, PaymentMethod } from "@/lib/types";

const COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Australia",
  "United Kingdom",
  "United States",
];

const PAYMENTS: { value: PaymentMethod; label: string; Icon: typeof CreditCard; hint: string }[] = [
  { value: "card", label: "Credit / Debit Card", Icon: CreditCard, hint: "Pay securely with Visa, Mastercard or Amex." },
  { value: "paypal", label: "PayPal", Icon: Wallet, hint: "You'll be redirected to PayPal to complete payment." },
  { value: "cod", label: "Cash on Delivery", Icon: Banknote, hint: "Pay with cash when your order arrives." },
];

const emptyForm: CheckoutDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: COUNTRIES[0],
  zip: "",
  notes: "",
  paymentMethod: "card",
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    coupon,
    placeOrder,
    addToast,
  } = useStore();
  const [form, setForm] = useState<CheckoutDetails>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [cardValid, setCardValid] = useState(false);
  const [cardAttempted, setCardAttempted] = useState(false);

  const set = <K extends keyof CheckoutDetails>(key: K, value: CheckoutDetails[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    // Card payment requires valid card details before placing the order.
    if (form.paymentMethod === "card" && !cardValid) {
      setCardAttempted(true);
      addToast("Please enter valid card details.", "info");
      return;
    }
    setSubmitting(true);
    // Simulate a brief payment-processing delay, then confirm.
    const order = placeOrder(form);
    setTimeout(() => router.push(`/checkout/success?order=${order.id}`), 600);
  };

  if (cart.length === 0) {
    return (
      <main>
        <PageBanner title="Checkout" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
        <section className="container-x flex flex-col items-center justify-center gap-5 py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-black/15" />
          <p className="text-[16px] font-light text-body">
            Your cart is empty — add something before checking out.
          </p>
          <Link href="/shop" className="btn-primary">
            Return To Shop
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageBanner title="Checkout" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

      <form onSubmit={handleSubmit} className="container-x py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
          {/* Left — details */}
          <div className="space-y-10">
            {/* Billing */}
            <div>
              <h2 className="mb-6 text-[15px] font-semibold uppercase tracking-button text-heading-soft">
                Billing Details
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="First Name" value={form.firstName} onChange={(v) => set("firstName", v)} />
                <Field label="Last Name" value={form.lastName} onChange={(v) => set("lastName", v)} />
                <Field label="Email Address" type="email" value={form.email} onChange={(v) => set("email", v)} />
                <Field label="Phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} />
                <div className="sm:col-span-2">
                  <Field label="Street Address" value={form.address} onChange={(v) => set("address", v)} />
                </div>
                <Field label="Town / City" value={form.city} onChange={(v) => set("city", v)} />
                <Field label="ZIP / Postcode" value={form.zip} onChange={(v) => set("zip", v)} />
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[12px] font-medium uppercase tracking-button text-heading-soft">
                    Country / Region
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className="w-full border border-black/15 bg-white px-4 py-3 text-[14px] text-heading-soft focus:border-brand focus:outline-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[12px] font-medium uppercase tracking-button text-heading-soft">
                    Order Notes (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Notes about your order, e.g. delivery instructions."
                    className="w-full border border-black/15 bg-white px-4 py-3 text-[14px] text-heading-soft focus:border-brand focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="mb-6 text-[15px] font-semibold uppercase tracking-button text-heading-soft">
                Payment Method
              </h2>
              <div className="space-y-3">
                {PAYMENTS.map(({ value, label, Icon, hint }) => {
                  const active = form.paymentMethod === value;
                  return (
                    <label
                      key={value}
                      className={`flex cursor-pointer items-start gap-4 border p-4 transition ${
                        active ? "border-brand bg-mint/50" : "border-black/15 hover:border-brand/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={active}
                        onChange={() => set("paymentMethod", value)}
                        className="mt-1 h-4 w-4 accent-brand"
                      />
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <div>
                        <p className="text-[14px] font-medium text-heading-soft">{label}</p>
                        <p className="mt-0.5 text-[13px] font-light text-body">{hint}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Card details with validation + live brand detection */}
              {form.paymentMethod === "card" && (
                <CardPayment
                  onValidityChange={setCardValid}
                  showErrors={cardAttempted}
                />
              )}
            </div>
          </div>

          {/* Right — order summary */}
          <aside className="h-fit border border-black/10 p-7 lg:sticky lg:top-24">
            <h2 className="mb-6 text-[15px] font-semibold uppercase tracking-button text-heading-soft">
              Your Order
            </h2>

            <ul className="divide-y divide-black/[0.07]">
              {cart.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center gap-3 py-3">
                  <div className="relative h-16 w-14 shrink-0  bg-[#f6f6f6]">
                    <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                      {qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-heading-soft">{product.name}</p>
                  </div>
                  <span className="text-[13px] font-semibold text-heading-soft">
                    {product.currency ?? "DHS"} {(product.price * qty).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-black/10 pt-4">
              <CouponField />
            </div>

            <div className="mt-4 space-y-2 border-t border-black/10 pt-4 text-[14px]">
              <Row label="Subtotal" value={`DHS ${cartSubtotal.toLocaleString()}`} />
              {discountAmount > 0 && (
                <Row
                  label={`Discount${coupon ? ` (${coupon.code})` : ""}`}
                  value={`− DHS ${discountAmount.toLocaleString()}`}
                  accent
                />
              )}
              <Row
                label="Shipping"
                value={shippingFee === 0 ? "Free" : `DHS ${shippingFee}`}
              />
              <div className="flex items-center justify-between border-t border-black/10 pt-3 text-[16px]">
                <span className="font-semibold text-heading-soft">Total</span>
                <span className="font-semibold text-brand">
                  DHS {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Processing…" : "Place Order"}
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-[12px] font-light text-body">
              <Lock className="h-3.5 w-3.5 text-brand" /> Secure SSL encrypted checkout
            </p>
          </aside>
        </div>
      </form>
    </main>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-body">{label}</span>
      <span className={`font-medium ${accent ? "text-brand" : "text-heading-soft"}`}>
        {value}
      </span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium uppercase tracking-button text-heading-soft">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border border-black/15 bg-white px-4 py-3 text-[14px] text-heading-soft focus:border-brand focus:outline-none"
      />
    </div>
  );
}
