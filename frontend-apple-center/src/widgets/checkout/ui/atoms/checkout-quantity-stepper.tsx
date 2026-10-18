"use client";

import React from "react";

export interface CheckoutQuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export function CheckoutQuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 5,
}: CheckoutQuantityStepperProps) {
  return (
    <div
      className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/15"
      role="group"
      aria-label="Controle de quantidade de itens"
    >
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="min-w-11 min-h-11 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          remove
        </span>
      </button>

      <span
        className="w-7 text-center font-label-md text-label-md text-on-surface font-bold select-none"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="min-w-11 min-h-11 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          add
        </span>
      </button>
    </div>
  );
}
