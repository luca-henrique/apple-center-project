"use client";

import React from "react";

export interface CheckoutBottomCtaProps {
  isProcessing: boolean;
  onFinalize: () => void;
}

export function CheckoutBottomCta({
  isProcessing,
  onFinalize,
}: CheckoutBottomCtaProps) {
  return (
    <div className="pt-space-xs flex flex-col gap-2">
      <button
        type="button"
        id="checkout-btn"
        disabled={isProcessing}
        onClick={onFinalize}
        className="w-full min-h-[52px] bg-secondary hover:bg-secondary/95 text-on-secondary font-headline-sm text-headline-sm py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isProcessing ? (
          <>
            <span className="material-symbols-outlined text-[20px] animate-spin" aria-hidden="true">
              refresh
            </span>
            <span>Processando Ambiente Seguro...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              lock
            </span>
            <span>Finalizar Pedido Seguro</span>
          </>
        )}
      </button>

      {/* Trust bullets below CTA */}
      <div className="flex items-center justify-center gap-space-sm text-on-surface-variant py-1 flex-wrap">
        <span className="flex items-center gap-1 font-body-sm text-[11px]">
          <span className="material-symbols-outlined text-[14px] text-secondary" aria-hidden="true">
            local_shipping
          </span>
          Envio em até 24h
        </span>
        <span className="text-outline-variant select-none" aria-hidden="true">
          •
        </span>
        <span className="flex items-center gap-1 font-body-sm text-[11px]">
          <span className="material-symbols-outlined text-[14px] text-secondary" aria-hidden="true">
            verified
          </span>
          Nota Fiscal Eletrônica
        </span>
        <span className="text-outline-variant select-none" aria-hidden="true">
          •
        </span>
        <span className="flex items-center gap-1 font-body-sm text-[11px]">
          <span className="material-symbols-outlined text-[14px] text-secondary" aria-hidden="true">
            support_agent
          </span>
          Suporte Humano VIP
        </span>
      </div>
    </div>
  );
}
