"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { heroSlides } from "@/lib/data";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
  return (
    <section className="relative">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} hero-bullet">0${index + 1}</span>`,
        }}
        className="hero-swiper"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — copy on mint */}
              <div className="order-2 flex items-center bg-mint px-6 py-14 sm:px-12 lg:order-1 lg:py-28 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] lg:pr-16">
                <div className="max-w-xl">
                  <span className="hero-anim mb-5 inline-block text-[12px] font-medium uppercase tracking-wider2 text-brand/80">
                    {slide.label}
                  </span>
                  <h1 className="hero-anim font-display text-[44px] leading-[1.05] text-brand sm:text-[58px] lg:text-[72px]">
                    {slide.titleTop}
                    <br />
                    {slide.titleBottom}
                  </h1>
                  <p className="hero-anim mt-6 max-w-md text-[15px] font-light leading-relaxed text-body">
                    {slide.subtitle}
                  </p>
                  <a href="#" className="hero-anim btn-primary mt-8">
                    See More <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Right — product image */}
              <div className="relative order-1 flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f3f7f4] to-[#dfeee6] lg:order-2 lg:min-h-[640px]">
                <Image
                  src={slide.image}
                  alt={`${slide.titleTop} ${slide.titleBottom}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 24px !important;
          left: auto !important;
          right: 32px;
          width: auto !important;
          display: flex;
          gap: 14px;
        }
        .hero-bullet {
          width: auto !important;
          height: auto !important;
          background: transparent !important;
          border-radius: 0 !important;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: #004132;
          opacity: 0.4 !important;
        }
        .hero-bullet.swiper-pagination-bullet-active {
          opacity: 1 !important;
          border-bottom: 2px solid #004132;
        }
        /* Re-trigger entrance animation on each active slide */
        .hero-anim {
          opacity: 0;
        }
        .swiper-slide-active .hero-anim {
          animation: hero-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .swiper-slide-active .hero-anim:nth-child(1) {
          animation-delay: 0.1s;
        }
        .swiper-slide-active .hero-anim:nth-child(2) {
          animation-delay: 0.25s;
        }
        .swiper-slide-active .hero-anim:nth-child(3) {
          animation-delay: 0.4s;
        }
        .swiper-slide-active .hero-anim:nth-child(4) {
          animation-delay: 0.55s;
        }
        @keyframes hero-fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
