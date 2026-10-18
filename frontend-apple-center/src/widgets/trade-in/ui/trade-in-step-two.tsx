"use client";

import React from "react";
import {
  type TradeInModel,
  type CosmeticCondition,
  type BatteryCondition,
  type PayoutMode,
  type PixKeyType,
  type TradeInOwnerFormValues,
} from "@/features/trade-in/model/trade-in.schema";
import { StepTwoQuoteSummary } from "./step-two/step-two-quote-summary";
import { StepTwoPayoutSelector } from "./step-two/step-two-payout-selector";
import { StepTwoOwnerCard } from "./step-two/step-two-owner-card";
import { StepTwoAddressAndLegal } from "./step-two/step-two-address-and-legal";

interface TradeInStepTwoProps {
  selectedModel: TradeInModel;
  condition: CosmeticCondition;
  battery: BatteryCondition;
  payoutMode: PayoutMode;
  calculations: {
    finalCash: number;
    finalCredit: number;
    currentValuation: number;
    creditBonus: number;
  };
  ownerData: TradeInOwnerFormValues;
  setOwnerData: React.Dispatch<React.SetStateAction<TradeInOwnerFormValues>>;
  pixKeyType: PixKeyType;
  setPixKeyType: (type: PixKeyType) => void;
  pixKey: string;
  setPixKey: (key: string) => void;
  onSelectPayoutMode: (mode: PayoutMode) => void;
  isSubmitting: boolean;
  onConfirmShipping: () => void;
}

export function TradeInStepTwo({
  selectedModel,
  condition,
  battery,
  payoutMode,
  calculations,
  ownerData,
  setOwnerData,
  pixKeyType,
  setPixKeyType,
  pixKey,
  setPixKey,
  onSelectPayoutMode,
  isSubmitting,
  onConfirmShipping,
}: TradeInStepTwoProps) {
  return (
    <div className="flex flex-col gap-space-md w-full">
      <StepTwoQuoteSummary
        selectedModel={selectedModel}
        condition={condition}
        battery={battery}
        calculations={calculations}
      />

      <StepTwoPayoutSelector
        payoutMode={payoutMode}
        calculations={calculations}
        pixKeyType={pixKeyType}
        setPixKeyType={setPixKeyType}
        pixKey={pixKey}
        setPixKey={setPixKey}
        onSelectPayoutMode={onSelectPayoutMode}
        ownerName={ownerData.fullName}
      />

      <StepTwoOwnerCard ownerData={ownerData} />

      <StepTwoAddressAndLegal
        ownerData={ownerData}
        setOwnerData={setOwnerData}
        isSubmitting={isSubmitting}
        onConfirmShipping={onConfirmShipping}
      />
    </div>
  );
}
