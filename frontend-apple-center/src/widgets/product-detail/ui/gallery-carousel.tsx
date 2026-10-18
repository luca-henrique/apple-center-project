"use client";

import Image from "next/image";
import type { Product } from "@/entities/product/model/types";
import { useGalleryCarousel } from "../model/use-gallery-carousel";
import { GalleryFloatingBadges } from "./atoms/gallery-floating-badges";
import { GalleryFavoriteButton } from "./atoms/gallery-favorite-button";
import { GalleryNavigationControls } from "./atoms/gallery-navigation-controls";

export interface GalleryCarouselProps {
  product: Product;
}

export function GalleryCarousel({ product }: GalleryCarouselProps) {
  const { trackRef, activeIndex, isFavorite, scrollToImage, handleToggleFavorite } =
    useGalleryCarousel(product.name);

  const images =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [{ url: product.imageUrl, alt: product.imageAlt }];

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

      {/* Floating Badges Atom */}
      <GalleryFloatingBadges
        batteryHealth={product.batteryHealth}
        gradeTag={product.gradeTag}
      />

      {/* Favorite Button Atom */}
      <GalleryFavoriteButton
        isFavorite={isFavorite}
        onToggle={handleToggleFavorite}
      />

      {/* Navigation Indicators & Arrows Atom */}
      <GalleryNavigationControls
        totalItems={images.length}
        activeIndex={activeIndex}
        onScrollTo={scrollToImage}
      />
    </div>
  );
}
