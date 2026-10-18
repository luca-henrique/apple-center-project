"use client";

import React from "react";

export interface ProtectionAddonCardProps {
  isActive: boolean;
  onToggle: () => void;
}

export function ProtectionAddonCard({
  isActive,
  onToggle,
}: ProtectionAddonCardProps) {
  return (
    <section
      aria-label="Proteção Apple Center Opcional"
      className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden border border-outline-variant/10 transition-all"
    >
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex gap-space-sm items-start">
          <div className="w-10 h-10 rounded-lg bg-secondary-container/40 text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              health_and_safety
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-headline-sm text-label-md text-on-surface font-semibold">
                Proteção Apple Center
              </span>
              <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">
                Recomendado
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Cobre quebra acidental, tela, bateria e danos líquidos por 1 ano completo.
            </p>

            <p className="font-label-md text-label-md text-secondary mt-1 font-semibold">
              + R$ 29,00
              <span className="text-on-surface-variant font-normal text-body-sm">
                /mês ou R$ 319 à vista
              </span>
            </p>
          </div>
        </div>

        {/* Accessible Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={isActive}
          aria-label="Ativar ou desativar Proteção Apple Center"
          onClick={onToggle}
          className="min-w-12 min-h-11 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-full cursor-pointer -mr-1"
        >
          <span
            className={`w-11 h-6 rounded-full transition-colors relative block ${
              isActive ? "bg-secondary" : "bg-surface-container-highest"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 bg-on-primary rounded-full h-5 w-5 transition-transform shadow-sm ${
                isActive ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Trust bullets within addon */}
      <div className="mt-space-sm pt-space-xs grid grid-cols-2 gap-2 bg-surface-container-low/60 rounded-lg p-2.5">
        <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-[11px]">
          <span className="material-symbols-outlined text-secondary text-[14px]" aria-hidden="true">
            check_circle
          </span>
          Peças 100% Originais
        </div>
        <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-[11px]">
          <span className="material-symbols-outlined text-secondary text-[14px]" aria-hidden="true">
            check_circle
          </span>
          Substituição Expressa
        </div>
      </div>
    </section>
  );
}
