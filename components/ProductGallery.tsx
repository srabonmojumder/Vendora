"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  images: string[];
  name: string;
  discount?: number;
}

/**
 * Product details gallery — a large main slide synced to a swipeable
 * thumbnail strip. Clicking/swiping a thumb drives the main image.
 */
export default function ProductGallery({
  images,
  name,
  discount,
}: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative">
        {discount != null && (
          <span className="absolute left-0 top-0 z-20 bg-brand px-3 py-1.5 text-[12px] font-medium text-white">
            -{discount}%
          </span>
        )}
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          slidesPerView={1}
          spaceBetween={0}
          className="product-main"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f6f6]">
                <Image
                  src={src}
                  alt={`${name} — view ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail strip slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Navigation, Thumbs]}
        watchSlidesProgress
        freeMode
        slidesPerView={4}
        spaceBetween={12}
        className="product-thumbs"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="cursor-pointer">
            <div className="thumb-inner relative aspect-square w-full overflow-hidden bg-[#f6f6f6]">
              <Image
                src={src}
                alt={`${name} — thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .product-main .swiper-button-prev,
        .product-main .swiper-button-next {
          width: 38px;
          height: 38px;
          background: #ffffff;
          color: #004132;
          border-radius: 9999px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .product-main:hover .swiper-button-prev,
        .product-main:hover .swiper-button-next {
          opacity: 1;
        }
        .product-main .swiper-button-prev::after,
        .product-main .swiper-button-next::after {
          font-size: 14px;
          font-weight: 700;
        }
        .product-thumbs .swiper-slide {
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        .product-thumbs .swiper-slide-thumb-active {
          opacity: 1;
        }
        .product-thumbs .swiper-slide-thumb-active .thumb-inner {
          box-shadow: inset 0 0 0 2px #004132;
        }
      `}</style>
    </div>
  );
}
