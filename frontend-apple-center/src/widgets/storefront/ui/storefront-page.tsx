"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/entities/product/model/types";
import { useProducts } from "@/entities/product/api/use-products";
import { Header } from "@/widgets/header/ui/header";
import { BottomNav } from "@/widgets/bottom-nav/ui/bottom-nav";
import { PromoBanner } from "@/widgets/promo-banner/ui/promo-banner";
import { TrustBadges } from "@/widgets/trust-badges/ui/trust-badges";
import { ProductGrid } from "@/widgets/product-grid/ui/product-grid";
import { InspectionTeaser } from "@/widgets/inspection-teaser/ui/inspection-teaser";
import { ReviewsSection } from "@/widgets/reviews-section/ui/reviews-section";
import { CategoryChips } from "@/features/filter-products/ui/category-chips";
import { SearchFilterBar } from "@/features/filter-products/ui/search-filter-bar";
import { FilterModal } from "@/features/filter-products/ui/filter-modal";
import { TradeInBanner } from "@/features/trade-in/ui/trade-in-banner";
import { Typography } from "@/shared/ui/typography";

export interface StorefrontPageProps {
  initialProducts?: Product[];
}

export function StorefrontPage({ initialProducts }: StorefrontPageProps) {
  const { data: products = [], isLoading } = useProducts(initialProducts);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("todos");
    setConditionFilter("all");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Filter
      if (selectedCategory !== "todos" && product.category !== selectedCategory) {
        return false;
      }

      // Condition Filter
      if (conditionFilter === "new" && !product.isNew) return false;
      if (conditionFilter === "used" && product.isNew) return false;

      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesColor = product.color.toLowerCase().includes(query);
        const matchesStorage = product.storage.toLowerCase().includes(query);
        const matchesTag = product.conditionTag.toLowerCase().includes(query);
        return matchesName || matchesColor || matchesStorage || matchesTag;
      }

      return true;
    });
  }, [products, selectedCategory, conditionFilter, searchQuery]);

  const hasActiveFilters = conditionFilter !== "all";

  return (
    <>
      <Header cartCount={cartCount} />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full pb-8">
          {/* Search Bar Feature */}
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleFilterModal={() => setIsFilterModalOpen(true)}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Category Chips Feature */}
          <CategoryChips
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Promotional Banner Widget */}
          <PromoBanner />

          {/* Trust Badges Widget */}
          <TrustBadges />

          {/* Product Grid Section */}
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

          {/* Trade-in CTA Widget */}
          <TradeInBanner />

          {/* Technical Inspection Teaser Widget */}
          <InspectionTeaser />

          {/* Reviews Widget */}
          <ReviewsSection />
        </div>
      </main>

      {/* Filter Modal Feature */}
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

      {/* Bottom Nav Widget */}
      <BottomNav />
    </>
  );
}
