"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  type TradeInModel,
  type PayoutMode,
} from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";
import { StepFourHero } from "./step-four/step-four-hero";
import { StepFourVoucherCard } from "./step-four/step-four-voucher-card";
import { StepFourUpgradeSuggestions } from "./step-four/step-four-upgrade-suggestions";
import { StepFourConciergeActions } from "./step-four/step-four-concierge-actions";

interface TradeInStepFourProps {
  selectedModel: TradeInModel;
  payoutMode: PayoutMode;
  calculations: {
    finalCash: number;
    finalCredit: number;
    currentValuation: number;
    creditBonus: number;
  };
  couponCode: string;
  protocolId: string;
  isCopied: boolean;
  onCopyCoupon: () => void;
  onApplyCreditAndBuy: (slug: string) => void;
  onSelectPayoutMode: (mode: PayoutMode) => void;
}

export function TradeInStepFour({
  selectedModel,
  calculations,
  couponCode,
  protocolId,
  isCopied,
  onCopyCoupon,
  onApplyCreditAndBuy,
  onSelectPayoutMode,
}: TradeInStepFourProps) {
  const [pixCashoutRequested, setPixCashoutRequested] = useState<boolean>(false);

  const handleSwitchToPix = () => {
    onSelectPayoutMode("pix");
    setPixCashoutRequested(true);
    toast.success("Alternado para Resgate via Pix!", {
      description: `O valor de ${formatCurrency(calculations.finalCash)} será creditado na sua chave cadastrada.`,
    });
  };

  return (
    <div className="flex flex-col gap-space-md w-full">
      <StepFourHero deviceName={selectedModel.name} protocolId={protocolId} />

      <StepFourVoucherCard
        pixCashoutRequested={pixCashoutRequested}
        calculations={calculations}
        couponCode={couponCode}
        isCopied={isCopied}
        onCopyCoupon={onCopyCoupon}
        onSwitchToPix={handleSwitchToPix}
      />

      <StepFourUpgradeSuggestions
        finalCredit={calculations.finalCredit}
        onApplyCreditAndBuy={onApplyCreditAndBuy}
      />

      <StepFourConciergeActions />
    </div>
  );
}
