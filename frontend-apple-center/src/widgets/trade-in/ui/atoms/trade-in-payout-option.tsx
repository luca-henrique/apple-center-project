import React from "react";
import type { PayoutMode } from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

interface TradeInPayoutOptionProps {
  mode: PayoutMode;
  isSelected: boolean;
  onSelect: (mode: PayoutMode) => void;
  title: string;
  badge?: string;
  subtitle: string;
  amount?: number;
  icon: string;
}

export function TradeInPayoutOption({
  mode,
  isSelected,
  onSelect,
  title,
  badge,
  subtitle,
  icon,
}: TradeInPayoutOptionProps) {
  return (
    <label
      onClick={() => onSelect(mode)}
      className={`payout-card flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
        isSelected
          ? "bg-on-primary/15 border-secondary-fixed/50 shadow-xs"
          : "bg-on-primary/5 hover:bg-on-primary/10 border-transparent"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <input
          type="radio"
          name="payout-type"
          value={mode}
          checked={isSelected}
          onChange={() => onSelect(mode)}
          className="w-4 h-4 text-secondary accent-secondary cursor-pointer"
        />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-label-md text-label-md font-bold text-on-primary truncate">
              {title}
            </span>
            {badge && (
              <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold whitespace-nowrap">
                {badge}
              </span>
            )}
          </div>
          <span className="font-body-sm text-[11px] text-primary-fixed leading-tight mt-0.5">
            {subtitle}
          </span>
        </div>
      </div>
      <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0 ml-2" aria-hidden="true">
        {icon}
      </span>
    </label>
  );
}
