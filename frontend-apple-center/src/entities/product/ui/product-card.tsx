"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../model/types";
import { Button } from "@/shared/ui/button";
import { ProductCardTopBar } from "./atoms/product-card-top-bar";
import { ProductCardImage } from "./atoms/product-card-image";
import { ProductCardInfo } from "./atoms/product-card-info";

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
        <ProductCardTopBar
          product={product}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />

        <ProductCardImage product={product} priority={priority} />

        <ProductCardInfo product={product} />
      </div>

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
