"use client";

import React from "react";

export interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleFilterModal: () => void;
  hasActiveFilters?: boolean;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  onToggleFilterModal,
  hasActiveFilters = false,
}: SearchFilterBarProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-gutter my-space-xs">
      <div className="flex items-center gap-2">
        {/* Search Input Container */}
        <div className="flex-1 relative flex items-center">
          <span
            className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar iPhone por modelo, cor ou capacidade..."
            aria-label="Buscar produtos"
            className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/30 text-body-md font-body-md text-on-surface placeholder:text-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Limpar busca"
              className="absolute right-3 w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                close
              </span>
            </button>
          )}
        </div>

        {/* Filter Trigger Button */}
        <button
          type="button"
          onClick={onToggleFilterModal}
          aria-label="Filtrar produtos"
          className={`min-h-[44px] min-w-[44px] px-3.5 py-2.5 rounded-full flex items-center justify-center gap-1.5 font-label-md text-label-md active:scale-95 transition-all shadow-xs cursor-pointer select-none ${
            hasActiveFilters
              ? "bg-primary text-on-primary ring-2 ring-primary/20"
              : "bg-surface-container-high text-on-surface hover:bg-surface-variant"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            tune
          </span>
          <span className="hidden sm:inline">Filtros</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-secondary-container" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
