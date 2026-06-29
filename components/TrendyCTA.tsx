import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function TrendyCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-x">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="section-title max-w-3xl text-[34px] leading-[1.15] sm:text-[46px] lg:text-[54px]">
            The Latest Trendy Perfume Collection
          </h2>
          <a href="#" className="btn-primary mt-8">
            View All Products <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
