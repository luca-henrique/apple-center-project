import React from "react";

export function StepThreeStatusCard() {
  return (
    <section className="w-full">
      <div className="bg-linear-to-br from-secondary-container/30 via-surface-container-lowest to-surface-container-lowest rounded-xl p-space-md shadow-sm border border-secondary/20 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold mb-space-sm shadow-xs">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            verified_user
          </span>
          <span>Avaliação Concluída • Cotação 100% Confirmada</span>
        </div>

        <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-1">
          Seu iPhone foi aprovado com nota máxima!
        </h2>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Inspeção filmada em bancada estéril realizada pelo Perito Técnico Certificado Carlos Eduardo (CREA-SP 89124).
        </p>

        <div className="mt-space-sm pt-space-xs flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-ping" />
          <span className="font-label-sm text-label-sm text-secondary font-semibold">
            Laudo pericial emitido e registrado no laboratório
          </span>
        </div>
      </div>
    </section>
  );
}
