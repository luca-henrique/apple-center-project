"use client";

import React from "react";
import { TradeInHeader } from "./trade-in-header";
import { TradeInJourneyStepper } from "./trade-in-journey-stepper";
import { TradeInStepOne } from "./trade-in-step-one";
import { TradeInStepTwo } from "./trade-in-step-two";
import { TradeInStepThree } from "./trade-in-step-three";
import { TradeInStepFour } from "./trade-in-step-four";
import { useTradeIn } from "@/features/trade-in/hooks/use-trade-in";

export function TradeInView() {
  const {
    currentStep,
    selectedModelId,
    selectedModel,
    condition,
    battery,
    payoutMode,
    ownerData,
    setOwnerData,
    pixKeyType,
    setPixKeyType,
    pixKey,
    setPixKey,
    isSubmitting,
    isCopied,
    couponCode,
    protocolId,
    calculations,
    goToStep,
    goToPreviousStep,
    handleSelectModel,
    handleSelectCondition,
    handleSelectBattery,
    handleSelectPayoutMode,
    handleContinueTradeIn,
    handleConfirmShippingAndGenerateReport,
    handleAcceptReportAndReleaseCredit,
    handleCopyCoupon,
    handleApplyCreditAndBuy,
  } = useTradeIn();

  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      {/* Top Header with Dynamic Step Title & Back Navigation */}
      <TradeInHeader currentStep={currentStep} onBack={goToPreviousStep} />

      {/* Main Flow Container */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 bg-surface">
        <div className="w-full max-w-xl mx-auto px-gutter pt-space-xs pb-space-lg flex flex-col gap-space-md">
          {/* Top 4-Step Journey Progress Bar */}
          <TradeInJourneyStepper
            currentStep={currentStep}
            protocolId={protocolId}
            onStepClick={goToStep}
          />

          {/* Step 1: Simulator & Initial Valuation */}
          {currentStep === 1 && (
            <TradeInStepOne
              selectedModel={selectedModel}
              selectedModelId={selectedModelId}
              condition={condition}
              battery={battery}
              payoutMode={payoutMode}
              calculations={calculations}
              isSubmitting={isSubmitting}
              onSelectModel={handleSelectModel}
              onSelectCondition={handleSelectCondition}
              onSelectBattery={handleSelectBattery}
              onSelectPayoutMode={handleSelectPayoutMode}
              onContinue={handleContinueTradeIn}
            />
          )}

          {/* Step 2: Owner Data, Address, Pix, Legal Checkboxes */}
          {currentStep === 2 && (
            <TradeInStepTwo
              selectedModel={selectedModel}
              condition={condition}
              battery={battery}
              payoutMode={payoutMode}
              calculations={calculations}
              ownerData={ownerData}
              setOwnerData={setOwnerData}
              pixKeyType={pixKeyType}
              setPixKeyType={setPixKeyType}
              pixKey={pixKey}
              setPixKey={setPixKey}
              onSelectPayoutMode={handleSelectPayoutMode}
              isSubmitting={isSubmitting}
              onConfirmShipping={handleConfirmShippingAndGenerateReport}
            />
          )}

          {/* Step 3: Certified Lab Inspection Report & Authentication Seal */}
          {currentStep === 3 && (
            <TradeInStepThree
              selectedModel={selectedModel}
              payoutMode={payoutMode}
              calculations={calculations}
              isSubmitting={isSubmitting}
              onAcceptReport={handleAcceptReportAndReleaseCredit}
            />
          )}

          {/* Step 4: Redemption, Voucher Code, Smart Upgrade Suggestions, PDF Receipt */}
          {currentStep === 4 && (
            <TradeInStepFour
              selectedModel={selectedModel}
              payoutMode={payoutMode}
              calculations={calculations}
              couponCode={couponCode}
              protocolId={protocolId}
              isCopied={isCopied}
              onCopyCoupon={handleCopyCoupon}
              onApplyCreditAndBuy={handleApplyCreditAndBuy}
              onSelectPayoutMode={handleSelectPayoutMode}
            />
          )}
        </div>
      </main>
    </div>
  );
}

