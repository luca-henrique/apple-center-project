import React from "react";
import Image from "next/image";
import {
  type TradeInModel,
  type CosmeticCondition,
  type BatteryCondition,
  CONDITION_MULTIPLIERS,
} from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

interface StepTwoQuoteSummaryProps {
  selectedModel: TradeInModel;
  condition: CosmeticCondition;
  battery: BatteryCondition;
  calculations: {
    finalCash: number;
    finalCredit: number;
    currentValuation: number;
    creditBonus: number;
  };
}

export function StepTwoQuoteSummary({
  selectedModel,
  condition,
  battery,
  calculations,
}: StepTwoQuoteSummaryProps) {
  return (
    <section className="w-full">
      <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-secondary opacity-15 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-space-xs flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-label-sm font-label-sm text-primary-fixed">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              lock_clock
            </span>
            Cotação Garantida por 7 dias
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
              shield
            </span>
            Laudo Pré-Aprovado
          </span>
        </div>

        <div className="flex items-center gap-space-md py-space-xs border-y border-primary-fixed-variant/40 my-space-xs">
          <div className="w-16 h-16 rounded-lg bg-surface-container-lowest/90 p-1 shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src={selectedModel.imageUrl}
              alt={selectedModel.imageAlt}
              width={64}
              height={64}
              className="object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-label-lg text-label-lg font-bold text-on-primary truncate">
              {selectedModel.name}
            </span>
            <div className="flex items-center gap-2 mt-0.5 text-primary-fixed text-label-sm font-label-sm">
              <span>{CONDITION_MULTIPLIERS[condition].label}</span>
              <span>•</span>
              <span>Bateria {battery === "above85" ? "≥ 85%" : "< 85%"}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-primary">
                {formatCurrency(calculations.currentValuation)}
              </span>
              <span className="text-label-sm font-label-sm text-primary-fixed">
                valor estimado
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
