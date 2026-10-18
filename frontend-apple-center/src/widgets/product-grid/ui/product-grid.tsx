import React from "react";
import type { Product } from "@/entities/product/model/types";
import { ProductCard } from "@/entities/product/ui/product-card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Button } from "@/shared/ui/button";

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onResetFilters?: () => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductGrid({
  products,
  isLoading = false,
  onResetFilters,
  onAddToCart,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full rounded-xl mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 px-4 rounded-3xl bg-surface-container-low border border-outline-variant/15 flex flex-col items-center justify-center text-center">
        <div
          className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-3"
          aria-hidden="true"
        >
          <span className="material-symbols-outlined text-[32px]">search_off</span>
        </div>
        <h3 className="font-title-lg text-title-lg font-bold text-on-surface">
          Nenhum aparelho encontrado
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-1 mb-4">
          Não encontramos nenhum item correspondente aos filtros selecionados. Tente buscar por outro termo ou categoria.
        </p>
        {onResetFilters && (
          <Button type="button" variant="primary" size="md" onClick={onResetFilters}>
            Limpar Todos os Filtros
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 3}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
