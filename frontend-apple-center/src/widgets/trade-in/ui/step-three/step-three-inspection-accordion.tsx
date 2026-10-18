import React from "react";
import { TECHNICAL_INSPECTION_GROUPS } from "@/features/trade-in/model/trade-in.schema";

interface StepThreeInspectionAccordionProps {
  expandedGroups: Record<string, boolean>;
  onToggleGroup: (id: string) => void;
  onToggleAll: () => void;
}

export function StepThreeInspectionAccordion({
  expandedGroups,
  onToggleGroup,
  onToggleAll,
}: StepThreeInspectionAccordionProps) {
  const allExpanded = Object.values(expandedGroups).every(Boolean);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-space-sm flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Laudo Laboratorial
          </h3>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
            35/35 Aprovados
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleAll}
          className="font-label-sm text-label-sm text-secondary font-semibold hover:underline cursor-pointer"
        >
          {allExpanded ? "Recolher Tudo" : "Expandir Tudo"}
        </button>
      </div>

      <div className="space-y-space-sm">
        {TECHNICAL_INSPECTION_GROUPS.map((group) => {
          const isOpen = !!expandedGroups[group.id];
          return (
            <div
              key={group.id}
              className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15"
            >
              <button
                type="button"
                onClick={() => onToggleGroup(group.id)}
                className="w-full flex items-center justify-between cursor-pointer text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                      {group.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                      {group.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-secondary font-medium">
                      {group.badge}
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="mt-space-md pt-space-xs space-y-2.5 border-t border-outline-variant/15">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between font-body-sm text-body-sm pt-1"
                    >
                      <span className="text-on-surface-variant">{item.name}</span>
                      <span className="flex items-center gap-1 font-semibold text-secondary shrink-0">
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                          {item.icon}
                        </span>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
