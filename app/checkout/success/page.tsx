"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { useStore } from "@/context/StoreContext";
import type { PaymentMethod } from "@/lib/types";

const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  card: "Credit / Debit Card",
  paypal: "PayPal",
  cod: "Cash on Delivery",
};

export default function CheckoutSuccessPage() {
  const { lastOrder } = useStore();

  if (!lastOrder) {
    return (
      <main>
        <PageBanner title="Order Confirmed" crumbs={[{ label: "Checkout" }]} />
        <section className="container-x flex flex-col items-center justify-center gap-5 py-20 text-center">
          <Package className="h-16 w-16 text-black/15" />
          <p className="text-[16px] font-light text-body">
            No recent order found.
          </p>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  const { id, items, subtotal, shipping, total, details, createdAt } = lastOrder;
  const date = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <main>
      <PageBanner title="Order Confirmed" crumbs={[{ label: "Checkout" }, { label: "Confirmation" }]} />

      <section className="container-x py-14 lg:py-20">
        {/* Confirmation header */}
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-brand" />
          <h2 className="mt-5 font-display text-[30px] text-heading-soft sm:text-[40px]">
            Thank You, {details.firstName}!
          </h2>
          <p className="mt-3 max-w-md text-[15px] font-light text-body">
            Your order has been placed successfully. A confirmation email has been
            sent to{" "}
            <span className="font-medium text-heading-soft">{details.email}</span>.
          </p>
        </div>

        {/* Order meta */}
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="grid grid-cols-2 gap-4 border border-black/10 p-6 sm:grid-cols-4">
            <Meta label="Order Number" value={id} />
            <Meta label="Date" value={date} />
            <Meta label="Payment" value={PAYMENT_LABEL[details.paymentMethod]} />
            <Meta label="Total" value={`DHS ${total.toLocaleString()}`} highlight />
          </div>

          {/* Items */}
          <div className="mt-8 border border-black/10">
            <h3 className="border-b border-black/10 px-6 py-4 text-[14px] font-semibold uppercase tracking-button text-heading-soft">
              Order Summary
            </h3>
            <ul className="divide-y divide-black/[0.07] px-6">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center gap-4 py-4">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-[#f6f6f6]">
                    <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-heading-soft">{product.name}</p>
                    <p className="text-[13px] text-body">Qty: {qty}</p>
                  </div>
                  <span className="text-[14px] font-semibold text-heading-soft">
                    DHS {(product.price * qty).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-black/10 px-6 py-4 text-[14px]">
              <Row label="Subtotal" value={`DHS ${subtotal.toLocaleString()}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : `DHS ${shipping}`} />
              <div className="flex items-center justify-between border-t border-black/10 pt-3 text-[16px]">
                <span className="font-semibold text-heading-soft">Total</span>
                <span className="font-semibold text-brand">DHS {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="mt-8 border border-black/10 p-6">
            <h3 className="mb-3 text-[14px] font-semibold uppercase tracking-button text-heading-soft">
              Shipping Address
            </h3>
            <p className="text-[14px] font-light leading-relaxed text-body">
              {details.firstName} {details.lastName}
              <br />
              {details.address}, {details.city} {details.zip}
              <br />
              {details.country}
              <br />
              {details.phone}
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/shop" className="btn-primary">
              <ShoppingBag className="h-4 w-4" /> Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Meta({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-button text-body">{label}</p>
      <p className={`mt-1 text-[14px] font-semibold ${highlight ? "text-brand" : "text-heading-soft"}`}>
        {value}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-body">{label}</span>
      <span className="font-medium text-heading-soft">{value}</span>
    </div>
  );
}
