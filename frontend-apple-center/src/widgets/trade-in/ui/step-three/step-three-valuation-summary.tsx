import React from "react";
import Image from "next/image";
import type { TradeInModel } from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

interface StepThreeValuationSummaryProps {
  selectedModel: TradeInModel;
  calculations: {
    finalCash: number;
    finalCredit: number;
    creditBonus: number;
  };
}

export function StepThreeValuationSummary({
  selectedModel,
  calculations,
}: StepThreeValuationSummaryProps) {
  return (
    <section className="w-full">
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
        <div className="flex gap-space-md items-start">
          <div className="w-24 h-24 rounded-lg bg-surface-container-low p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src={selectedModel.imageUrl}
              alt={selectedModel.imageAlt}
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1 mb-1 flex-wrap">
              <h3 className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                {selectedModel.name}
              </h3>
              <span className="shrink-0 px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-[11px] font-bold">
                Verde Sierra
              </span>
            </div>

            <div className="space-y-1 mb-space-xs">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
                  check_circle
                </span>
                <span>
                  Grau Estético: <strong className="text-on-surface font-semibold">Excelente A+</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
                  battery_charging_full
                </span>
                <span>
                  Saúde Bateria: <strong className="text-secondary font-semibold">88%</strong>
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-[10px] font-semibold">
              <span className="material-symbols-outlined text-[12px] text-secondary" aria-hidden="true">
                verified
              </span>
              <span>Sem divergências de valor</span>
            </div>
          </div>
        </div>

        {/* Financial Split Cards */}
        <div className="mt-space-md grid grid-cols-1 gap-space-sm">
          <div className="p-space-sm rounded-lg bg-primary-container text-on-primary shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] uppercase font-bold tracking-wider mb-1">
                  Recomendado • Trade-in Up
                </span>
                <p className="font-body-sm text-body-sm text-on-primary-container">
                  Crédito para Novo iPhone na loja
                </p>
                <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                  <span className="font-headline-md text-headline-md font-bold text-on-primary">
                    {formatCurrency(calculations.finalCredit)}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold">
                    + R$ {calculations.creditBonus} bônus
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container-lowest/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary-container text-[20px]" aria-hidden="true">
                  phone_iphone
                </span>
              </div>
            </div>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/15">
            <div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Ou resgate em dinheiro via Pix à vista
              </p>
              <p className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {formatCurrency(calculations.finalCash)}
              </p>
            </div>
            <span className="material-symbols-outlined text-outline text-[22px]" aria-hidden="true">
              qr_code_2
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
