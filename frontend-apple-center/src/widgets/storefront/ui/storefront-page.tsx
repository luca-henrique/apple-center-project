"use client";

import type { Product } from "@/entities/product/model/types";
import { useProducts } from "@/entities/product/api/use-products";
import { Header } from "@/widgets/header";
import { BottomNav } from "@/widgets/bottom-nav";
import { PromoBanner } from "@/widgets/promo-banner";
import { TrustBadges } from "@/widgets/trust-badges";
import { ProductGrid } from "@/widgets/product-grid";
import { InspectionTeaser } from "@/widgets/inspection-teaser";
import { ReviewsSection } from "@/widgets/reviews-section";
import {
  CategoryChips,
  SearchFilterBar,
  FilterModal,
} from "@/features/filter-products";
import { TradeInBanner } from "@/features/trade-in";
import { Typography } from "@/shared/ui/typography";
import { useStorefrontFilters } from "../model/use-storefront-filters";

export interface StorefrontPageProps {
  initialProducts?: Product[];
}

export function StorefrontPage({ initialProducts }: StorefrontPageProps) {
  const { data: products = [], isLoading } = useProducts(initialProducts);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    conditionFilter,
    setConditionFilter,
    isFilterModalOpen,
    setIsFilterModalOpen,
    cartCount,
    handleAddToCart,
    handleResetFilters,
    filteredProducts,
    hasActiveFilters,
  } = useStorefrontFilters(products);

  return (
    <>
      <Header cartCount={cartCount} />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full pb-8">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleFilterModal={() => setIsFilterModalOpen(true)}
            hasActiveFilters={hasActiveFilters}
          />

          <CategoryChips
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <PromoBanner />
          <TrustBadges />

          <section id="produtos" className="my-space-xs max-w-7xl mx-auto w-full scroll-mt-20">
            <div className="flex items-center justify-between px-gutter mb-space-sm">
              <div>
                <Typography variant="heading">Destaques da Semana</Typography>
                <Typography variant="subtitle">
                  Pronta-entrega inspecionada e higienizada em laboratório
                </Typography>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-secondary font-label-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>{filteredProducts.length} disponíveis</span>
              </div>
            </div>

            <div className="px-gutter">
              <ProductGrid
                products={filteredProducts}
                isLoading={isLoading}
                onResetFilters={handleResetFilters}
                onAddToCart={handleAddToCart}
              />
            </div>
          </section>

          <TradeInBanner />
          <InspectionTeaser />
          <ReviewsSection />
        </div>
      </main>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        conditionFilter={conditionFilter}
        onConditionChange={setConditionFilter}
        onResetFilters={() => {
          setConditionFilter("all");
          setIsFilterModalOpen(false);
        }}
      />

      <BottomNav />
    </>
  );
}
