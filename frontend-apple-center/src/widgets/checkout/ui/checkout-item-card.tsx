"use client";

import React from "react";
import Image from "next/image";
import type { CheckoutItem } from "@/features/checkout/model/checkout.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

export interface CheckoutItemCardProps {
  item: CheckoutItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CheckoutItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CheckoutItemCardProps) {
  const currentTotalPix = item.unitPricePix * item.quantity;

  return (
    <article className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden flex flex-col gap-space-sm border border-outline-variant/10">
      <div className="flex gap-space-md items-start">
        {/* Product Image Thumbnail */}
        <div className="w-20 h-24 rounded-lg bg-surface-container-low flex-shrink-0 overflow-hidden relative flex items-center justify-center p-1">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt}
            fill
            sizes="80px"
            className="object-contain mix-blend-multiply p-1"
          />
          <span className="absolute top-1 left-1 bg-primary text-on-primary font-label-sm text-[9px] px-1.5 py-0.5 rounded-full font-bold">
            {item.gradeTag}
          </span>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-1">
            <h2 className="font-headline-sm text-label-lg text-on-surface truncate font-semibold">
              {item.name}
            </h2>
            <button
              type="button"
              aria-label="Remover item do checkout"
              onClick={onRemove}
              className="min-w-[36px] min-h-[36px] -mr-1 flex items-center justify-center text-outline hover:text-error transition-colors rounded-lg hover:bg-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                delete_outline
              </span>
            </button>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            {item.storage} • {item.color}
          </p>

          {/* Badges */}
          <div className="flex items-center gap-space-xs mt-1.5 flex-wrap">
            <span className="bg-primary-fixed/60 text-on-primary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                battery_charging_full
              </span>
              {item.batteryHealth}
            </span>
            <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded-full">
              Certificado 30+ testes
            </span>
          </div>

          {/* Stepper & Price */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-outline-variant/10">
            {/* Accessible Stepper with minimum 44px hit areas */}
            <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/15">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={onDecrease}
                disabled={item.quantity <= 1}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  remove
                </span>
              </button>
              <span
                className="w-7 text-center font-label-md text-label-md text-on-surface font-bold select-none"
                aria-live="polite"
              >
                {item.quantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={onIncrease}
                disabled={item.quantity >= 5}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  add
                </span>
              </button>
            </div>

            {/* Price Preview */}
            <div className="text-right">
              <p className="font-headline-sm text-label-lg text-primary font-bold">
                {formatCurrency(currentTotalPix)}
              </p>
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                À vista no Pix
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
