import React from "react";

interface StepTwoBottomCtaProps {
  isSubmitting: boolean;
  isDisabled: boolean;
  onConfirmShipping: () => void;
}

export function StepTwoBottomCta({
  isSubmitting,
  isDisabled,
  onConfirmShipping,
}: StepTwoBottomCtaProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl p-space-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe border-t border-outline-variant/15">
      <div className="max-w-md mx-auto flex flex-col gap-1.5 items-center">
        <button
          type="button"
          disabled={isDisabled || isSubmitting}
          onClick={onConfirmShipping}
          className="w-full h-13 min-h-13 py-3.5 px-space-md rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">
                progress_activity
              </span>
              <span>Gerando Etiqueta e Laudo...</span>
            </>
          ) : (
            <>
              <span>Gerar Etiqueta de Envio Grátis</span>
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                local_shipping
              </span>
            </>
          )}
        </button>
        <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[14px] text-secondary" aria-hidden="true">
            verified
          </span>
          <span>Frete Sedex Reverso Grátis • Seguro Porto Seguro Coberto</span>
        </div>
      </div>
    </div>
  );
}
