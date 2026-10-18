import React from "react";

export function TradeInGuaranteeBanner() {
  return (
    <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center gap-3 border border-outline-variant/10">
      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          verified
        </span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
        Se o estado real for divergente do simulado, nós devolvemos seu iPhone de graça, sem custos adicionais.
      </p>
    </div>
  );
}
