"use client";

import React from "react";
import { TradeInHeader } from "./trade-in-header";
import { TradeInHero } from "./trade-in-hero";
import { TradeInStepProgress } from "./trade-in-step-progress";
import { TradeInSimulatorForm } from "./trade-in-simulator-form";
import { TradeInValuationCard } from "./trade-in-valuation-card";
import { TradeInHowItWorks } from "./trade-in-how-it-works";
import { TradeInGuaranteeBanner } from "./trade-in-guarantee-banner";
import { TradeInBottomCta } from "./trade-in-bottom-cta";
import { useTradeIn } from "@/features/trade-in/hooks/use-trade-in";

export function TradeInView() {
  const {
    selectedModelId,
    selectedModel,
    condition,
    battery,
    payoutMode,
    activeStep,
    isSubmitting,
    calculations,
    handleSelectModel,
    handleSelectCondition,
    handleSelectBattery,
    handleSelectPayoutMode,
    handleContinueTradeIn,
  } = useTradeIn();

  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      {/* Top Header */}
      <TradeInHeader />

      {/* Main Flow */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-surface">
        <div className="w-full max-w-xl mx-auto px-gutter pt-space-md pb-space-lg flex flex-col gap-space-lg">
          {/* Hero Banner */}
          <TradeInHero />

          {/* Step Progress */}
          <TradeInStepProgress currentStep={activeStep} />

          {/* Step Form Section */}
          <TradeInSimulatorForm
            selectedModel={selectedModel}
            selectedModelId={selectedModelId}
            condition={condition}
            battery={battery}
            onSelectModel={handleSelectModel}
            onSelectCondition={handleSelectCondition}
            onSelectBattery={handleSelectBattery}
          />

          {/* Valuation Card */}
          <TradeInValuationCard
            currentValuation={calculations.currentValuation}
            finalCredit={calculations.finalCredit}
            payoutMode={payoutMode}
            onSelectPayoutMode={handleSelectPayoutMode}
          />

          {/* How It Works */}
          <TradeInHowItWorks />

          {/* Guarantee Banner */}
          <TradeInGuaranteeBanner />

          {/* Bottom Action CTA */}
          <TradeInBottomCta
            isSubmitting={isSubmitting}
            onContinue={handleContinueTradeIn}
          />
        </div>
      </main>
    </div>
  );
}
