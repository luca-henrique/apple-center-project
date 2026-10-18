import React from "react";
import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-gutter my-space-sm" aria-label="Destaque promocional">
      <div className="relative overflow-hidden rounded-3xl bg-primary text-on-primary p-space-lg sm:p-space-xl flex flex-col justify-between min-h-55 sm:min-h-60 shadow-sm">
        {/* Glow & Decorator */}
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-xl flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-bold w-fit shadow-xs">
            <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
              bolt
            </span>
            <span>Semana do iPhone Seminovo</span>
          </div>

          <h2 className="font-headline-md sm:font-headline-lg text-headline-md sm:text-headline-lg font-bold tracking-tight text-white leading-tight mt-1">
            Garantia de 1 Ano em Toda a Linha Apple
          </h2>

          <p className="font-body-md text-body-md text-white/80 leading-snug">
            Todos os aparelhos passam por auditoria de bateria com mínimo de 90% a 100% de saúde e laudo laboratorial com +35 itens testados.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 pt-3 flex-wrap">
          <Link
            href="#produtos"
            className="min-h-11 px-5 py-2.5 rounded-full font-label-md text-label-md font-semibold bg-white text-primary hover:bg-surface-container-high transition-transform active:scale-95 shadow-sm inline-flex items-center gap-1.5"
          >
            <span>Ver Ofertas Disponíveis</span>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              arrow_downward
            </span>
          </Link>
          <span className="font-label-sm text-label-sm text-white/70">
            Envio imediato com seguro total
          </span>
        </div>
      </div>
    </section>
  );
}
