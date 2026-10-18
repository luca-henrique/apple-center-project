"use client";

import { useState } from "react";
import type { Product, ProductColor, ProductStorageOption } from "@/entities/product/model/types";
import { DetailHeader } from "./detail-header";
import { GalleryCarousel } from "./gallery-carousel";
import { PricingCard } from "./pricing-card";
import { InspectionAccordion } from "./inspection-accordion";
import { BottomActionBar } from "./bottom-action-bar";
import { VariantSelectors } from "@/features/select-product-variant/ui/variant-selectors";
import { ShippingCalculator } from "@/features/calculate-shipping/ui/shipping-calculator";
import { TrustBadges } from "@/widgets/trust-badges/ui/trust-badges";
import { TradeInBanner } from "@/features/trade-in/ui/trade-in-banner";

export interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors?.[0] || { name: product.color, hex: "#9c958a" }
  );

  const [selectedStorage, setSelectedStorage] = useState<ProductStorageOption>(
    product.storages?.find((s) => !s.disabled) || {
      label: product.storage,
      badge: "Disponível",
      disabled: false,
      priceDiff: 0,
    }
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface pb-32">
      <DetailHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-gutter pt-20 flex flex-col gap-6">
        {/* Gallery Carousel */}
        <GalleryCarousel product={product} />

        {/* Pricing & Essential Details */}
        <PricingCard product={product} selectedStorage={selectedStorage} />

        {/* Variant Selectors Feature */}
        <VariantSelectors
          product={product}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          selectedStorage={selectedStorage}
          onSelectStorage={setSelectedStorage}
        />

        {/* Shipping Calculator Feature */}
        <ShippingCalculator />

        {/* Technical Inspection Accordion */}
        <InspectionAccordion inspections={product.inspections} />

        {/* Trust Badges Widget */}
        <TrustBadges />

        {/* Trade-in Promo */}
        <TradeInBanner />
      </main>

      {/* Fixed Bottom Action Bar */}
      <BottomActionBar product={product} selectedStorage={selectedStorage} />
    </div>
  );
}
