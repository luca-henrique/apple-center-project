"use client";

import React from "react";

export interface TradeInBottomCtaProps {
  isSubmitting: boolean;
  onContinue: () => void;
}

export function TradeInBottomCta({
  isSubmitting,
  onContinue,
}: TradeInBottomCtaProps) {
  return (
    <div className="pt-space-xs flex flex-col gap-2">
      <button
        type="button"
        id="cta-tradein"
        disabled={isSubmitting}
        onClick={onContinue}
        className="w-full min-h-13 py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <span className="material-symbols-outlined text-[20px] animate-spin" aria-hidden="true">
              refresh
            </span>
            <span>Garantindo Cotação...</span>
          </>
        ) : (
          <>
            <span>Continuar com Trade-in</span>
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              arrow_forward
            </span>
          </>
        )}
      </button>

      <span className="font-body-sm text-body-sm text-center text-on-surface-variant">
        Mais de 12.000 iPhones avaliados este mês
      </span>
    </div>
  );
}
