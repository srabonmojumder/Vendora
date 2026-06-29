import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  {
    Icon: Truck,
    title: "Free Shipping",
    text: "On all orders over DHS 200",
  },
  {
    Icon: RefreshCw,
    title: "Easy Returns",
    text: "30-day money-back guarantee",
  },
  {
    Icon: ShieldCheck,
    title: "Secure Payment",
    text: "100% protected checkout",
  },
  {
    Icon: Headphones,
    title: "24/7 Support",
    text: "Dedicated customer care",
  },
];

export default function ValueProps() {
  return (
    <section className="border-y border-black/10 py-12 lg:py-14">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {items.map(({ Icon, title, text }, i) => (
          <Reveal
            key={title}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-[14px] font-semibold uppercase tracking-button text-heading-soft">
                {title}
              </h3>
              <p className="mt-1 text-[13px] font-light text-body">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
