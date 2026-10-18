import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../model/types";

export interface ProductCardImageProps {
  product: Product;
  priority?: boolean;
}

export function ProductCardImage({ product, priority = false }: ProductCardImageProps) {
  const isBatteryFull = product.batteryHealth.includes("100");

  return (
    <Link
      href={`/produto/${product.slug}`}
      className="w-full h-48 sm:h-52 rounded-xl bg-surface-container-low flex items-center justify-center overflow-hidden my-2 relative group-hover:bg-surface-container transition-colors"
    >
      <div className="relative w-full h-full p-4 flex items-center justify-center">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-xs border border-outline-variant/15">
        <span
          className="material-symbols-outlined text-secondary text-[14px]"
          aria-hidden="true"
        >
          {isBatteryFull ? "battery_full" : "mobile_arrow_right"}
        </span>
        <span className="font-label-sm text-label-sm text-on-surface font-bold">
          {product.batteryHealth}
        </span>
      </div>
    </Link>
  );
}
