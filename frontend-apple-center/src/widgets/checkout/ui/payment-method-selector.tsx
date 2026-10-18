"use client";

import React from "react";
import type { PaymentMethod } from "@/features/checkout/model/checkout.schema";
import { PaymentMethodCard, type PaymentOptionConfig } from "./atoms/payment-method-card";

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const PAYMENT_OPTIONS: PaymentOptionConfig[] = [
  {
    method: "pix",
    title: "Pix Instantâneo",
    badge: "-10% OFF",
    description: "Aprovação imediata e envio prioritário",
    icon: "qr_code_2",
  },
  {
    method: "card",
    title: "Cartão de Crédito",
    description: "Até 12x sem juros no checkout",
    icon: "credit_card",
  },
  {
    method: "nupay",
    title: "NuPay ou Boleto",
    description: "Pague via app Nubank ou boleto bancário",
    icon: "account_balance_wallet",
  },
];

export function PaymentMethodSelector({
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <section
      aria-label="Forma de Pagamento"
      className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/10"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-label-lg text-on-surface font-semibold">
          Forma de Pagamento
        </h3>
        <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full font-bold">
          Pix economiza 10%
        </span>
      </div>

      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Selecione a forma de pagamento">
        {PAYMENT_OPTIONS.map((option) => (
          <PaymentMethodCard
            key={option.method}
            option={option}
            isSelected={selectedMethod === option.method}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
