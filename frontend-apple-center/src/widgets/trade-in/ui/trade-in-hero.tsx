import React from "react";

export function TradeInHero() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-primary-container p-space-md text-on-primary shadow-md border border-outline-variant/10">
      {/* Background glow circle */}
      <div
        className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-space-xs">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-secondary/30 text-secondary-fixed text-[11px] font-label-sm font-bold tracking-wide">
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            eco
          </span>
          CIRCULAR TECH
        </div>

        <h1 className="font-headline-lg-mobile text-headline-lg-mobile leading-tight text-on-primary font-bold">
          Troque seu iPhone usado por um novinho com desconto imediato
        </h1>

        <p className="font-body-md text-body-md text-primary-fixed-dim leading-snug">
          Cotação instantânea com rigor de laboratório Apple. Ganhe bônus exclusivo na troca garantida.
        </p>
      </div>
    </div>
  );
}
