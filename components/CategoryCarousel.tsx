"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { categories } from "@/lib/data";
import Reveal from "./Reveal";

import "swiper/css";
import "swiper/css/pagination";

export default function CategoryCarousel() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-x">
        <Reveal>
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="category-swiper !pb-12"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.id}>
                <a href="#" className="group flex flex-col items-center text-center">
                  <div className="relative aspect-square w-full max-w-[180px] overflow-hidden rounded-full bg-[#f4f4f4] transition-transform duration-500 group-hover:-translate-y-1">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="180px"
                      className="object-cover p-3 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-[19px] text-heading-soft transition-colors group-hover:text-brand">
                    {cat.name}
                  </h3>
                  <span className="mt-1 text-[13px] font-light text-body">
                    {cat.itemCount} item
                  </span>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>

      <style jsx global>{`
        .category-swiper .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
        }
      `}</style>
    </section>
  );
}
