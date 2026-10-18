"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/entities/product/model/types";

export function useStorefrontFilters(products: Product[]) {
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

  return {
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
  };
}
