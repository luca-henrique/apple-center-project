import React from "react";
import type { PayoutMode } from "@/features/trade-in/model/trade-in.schema";

interface StepTwoPayoutCardItemProps {
  mode: PayoutMode;
  isSelected: boolean;
  onSelect: (mode: PayoutMode) => void;
  title: string;
  badge?: string;
  description: string;
  priceFormatted: string;
  children?: React.ReactNode;
}

export function StepTwoPayoutCardItem({
  mode,
  isSelected,
  onSelect,
  title,
  badge,
  description,
  priceFormatted,
  children,
}: StepTwoPayoutCardItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(mode)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(mode)}
      className={`cursor-pointer mb-space-sm p-space-md rounded-xl transition-all border ${
        isSelected
          ? "bg-secondary-container/15 border-secondary shadow-sm"
          : "bg-surface-container-low border-transparent opacity-75 hover:opacity-100"
      }`}
    >
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex items-start gap-space-sm">
          <div
            className={`w-5 h-5 mt-0.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isSelected ? "bg-secondary text-on-secondary" : "border-2 border-outline-variant bg-surface"
            }`}
          >
            {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                {title}
              </span>
              {badge && (
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  {badge}
                </span>
              )}
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              {description}
            </p>
          </div>
        </div>
        <span
          className={`font-label-lg text-label-lg font-bold whitespace-nowrap ${
            mode === "credit" ? "text-secondary" : "text-on-surface"
          }`}
        >
          {priceFormatted}
        </span>
      </div>

      {children}
    </div>
  );
}
