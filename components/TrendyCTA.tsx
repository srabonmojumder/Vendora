import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

interface TrendyCTAProps {
  title?: string;
  buttonLabel?: string;
  href?: string;
}

export default function TrendyCTA({
  title = "The Latest Trendy Perfume Collection",
  buttonLabel = "View All Products",
  href = "/shop",
}: TrendyCTAProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-x">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="section-title max-w-3xl text-[34px] leading-[1.15] sm:text-[46px] lg:text-[54px]">
            {title}
          </h2>
          <Link href={href} className="btn-primary mt-8">
            {buttonLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
