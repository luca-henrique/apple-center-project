import React from "react";
import type { Product, ProductStorageOption } from "@/entities/product/model/types";
import { formatCurrency } from "@/shared/lib/format/currency";
import { Badge } from "@/shared/ui/badge";

export interface PricingCardProps {
  product: Product;
  selectedStorage: ProductStorageOption;
}

export function PricingCard({ product, selectedStorage }: PricingCardProps) {
  const currentPricePix = product.pricePix + (selectedStorage.priceDiff || 0);
  const installmentValue = (currentPricePix * 1.11) / product.installmentTimes;

  return (
    <section className="p-space-md sm:p-space-lg rounded-3xl bg-surface-container-low border border-outline-variant/15 flex flex-col gap-4">
      {/* Title & Condition */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="primary">{product.conditionTag}</Badge>
          <Badge variant="secondary">{product.gradeTag}</Badge>
          <Badge variant="success">{product.warranty}</Badge>
        </div>

        <h1 className="font-headline-md sm:font-headline-lg text-headline-md sm:text-headline-lg font-bold text-on-surface leading-tight">
          {product.name} {selectedStorage.label}
        </h1>
      </div>

      {/* Pricing Information */}
      <div className="flex flex-col gap-1 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="font-headline-lg sm:font-display-sm text-headline-lg sm:text-display-sm font-bold text-secondary">
            {formatCurrency(currentPricePix)}
          </span>
          <Badge variant="discount">{product.pixDiscountBadge}</Badge>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">
          ou em até {product.installmentTimes}x de{" "}
          <strong className="text-on-surface font-semibold">
            {formatCurrency(installmentValue, { includeCents: true })}
          </strong>{" "}
          no cartão de crédito
        </p>

        {product.co2Saved && (
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-outline-variant/10 text-emerald-700 text-label-sm font-medium">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              eco
            </span>
            <span>Economia de {product.co2Saved} em relação a um aparelho novo</span>
          </div>
        )}
      </div>
    </section>
  );
}
