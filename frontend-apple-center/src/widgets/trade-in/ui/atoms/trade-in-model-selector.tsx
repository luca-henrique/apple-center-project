import React from "react";
import Image from "next/image";
import {
  type TradeInModel,
  TRADE_IN_DEVICE_CATALOG,
} from "@/features/trade-in/model/trade-in.schema";

interface TradeInModelSelectorProps {
  selectedModel: TradeInModel;
  selectedModelId: string;
  onSelectModel: (id: string) => void;
}

export function TradeInModelSelector({
  selectedModel,
  selectedModelId,
  onSelectModel,
}: TradeInModelSelectorProps) {
  return (
    <div className="flex flex-col gap-space-sm" id="section-step-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor="model-select"
          className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5 font-semibold"
        >
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
          className="w-full h-12 min-h-12 px-3 pr-10 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/15 cursor-pointer"
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
  );
}
