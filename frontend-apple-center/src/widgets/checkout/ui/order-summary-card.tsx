"use client";

import React from "react";
import type { PaymentMethod } from "@/features/checkout/model/checkout.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

export interface OrderSummaryCardProps {
  itemsSubtotal: number;
  insuranceTotal: number;
  isInsuranceActive: boolean;
  shippingTotal: number;
  couponDiscount: number;
  appliedCouponCode: string | null;
  pixDiscount: number;
  finalTotal: number;
  installmentCount: number;
  installmentValue: number;
  paymentMethod: PaymentMethod;
}

export function OrderSummaryCard({
  itemsSubtotal,
  insuranceTotal,
  isInsuranceActive,
  couponDiscount,
  appliedCouponCode,
  pixDiscount,
  finalTotal,
  installmentCount,
  installmentValue,
  paymentMethod,
}: OrderSummaryCardProps) {
  return (
    <section
      aria-label="Resumo do Pedido"
      className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/10"
    >
      <h3 className="font-headline-sm text-label-lg text-on-surface font-semibold">
        Resumo do Pedido
      </h3>

      <div className="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span>Subtotal do aparelho</span>
          <span className="text-on-surface font-medium">
            {formatCurrency(itemsSubtotal, { includeCents: true })}
          </span>
        </div>

        {/* Protection Addon */}
        <div
          className={`flex justify-between items-center transition-opacity ${
            isInsuranceActive ? "text-on-surface-variant" : "opacity-40 line-through"
          }`}
        >
          <span className="flex items-center gap-1">
            Proteção Apple Center (1 ano)
          </span>
          <span className="text-on-surface font-medium">
            + {formatCurrency(insuranceTotal || 319, { includeCents: true })}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center text-secondary">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              local_shipping
            </span>
            Frete Expresso Assegurado
          </span>
          <span className="font-semibold uppercase tracking-wider text-label-sm">
            Grátis
          </span>
        </div>

        {/* Coupon Discount */}
        {couponDiscount > 0 && (
          <div className="flex justify-between items-center text-secondary">
            <span>Cupom {appliedCouponCode}</span>
            <span className="font-semibold">
              - {formatCurrency(couponDiscount, { includeCents: true })}
            </span>
          </div>
        )}

        {/* Pix Discount */}
        {paymentMethod === "pix" && pixDiscount > 0 && (
          <div className="flex justify-between items-center text-secondary">
            <span>Desconto especial Pix (10%)</span>
            <span className="font-semibold">
              - {formatCurrency(pixDiscount, { includeCents: true })}
            </span>
          </div>
        )}
      </div>

      {/* Total Box Highlighted in Deep Forest Tone */}
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

        <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0 text-secondary-fixed">
          <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
            savings
          </span>
        </div>
      </div>
    </section>
  );
}
