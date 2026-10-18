"use client";

import React from "react";
import { CATEGORIES } from "@/entities/category";

export interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryChips({
  selectedCategory,
  onSelectCategory,
}: CategoryChipsProps) {
  return (
    <section className="py-space-sm max-w-7xl mx-auto w-full" aria-label="Filtro de categorias">
      <div className="flex items-center gap-2 overflow-x-auto px-gutter no-scrollbar py-0.5">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`category-chip shrink-0 min-h-[44px] px-4 py-2.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                isActive
                  ? "bg-primary text-on-primary ring-2 ring-primary/20"
                  : "bg-surface-container-high text-on-surface hover:bg-surface-variant"
              }`}
              data-category={category.id}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
