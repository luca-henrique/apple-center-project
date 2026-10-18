import React from "react";
import Link from "next/link";
import type { Product } from "../../model/types";
import { Badge } from "@/shared/ui/badge";

export interface ProductCardInfoProps {
  product: Product;
}

export function ProductCardInfo({ product }: ProductCardInfoProps) {
  return (
    <>
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
    </>
  );
}
