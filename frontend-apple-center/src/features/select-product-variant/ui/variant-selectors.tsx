"use client";

import React from "react";
import type { Product, ProductColor, ProductStorageOption } from "@/entities/product/model/types";
import { ColorRadioButton } from "./atoms/color-radio-button";
import { StorageOptionCard } from "./atoms/storage-option-card";

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
  const colors = product.colors || [{ name: product.color, hex: "#9c958a" }];
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

        <div
          className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1"
          role="radiogroup"
          aria-label="Selecione a cor"
        >
          {colors.map((color) => (
            <ColorRadioButton
              key={color.name}
              color={color}
              isSelected={selectedColor.name === color.name}
              onSelect={onSelectColor}
            />
          ))}
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

        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
          role="radiogroup"
          aria-label="Selecione a capacidade"
        >
          {storages.map((storage) => (
            <StorageOptionCard
              key={storage.label}
              storage={storage}
              isSelected={selectedStorage.label === storage.label}
              onSelect={onSelectStorage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
