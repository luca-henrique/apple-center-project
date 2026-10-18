"use client";

import React, { useState } from "react";
import type { InspectionItem } from "@/entities/product/model/types";

export interface InspectionAccordionProps {
  inspections?: InspectionItem[];
}

export function InspectionAccordion({ inspections }: InspectionAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!inspections || inspections.length === 0) return null;

  return (
    <section className="rounded-3xl bg-surface-container-low border border-outline-variant/15 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full min-h-13 p-space-md sm:p-space-lg flex items-center justify-between text-left select-none cursor-pointer hover:bg-surface-container transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              fact_check
            </span>
          </div>
          <div>
            <h3 className="font-title-md text-title-md font-semibold text-on-surface">
              Laudo Técnico de Inspeção (+35 Itens)
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Auditoria individual realizada em laboratório especializado
            </p>
          </div>
        </div>

        <span
          className={`material-symbols-outlined text-[24px] text-on-surface-variant transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="p-space-md sm:p-space-lg pt-0 flex flex-col gap-2.5 border-t border-outline-variant/10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
            {inspections.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px]" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-medium">
                    {item.title}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-secondary-container text-on-secondary-container">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/10 flex items-start gap-2.5 mt-1">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0" aria-hidden="true">
              verified_user
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              O laudo impresso e autenticado acompanha a nota fiscal oficial e o certificado de garantia de 1 ano no interior da embalagem lacrada.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
