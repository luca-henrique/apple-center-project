"use client";

import React from "react";
import type { Product, ProductColor, ProductStorageOption } from "@/entities/product/model/types";

export interface VariantSelectorsProps {
  product: Product;
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
  selectedStorage: ProductStorageOption;
  onSelectStorage: (storage: ProductStorageOption) => void;
}

export function VariantSelectors({
  product,
  selectedColor,
  onSelectColor,
  selectedStorage,
  onSelectStorage,
}: VariantSelectorsProps) {
  const colors = product.colors || [
    { name: product.color, hex: "#9c958a" },
  ];

  const storages = product.storages || [
    { label: product.storage, badge: "Disponível", disabled: false, priceDiff: 0 },
  ];

  return (
    <div className="flex flex-col gap-5 py-4 border-y border-outline-variant/15">
      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="font-label-md text-label-md font-semibold text-on-surface">
            Cor Selecionada
          </label>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {selectedColor.name}
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1" role="radiogroup" aria-label="Selecione a cor">
          {colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`Cor ${color.name}`}
                onClick={() => onSelectColor(color)}
                className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all cursor-pointer ${
                  isSelected ? "ring-2 ring-primary ring-offset-2 scale-105" : "hover:scale-105 opacity-80"
                }`}
              >
                <span
                  className="w-8 h-8 rounded-full shadow-inner border border-black/10 block"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Capacity Selection */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="font-label-md text-label-md font-semibold text-on-surface">
            Capacidade de Armazenamento
          </label>
          <span className="font-body-sm text-body-sm text-secondary font-medium">
            {selectedStorage.badge || "Garantida"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="radiogroup" aria-label="Selecione a capacidade">
          {storages.map((storage) => {
            const isSelected = selectedStorage.label === storage.label;
            return (
              <button
                key={storage.label}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={storage.disabled}
                onClick={() => onSelectStorage(storage)}
                className={`min-h-[50px] p-2.5 rounded-xl border flex flex-col items-center justify-center gap-0.5 text-center transition-all select-none ${
                  storage.disabled
                    ? "opacity-40 bg-surface-container-high border-outline-variant/20 cursor-not-allowed"
                    : isSelected
                    ? "border-primary bg-primary text-on-primary shadow-xs ring-1 ring-primary/20"
                    : "border-outline-variant/30 bg-surface-container-low text-on-surface hover:bg-surface-container"
                }`}
              >
                <span className="font-label-md text-label-md font-bold">{storage.label}</span>
                {storage.badge && (
                  <span
                    className={`text-[10px] font-medium leading-none ${
                      isSelected ? "text-on-primary/80" : "text-on-surface-variant"
                    }`}
                  >
                    {storage.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
