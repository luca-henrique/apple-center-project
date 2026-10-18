"use client";

import React from "react";
import { TradeInHero } from "./trade-in-hero";
import { TradeInSimulatorForm } from "./trade-in-simulator-form";
import { TradeInValuationCard } from "./trade-in-valuation-card";
import { TradeInHowItWorks } from "./trade-in-how-it-works";
import { TradeInGuaranteeBanner } from "./trade-in-guarantee-banner";
import { TradeInBottomCta } from "./trade-in-bottom-cta";
import {
  type TradeInModel,
  type CosmeticCondition,
  type BatteryCondition,
  type PayoutMode,
} from "@/features/trade-in/model/trade-in.schema";

interface TradeInStepOneProps {
  selectedModel: TradeInModel;
  selectedModelId: string;
  condition: CosmeticCondition;
  battery: BatteryCondition;
  payoutMode: PayoutMode;
  calculations: {
    finalCash: number;
    finalCredit: number;
    currentValuation: number;
    creditBonus: number;
  };
  isSubmitting: boolean;
  onSelectModel: (id: string) => void;
  onSelectCondition: (cond: CosmeticCondition) => void;
  onSelectBattery: (bat: BatteryCondition) => void;
  onSelectPayoutMode: (mode: PayoutMode) => void;
  onContinue: () => void;
}

export function TradeInStepOne({
  selectedModel,
  selectedModelId,
  condition,
  battery,
  payoutMode,
  calculations,
  isSubmitting,
  onSelectModel,
  onSelectCondition,
  onSelectBattery,
  onSelectPayoutMode,
  onContinue,
}: TradeInStepOneProps) {
  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Hero Pitch Banner */}
      <TradeInHero />

      {/* Simulator Form */}
      <TradeInSimulatorForm
        selectedModel={selectedModel}
        selectedModelId={selectedModelId}
        condition={condition}
        battery={battery}
        onSelectModel={onSelectModel}
        onSelectCondition={onSelectCondition}
        onSelectBattery={onSelectBattery}
      />

      {/* Valuation Estimate Card */}
      <TradeInValuationCard
        currentValuation={calculations.currentValuation}
        finalCredit={calculations.finalCredit}
        payoutMode={payoutMode}
        onSelectPayoutMode={onSelectPayoutMode}
      />

      {/* How It Works */}
      <TradeInHowItWorks />

      {/* Guarantee & Security Banner */}
      <TradeInGuaranteeBanner />

      {/* Step 1 Action CTA */}
      <TradeInBottomCta isSubmitting={isSubmitting} onContinue={onContinue} />
    </div>
  );
}
