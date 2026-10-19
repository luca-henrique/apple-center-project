"use client";

import React from "react";
import { type TradeInStep } from "@/features/trade-in/model/trade-in.schema";

interface TradeInJourneyStepperProps {
  currentStep: TradeInStep;
  protocolId?: string;
  onStepClick?: (step: TradeInStep) => void;
}

export function TradeInJourneyStepper({
  currentStep,
  protocolId = "#TRD-89420",
  onStepClick,
}: TradeInJourneyStepperProps) {
  const steps: { step: TradeInStep; label: string; icon: string }[] = [
    { step: 1, label: "Cotação", icon: "request_quote" },
    { step: 2, label: "Envio", icon: "local_shipping" },
    { step: 3, label: "Laudo", icon: "verified" },
    { step: 4, label: "Resgate", icon: "payments" },
  ];

  // Calculate track progress percentage
  const progressPercent =
    currentStep === 1 ? 12 : currentStep === 2 ? 40 : currentStep === 3 ? 72 : 100;

  return (
    <section className="w-full">
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/20">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
              eco
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Jornada Trade-in Oficial
            </span>
          </div>
          <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full font-mono">
            {protocolId}
          </span>
        </div>

        {/* Step Nodes & Track */}
        <div className="relative flex items-center justify-between mt-space-md px-1 select-none">
          {/* Connecting Track Background */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-surface-container-high rounded-full z-0">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {steps.map((item) => {
            const isCompleted = item.step < currentStep;
            const isCurrent = item.step === currentStep;
            const canClick = isCompleted && onStepClick;

            return (
              <button
                type="button"
                key={item.step}
                disabled={!canClick}
                onClick={() => canClick && onStepClick(item.step)}
                className={`relative z-10 flex flex-col items-center group transition-transform ${
                  canClick ? "cursor-pointer hover:scale-105" : "cursor-default"
                }`}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Etapa ${item.step}: ${item.label}`}
              >
                {/* Node Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-secondary text-on-secondary shadow-sm"
                      : isCurrent
                        ? "w-8 h-8 -my-0.5 bg-secondary-container text-on-secondary-container shadow-md ring-2 ring-secondary/30 animate-pulse"
                        : "bg-surface-container-high text-outline"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    {isCompleted ? "check" : item.icon}
                  </span>
                </div>

                {/* Node Label */}
                <span
                  className={`font-label-sm text-[11px] mt-1 transition-colors ${
                    isCurrent
                      ? "text-secondary font-bold"
                      : isCompleted
                        ? "text-on-surface font-semibold"
                        : "text-outline font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
