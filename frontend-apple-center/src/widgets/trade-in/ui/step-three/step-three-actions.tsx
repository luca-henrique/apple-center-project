import React from "react";
import { formatCurrency } from "@/shared/lib/format/currency";

interface StepThreeActionsProps {
  currentValuation: number;
  isSubmitting: boolean;
  onAcceptReport: () => void;
}

export function StepThreeActions({
  currentValuation,
  isSubmitting,
  onAcceptReport,
}: StepThreeActionsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl p-gutter pb-safe shadow-[0_-4px_16px_rgba(15,23,42,0.06)] border-t border-outline-variant/15">
      <div className="max-w-md mx-auto flex flex-col gap-space-xs">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onAcceptReport}
          className="w-full h-12 bg-secondary text-on-secondary rounded-lg font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-md cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">
                progress_activity
              </span>
              <span>Processando Resgate...</span>
            </>
          ) : (
            <>
              <span>Aceitar Laudo e Liberar {formatCurrency(currentValuation)}</span>
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                arrow_forward
              </span>
            </>
          )}
        </button>
        <p className="text-center font-body-sm text-[11px] text-on-surface-variant">
          Ao confirmar, seu cupom ou depósito será gerado em instantes com garantia Apple Center.
        </p>
      </div>
    </div>
  );
}
