import React from "react";
import {
  type CosmeticCondition,
  CONDITION_MULTIPLIERS,
} from "@/features/trade-in/model/trade-in.schema";

interface TradeInConditionSelectorProps {
  condition: CosmeticCondition;
  onSelectCondition: (condition: CosmeticCondition) => void;
}

export function TradeInConditionSelector({
  condition,
  onSelectCondition,
}: TradeInConditionSelectorProps) {
  return (
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
              className={`w-full min-h-13 p-3 rounded-lg text-left flex items-start justify-between transition-all border cursor-pointer ${
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
  );
}
