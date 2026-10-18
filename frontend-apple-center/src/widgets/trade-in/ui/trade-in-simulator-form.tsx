"use client";

import React from "react";
import {
  type CosmeticCondition,
  type BatteryCondition,
  type TradeInModel,
} from "@/features/trade-in/model/trade-in.schema";
import { TradeInModelSelector } from "./atoms/trade-in-model-selector";
import { TradeInConditionSelector } from "./atoms/trade-in-condition-selector";
import { TradeInBatterySelector } from "./atoms/trade-in-battery-selector";

export interface TradeInSimulatorFormProps {
  selectedModel: TradeInModel;
  selectedModelId: string;
  condition: CosmeticCondition;
  battery: BatteryCondition;
  onSelectModel: (id: string) => void;
  onSelectCondition: (condition: CosmeticCondition) => void;
  onSelectBattery: (battery: BatteryCondition) => void;
}

export function TradeInSimulatorForm({
  selectedModel,
  selectedModelId,
  condition,
  battery,
  onSelectModel,
  onSelectCondition,
  onSelectBattery,
}: TradeInSimulatorFormProps) {
  return (
    <section
      aria-label="Etapas da simulação do Trade-in"
      className="flex flex-col gap-space-md bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/10"
    >
      <TradeInModelSelector
        selectedModel={selectedModel}
        selectedModelId={selectedModelId}
        onSelectModel={onSelectModel}
      />

      <div className="h-px bg-surface-container-highest" aria-hidden="true" />

      <TradeInConditionSelector
        condition={condition}
        onSelectCondition={onSelectCondition}
      />

      <div className="h-px bg-surface-container-highest" aria-hidden="true" />

      <TradeInBatterySelector
        battery={battery}
        onSelectBattery={onSelectBattery}
      />
    </section>
  );
}
