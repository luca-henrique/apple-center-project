import React from "react";
import type { Product } from "../../model/types";
import { Badge } from "@/shared/ui/badge";

export interface ProductCardTopBarProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ProductCardTopBar({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardTopBarProps) {
  return (
    <div className="flex items-start justify-between gap-2 mb-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant={product.isNew ? "primary" : "success"}>
          {product.conditionTag}
        </Badge>
        <Badge variant="secondary">{product.gradeTag}</Badge>
      </div>

      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={`Favoritar ${product.name}`}
        className={`favorite-btn w-11 h-11 min-w-11 min-h-11 rounded-full bg-surface-container-low flex items-center justify-center active:scale-90 transition-all cursor-pointer ${
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
  );
}
