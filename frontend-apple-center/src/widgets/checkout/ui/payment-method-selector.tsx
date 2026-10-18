"use client";

import React from "react";
import type { PaymentMethod } from "@/features/checkout/model/checkout.schema";

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

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
        {/* Pix Option */}
        <div
          role="radio"
          aria-checked={selectedMethod === "pix"}
          tabIndex={0}
          onClick={() => onSelect("pix")}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onSelect("pix");
            }
          }}
          className={`cursor-pointer min-h-[56px] p-space-sm rounded-xl flex items-center justify-between transition-all border ${
            selectedMethod === "pix"
              ? "bg-surface-container-low border-secondary/40 shadow-xs"
              : "bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/10"
          }`}
        >
          <div className="flex items-center gap-space-sm">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                selectedMethod === "pix"
                  ? "bg-secondary text-on-secondary"
                  : "bg-surface-container-high"
              }`}
            >
              {selectedMethod === "pix" && (
                <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                  check
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Pix Instantâneo
                </span>
                <span className="bg-primary-container text-on-primary font-label-sm text-[10px] px-1.5 py-0.5 rounded font-bold">
                  -10% OFF
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Aprovação imediata e envio prioritário
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-secondary text-[24px] shrink-0" aria-hidden="true">
            qr_code_2
          </span>
        </div>

        {/* Credit Card Option */}
        <div
          role="radio"
          aria-checked={selectedMethod === "card"}
          tabIndex={0}
          onClick={() => onSelect("card")}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onSelect("card");
            }
          }}
          className={`cursor-pointer min-h-[56px] p-space-sm rounded-xl flex items-center justify-between transition-all border ${
            selectedMethod === "card"
              ? "bg-surface-container-low border-secondary/40 shadow-xs"
              : "bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/10"
          }`}
        >
          <div className="flex items-center gap-space-sm">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                selectedMethod === "card"
                  ? "bg-secondary text-on-secondary"
                  : "bg-surface-container-high"
              }`}
            >
              {selectedMethod === "card" && (
                <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                  check
                </span>
              )}
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Cartão de Crédito
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Até 12x sem juros no checkout
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline text-[24px] shrink-0" aria-hidden="true">
            credit_card
          </span>
        </div>

        {/* NuPay or Boleto Option */}
        <div
          role="radio"
          aria-checked={selectedMethod === "nupay"}
          tabIndex={0}
          onClick={() => onSelect("nupay")}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onSelect("nupay");
            }
          }}
          className={`cursor-pointer min-h-[56px] p-space-sm rounded-xl flex items-center justify-between transition-all border ${
            selectedMethod === "nupay"
              ? "bg-surface-container-low border-secondary/40 shadow-xs"
              : "bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/10"
          }`}
        >
          <div className="flex items-center gap-space-sm">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                selectedMethod === "nupay"
                  ? "bg-secondary text-on-secondary"
                  : "bg-surface-container-high"
              }`}
            >
              {selectedMethod === "nupay" && (
                <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                  check
                </span>
              )}
            </div>
            <div>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                NuPay ou Boleto
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Pague via app Nubank ou boleto bancário
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline text-[24px] shrink-0" aria-hidden="true">
            account_balance_wallet
          </span>
        </div>
      </div>
    </section>
  );
}
