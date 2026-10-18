"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import type { Product } from "../model/types";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  priority = false,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
    toast.success(`${product.name} adicionado ao carrinho!`, {
      description: `${product.storage} • ${product.color}`,
    });
    setTimeout(() => {
      setIsAdding(false);
    }, 1200);
  };

  const handleToggleFavorite = () => {
    const nextFavorite = !isFavorite;
    setIsFavorite(nextFavorite);
    if (nextFavorite) {
      toast.info(`${product.name} salvo nos favoritos.`);
    }
  };

  return (
    <article className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/15 flex flex-col justify-between relative group hover:shadow-md transition-shadow">
      <div>
        {/* Top Badges & Favorite Button */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={product.isNew ? "primary" : "success"}>
              {product.conditionTag}
            </Badge>
            <Badge variant="secondary">{product.gradeTag}</Badge>
          </div>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={`Favoritar ${product.name}`}
            className={`favorite-btn w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center active:scale-90 transition-all cursor-pointer ${
              isFavorite ? "text-error" : "text-outline hover:text-error"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              aria-hidden="true"
            >
              favorite
            </span>
          </button>
        </div>

        {/* Product Image Link */}
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
              {product.batteryHealth.includes("100") ? "battery_full" : "mobile_arrow_right"}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-bold">
              {product.batteryHealth}
            </span>
          </div>
        </Link>

        {/* Specs Info */}
        <div className="flex items-center gap-2 mt-2 mb-1 flex-wrap">
          <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/20 px-2 py-0.5 rounded font-medium">
            {product.storage}
          </span>
          <span className="font-body-sm text-body-sm text-outline-variant" aria-hidden="true">
            •
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {product.color}
          </span>
          <span className="font-body-sm text-body-sm text-outline-variant" aria-hidden="true">
            •
          </span>
          <span className="font-body-sm text-body-sm text-secondary flex items-center gap-0.5 font-medium">
            <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
              {product.isNew ? "verified" : "shield"}
            </span>
            {product.warranty}
          </span>
        </div>

        {/* Product Title */}
        <Link href={`/produto/${product.slug}`} className="hover:underline">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">
            {product.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-headline-md text-headline-md text-secondary font-bold">
              {product.pricePixFormatted}
            </span>
            <Badge variant="discount">{product.pixDiscountBadge}</Badge>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            ou {product.installmentTimes}x de{" "}
            <span className="font-semibold text-on-surface">
              {product.installmentValueFormatted}
            </span>{" "}
            sem juros
          </p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        type="button"
        variant="primary"
        size="md"
        isLoading={isAdding}
        onClick={handleAddToCart}
        className="w-full"
        leftIcon={
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            shopping_bag
          </span>
        }
      >
        Adicionar ao Carrinho
      </Button>
    </article>
  );
}
