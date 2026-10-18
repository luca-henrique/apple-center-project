import React from "react";
import {
  type BatteryCondition,
  BATTERY_MULTIPLIERS,
} from "@/features/trade-in/model/trade-in.schema";

interface TradeInBatterySelectorProps {
  battery: BatteryCondition;
  onSelectBattery: (battery: BatteryCondition) => void;
}

export function TradeInBatterySelector({
  battery,
  onSelectBattery,
}: TradeInBatterySelectorProps) {
  return (
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
              className={`min-h-13 p-3 rounded-lg text-center flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
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
  );
}
