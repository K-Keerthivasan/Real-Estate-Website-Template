"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PropertyImage } from "@/lib/site-data";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type PropertyGalleryProps = {
  images: PropertyImage[];
  title: string;
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  return (
    <div className="luxury-panel overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="property-gallery"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div
              className="image-overlay soft-grid relative h-[420px] sm:h-[560px]"
              style={{ backgroundImage: `url(${image.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
              aria-label={`${title} ${image.alt}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.58))]" />
              <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#1a1a1a]">
                {image.alt}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
