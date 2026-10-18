"use client";

import React, { useState } from "react";
import {
  type TradeInModel,
  type PayoutMode,
  TECHNICAL_INSPECTION_GROUPS,
} from "@/features/trade-in/model/trade-in.schema";
import { StepThreeStatusCard } from "./step-three/step-three-status-card";
import { StepThreeValuationSummary } from "./step-three/step-three-valuation-summary";
import { StepThreeInspectionAccordion } from "./step-three/step-three-inspection-accordion";
import { StepThreeVideoAndSeal } from "./step-three/step-three-video-and-seal";
import { StepThreeActions } from "./step-three/step-three-actions";

interface TradeInStepThreeProps {
  selectedModel: TradeInModel;
  payoutMode: PayoutMode;
  calculations: {
    finalCash: number;
    finalCredit: number;
    currentValuation: number;
    creditBonus: number;
  };
  isSubmitting: boolean;
  onAcceptReport: () => void;
}

export function TradeInStepThree({
  selectedModel,
  calculations,
  isSubmitting,
  onAcceptReport,
}: TradeInStepThreeProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "biometrics-display": true,
    "cameras-sensors": true,
    "logic-board": false,
    "security-compliance": false,
  });

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const allExpanded = Object.values(expandedGroups).every(Boolean);
    const updated: Record<string, boolean> = {};
    TECHNICAL_INSPECTION_GROUPS.forEach((g) => {
      updated[g.id] = !allExpanded;
    });
    setExpandedGroups(updated);
  };

  return (
    <div className="flex flex-col gap-space-md w-full">
      <StepThreeStatusCard />

      <StepThreeValuationSummary
        selectedModel={selectedModel}
        calculations={calculations}
      />

      <StepThreeInspectionAccordion
        expandedGroups={expandedGroups}
        onToggleGroup={toggleGroup}
        onToggleAll={toggleAll}
      />

      <StepThreeVideoAndSeal />

      <StepThreeActions
        currentValuation={calculations.currentValuation}
        isSubmitting={isSubmitting}
        onAcceptReport={onAcceptReport}
      />
    </div>
  );
}
