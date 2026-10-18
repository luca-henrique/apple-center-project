import React from "react";
import Image from "next/image";
import {
  TRADE_IN_UPGRADE_SUGGESTIONS,
} from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

interface StepFourUpgradeSuggestionsProps {
  finalCredit: number;
  onApplyCreditAndBuy: (slug: string) => void;
}

export function StepFourUpgradeSuggestions({
  finalCredit,
  onApplyCreditAndBuy,
}: StepFourUpgradeSuggestionsProps) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]" aria-hidden="true">
            recommend
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Sugestões com seu crédito aplicado
          </h3>
        </div>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
        Economia imediata calculada com seu saldo de {formatCurrency(finalCredit)}:
      </p>

      <div className="flex flex-col gap-space-md">
        {TRADE_IN_UPGRADE_SUGGESTIONS.map((item) => {
          const finalDiscountedPrice = Math.max(0, item.originalPrice - finalCredit);

          return (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15"
            >
              <div className="flex gap-space-md">
                <div className="w-24 h-24 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-[11px] font-bold">
                      {item.tag}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                    {item.name}
                  </h4>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">
                    {item.colorName}
                  </span>

                  <div className="mt-2">
                    <span className="font-body-sm text-body-sm text-on-surface-variant line-through block">
                      De {formatCurrency(item.originalPrice)}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        Por
                      </span>
                      <span className="font-headline-md text-headline-md font-bold text-secondary">
                        {formatCurrency(finalDiscountedPrice)}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {item.installmentText}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onApplyCreditAndBuy(item.productSlug)}
                className="w-full mt-space-md h-12 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm cursor-pointer hover:bg-primary/95"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  shopping_cart_checkout
                </span>
                <span>Aplicar Crédito e Comprar</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
