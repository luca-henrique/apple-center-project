"use client";

import React from "react";
import Image from "next/image";
import {
  type CosmeticCondition,
  type BatteryCondition,
  type TradeInModel,
  TRADE_IN_DEVICE_CATALOG,
  CONDITION_MULTIPLIERS,
  BATTERY_MULTIPLIERS,
} from "@/features/trade-in/model/trade-in.schema";

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
      {/* ETAPA 1: Modelo & Capacidade */}
      <div className="flex flex-col gap-space-sm" id="section-step-1">
        <div className="flex items-center justify-between">
          <label htmlFor="model-select" className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
              smartphone
            </span>
            1. Qual é o seu modelo atual?
          </label>
          <span className="font-label-sm text-label-sm text-secondary font-bold">
            Passo 1/3
          </span>
        </div>

        <div className="relative">
          <select
            id="model-select"
            value={selectedModelId}
            onChange={(e) => onSelectModel(e.target.value)}
            className="w-full h-12 min-h-[48px] px-3 pr-10 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/15 cursor-pointer"
          >
            {TRADE_IN_DEVICE_CATALOG.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <span
            className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[20px]"
            aria-hidden="true"
          >
            expand_more
          </span>
        </div>

        {/* Visual Mini Thumbnail of Device */}
        <div className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/10">
          <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center shadow-xs overflow-hidden shrink-0 relative p-1">
            <Image
              src={selectedModel.imageUrl}
              alt={selectedModel.imageAlt}
              fill
              sizes="48px"
              className="object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
              {selectedModel.name}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-secondary" aria-hidden="true">
                verified
              </span>
              Homologado Anatel
            </span>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-surface-container-highest" aria-hidden="true" />

      {/* ETAPA 2: Estado Cosmético */}
      <div className="flex flex-col gap-space-sm" id="section-step-2">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
              verified_user
            </span>
            2. Qual o estado do aparelho?
          </span>
          <span className="font-label-sm text-label-sm text-secondary font-bold">
            Passo 2/3
          </span>
        </div>

        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Estado cosmético do aparelho">
          {(Object.keys(CONDITION_MULTIPLIERS) as CosmeticCondition[]).map((condKey) => {
            const cond = CONDITION_MULTIPLIERS[condKey];
            const isSelected = condition === condKey;

            return (
              <button
                key={condKey}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectCondition(condKey)}
                className={`w-full min-h-[52px] p-3 rounded-lg text-left flex items-start justify-between transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-surface-container border-secondary/40 shadow-xs"
                    : "bg-surface-container-low hover:bg-surface-container border-transparent"
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${
                      isSelected ? "text-secondary" : "text-on-surface-variant"
                    }`}
                    aria-hidden="true"
                  >
                    {cond.icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                      {cond.label}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {cond.desc}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0" aria-hidden="true">
                    check_circle
                  </span>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-outline-variant/40 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-surface-container-highest" aria-hidden="true" />

      {/* ETAPA 3: Saúde da Bateria */}
      <div className="flex flex-col gap-space-sm" id="section-step-3">
        <div className="flex items-center justify-between">
          <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 font-semibold">
            <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
              battery_charging_full
            </span>
            3. Saúde da bateria
          </span>
          <span className="font-label-sm text-label-sm text-secondary font-bold">
            Passo 3/3
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Saúde da bateria">
          {(Object.keys(BATTERY_MULTIPLIERS) as BatteryCondition[]).map((batKey) => {
            const bat = BATTERY_MULTIPLIERS[batKey];
            const isSelected = battery === batKey;

            return (
              <button
                key={batKey}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectBattery(batKey)}
                className={`min-h-[52px] p-3 rounded-lg text-center flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-surface-container border-secondary/40 shadow-xs"
                    : "bg-surface-container-low hover:bg-surface-container border-transparent"
                }`}
              >
                <div
                  className={`flex items-center gap-1 ${
                    isSelected ? "text-secondary font-bold" : "text-on-surface-variant"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    {bat.icon}
                  </span>
                  <span className="font-label-md text-label-md">{bat.label}</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {bat.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
