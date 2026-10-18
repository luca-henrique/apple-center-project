"use client";

import React from "react";
import type { PaymentMethod } from "@/features/checkout/model/checkout.schema";

export interface PaymentOptionConfig {
  method: PaymentMethod;
  title: string;
  badge?: string;
  description: string;
  icon: string;
}

export interface PaymentMethodCardProps {
  option: PaymentOptionConfig;
  isSelected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentMethodCard({
  option,
  isSelected,
  onSelect,
}: PaymentMethodCardProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(option.method)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onSelect(option.method);
        }
      }}
      className={`cursor-pointer min-h-14 p-space-sm rounded-xl flex items-center justify-between transition-all border ${
        isSelected
          ? "bg-surface-container-low border-secondary/40 shadow-xs"
          : "bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/10"
      }`}
    >
      <div className="flex items-center gap-space-sm">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
            isSelected ? "bg-secondary text-on-secondary" : "bg-surface-container-high"
          }`}
        >
          {isSelected && (
            <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
              check
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              {option.title}
            </span>
            {option.badge && (
              <span className="bg-primary-container text-on-primary font-label-sm text-[10px] px-1.5 py-0.5 rounded font-bold">
                {option.badge}
              </span>
            )}
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {option.description}
          </p>
        </div>
      </div>
      <span
        className={`material-symbols-outlined text-[24px] shrink-0 ${
          isSelected ? "text-secondary" : "text-outline"
        }`}
        aria-hidden="true"
      >
        {option.icon}
      </span>
    </div>
  );
}
