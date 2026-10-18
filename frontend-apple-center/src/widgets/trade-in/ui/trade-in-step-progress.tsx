import React from "react";

export interface TradeInStepProgressProps {
  currentStep: number;
}

export function TradeInStepProgress({ currentStep }: TradeInStepProgressProps) {
  return (
    <div className="flex items-center justify-between px-space-xs" aria-label="Progresso da simulação">
      <div className="flex items-center gap-2">
        <span
          className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs select-none"
          aria-live="polite"
        >
          {currentStep}
        </span>
        <span className="font-label-md text-label-md text-on-surface font-semibold">
          Simulação em 3 passos
        </span>
      </div>

      <div className="flex gap-1.5" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3}>
        {[1, 2, 3].map((step) => {
          const isCompletedOrCurrent = step <= currentStep;
          return (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isCompletedOrCurrent
                  ? "w-8 bg-secondary"
                  : "w-2.5 bg-surface-container-highest"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
