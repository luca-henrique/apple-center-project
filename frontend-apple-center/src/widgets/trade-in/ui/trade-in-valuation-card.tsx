"use client";

import React from "react";
import type { PayoutMode } from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

export interface TradeInValuationCardProps {
  currentValuation: number;
  finalCredit: number;
  payoutMode: PayoutMode;
  onSelectPayoutMode: (mode: PayoutMode) => void;
}

export function TradeInValuationCard({
  currentValuation,
  finalCredit,
  payoutMode,
  onSelectPayoutMode,
}: TradeInValuationCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-container via-tertiary-container to-primary text-on-primary p-space-md shadow-md border border-outline-variant/15">
      <div className="flex flex-col gap-space-xs">
        {/* Header badges */}
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed font-bold">
            Avaliação instantânea
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-label-sm px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary-fixed">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse" aria-hidden="true" />
            Válido por 7 dias
          </span>
        </div>

        {/* Big Price */}
        <div className="flex flex-col mt-1">
          <span className="font-body-sm text-body-sm text-primary-fixed-dim">
            Seu aparelho vale até
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-primary tracking-tight">
              {formatCurrency(currentValuation, { includeCents: true })}
            </span>
          </div>
        </div>

        {/* Redemption Modes Selection */}
        <div className="flex flex-col gap-2 mt-2 pt-2.5 border-t border-primary-fixed-variant/40">
          <span className="font-label-sm text-label-sm text-primary-fixed-dim font-medium">
            Escolha como deseja receber:
          </span>

          <div className="flex flex-col gap-2" role="radiogroup" aria-label="Forma de recebimento">
            {/* Mode 1: Credit with Bonus */}
            <label
              onClick={() => onSelectPayoutMode("credit")}
              className={`payout-card flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
                payoutMode === "credit"
                  ? "bg-on-primary/15 border-secondary-fixed/50 shadow-xs"
                  : "bg-on-primary/5 hover:bg-on-primary/10 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <input
                  type="radio"
                  name="payout-type"
                  value="credit"
                  checked={payoutMode === "credit"}
                  onChange={() => onSelectPayoutMode("credit")}
                  className="w-4 h-4 text-secondary accent-secondary cursor-pointer"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-label-md text-label-md font-bold text-on-primary truncate">
                      Crédito no novo iPhone
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold whitespace-nowrap">
                      + R$ 200 BÔNUS
                    </span>
                  </div>
                  <span className="font-body-sm text-[11px] text-primary-fixed leading-tight mt-0.5">
                    Total: {formatCurrency(finalCredit, { includeCents: true })} aplicados no checkout
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0 ml-2" aria-hidden="true">
                add_shopping_cart
              </span>
            </label>

            {/* Mode 2: Pix in Account */}
            <label
              onClick={() => onSelectPayoutMode("pix")}
              className={`payout-card flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
                payoutMode === "pix"
                  ? "bg-on-primary/15 border-secondary-fixed/50 shadow-xs"
                  : "bg-on-primary/5 hover:bg-on-primary/10 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <input
                  type="radio"
                  name="payout-type"
                  value="pix"
                  checked={payoutMode === "pix"}
                  onChange={() => onSelectPayoutMode("pix")}
                  className="w-4 h-4 text-secondary accent-secondary cursor-pointer"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md font-bold text-on-primary truncate">
                    Receber via Pix na conta
                  </span>
                  <span className="font-body-sm text-[11px] text-primary-fixed leading-tight mt-0.5">
                    Transferência direta após validação
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary-fixed-dim text-[20px] shrink-0 ml-2" aria-hidden="true">
                account_balance_wallet
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
