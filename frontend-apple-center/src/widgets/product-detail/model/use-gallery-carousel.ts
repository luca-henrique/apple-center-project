"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";

export function useGalleryCarousel(productName: string) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

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

  const scrollToImage = useCallback((index: number) => {
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: index * trackRef.current.clientWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  }, []);

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite((prev) => {
      const next = !prev;
      if (next) {
        toast.info(`${productName} salvo nos favoritos.`);
      }
      return next;
    });
  }, [productName]);

  return {
    trackRef,
    activeIndex,
    isFavorite,
    scrollToImage,
    handleToggleFavorite,
  };
}
