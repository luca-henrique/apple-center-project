"use client";

import React from "react";
import type { PaymentMethod } from "@/features/checkout/model/checkout.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

export interface OrderSummaryTotalBoxProps {
  finalTotal: number;
  installmentCount: number;
  installmentValue: number;
  paymentMethod: PaymentMethod;
}

export function OrderSummaryTotalBox({
  finalTotal,
  installmentCount,
  installmentValue,
  paymentMethod,
}: OrderSummaryTotalBoxProps) {
  return (
    <div className="mt-2 p-space-md bg-primary-container text-on-primary rounded-xl flex items-center justify-between shadow-sm">
      <div className="flex flex-col min-w-0">
        <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider block">
          {paymentMethod === "pix" ? "Total à Vista (Pix)" : "Total no Checkout"}
        </span>
        <span className="font-display-hero-mobile text-display-hero-mobile font-bold text-on-primary leading-tight truncate">
          {formatCurrency(finalTotal, { includeCents: true })}
        </span>
        <span className="font-body-sm text-[11px] text-primary-fixed-dim block mt-0.5">
          Ou {installmentCount}x de {formatCurrency(installmentValue, { includeCents: true })} sem juros
        </span>
      </div>

      <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center shrink-0 text-secondary-fixed">
        <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
          savings
        </span>
      </div>
    </div>
  );
}
