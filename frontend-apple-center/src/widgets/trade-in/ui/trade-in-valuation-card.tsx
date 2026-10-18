"use client";

import React from "react";
import type { PayoutMode } from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";
import { TradeInPayoutOption } from "./atoms/trade-in-payout-option";

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
    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary-container via-tertiary-container to-primary text-on-primary p-space-md shadow-md border border-outline-variant/15">
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
            <TradeInPayoutOption
              mode="credit"
              isSelected={payoutMode === "credit"}
              onSelect={onSelectPayoutMode}
              title="Crédito no novo iPhone"
              badge="+ R$ 200 BÔNUS"
              subtitle={`Total: ${formatCurrency(finalCredit, { includeCents: true })} aplicados no checkout`}
              icon="add_shopping_cart"
            />

            <TradeInPayoutOption
              mode="pix"
              isSelected={payoutMode === "pix"}
              onSelect={onSelectPayoutMode}
              title="Receber via Pix na conta"
              subtitle="Transferência direta após validação"
              icon="account_balance_wallet"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
