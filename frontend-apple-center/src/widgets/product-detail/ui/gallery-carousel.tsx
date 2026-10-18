"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import type { Product } from "@/entities/product/model/types";

export interface GalleryCarouselProps {
  product: Product;
}

export function GalleryCarousel({ product }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const images =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [{ url: product.imageUrl, alt: product.imageAlt }];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const scrollLeft = track.scrollLeft;
      const width = track.clientWidth;
      if (width > 0) {
        const newIndex = Math.round(scrollLeft / width);
        setActiveIndex(newIndex);
      }
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToImage = (index: number) => {
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: index * trackRef.current.clientWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleToggleFavorite = () => {
    const nextFavorite = !isFavorite;
    setIsFavorite(nextFavorite);
    if (nextFavorite) {
      toast.info(`${product.name} salvo nos favoritos.`);
    }
  };

  return (
    <div className="relative w-full bg-surface-container-low overflow-hidden max-w-7xl mx-auto rounded-3xl">
      {/* Carousel Track */}
      <div
        ref={trackRef}
        id="carouselTrack"
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="min-w-full snap-center relative flex items-center justify-center p-space-md aspect-square max-h-115 sm:max-h-130"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-bold bg-secondary text-on-secondary shadow-md">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            battery_charging_full
          </span>
          <span>{product.batteryHealth}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-bold bg-primary text-on-primary shadow-md">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            verified
          </span>
          <span>{product.gradeTag}</span>
        </span>
      </div>

      {/* Favorite Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
          className={`w-11 h-11 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer ${
            isFavorite ? "text-error" : "text-on-surface hover:text-error"
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
            aria-hidden="true"
          >
            favorite
          </span>
        </button>
      </div>

      {/* Navigation Indicators & Arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToImage(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Imagem anterior"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md items-center justify-center text-on-surface shadow-md disabled:opacity-30 disabled:pointer-events-none hover:bg-surface transition-all"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chevron_left
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollToImage(Math.min(images.length - 1, activeIndex + 1))}
            disabled={activeIndex === images.length - 1}
            aria-label="Próxima imagem"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md items-center justify-center text-on-surface shadow-md disabled:opacity-30 disabled:pointer-events-none hover:bg-surface transition-all"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chevron_right
            </span>
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Ir para a foto ${dotIdx + 1}`}
                onClick={() => scrollToImage(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === dotIdx ? "w-6 bg-primary" : "w-2 bg-outline/40 hover:bg-outline"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
