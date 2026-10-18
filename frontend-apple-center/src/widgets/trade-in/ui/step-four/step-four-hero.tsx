import React from "react";

interface StepFourHeroProps {
  deviceName: string;
  protocolId: string;
}

export function StepFourHero({ deviceName, protocolId }: StepFourHeroProps) {
  return (
    <section className="w-full text-center py-space-sm">
      <div className="relative inline-flex items-center justify-center mb-space-sm">
        <div className="w-20 h-20 rounded-full bg-secondary-container/40 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-on-secondary text-[32px]" aria-hidden="true">
              workspace_premium
            </span>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            bolt
          </span>
        </div>
      </div>

      <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-space-xs font-bold">
        Troca Finalizada com Sucesso!
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
        O valor da avaliação do seu{" "}
        <span className="font-semibold text-on-surface">{deviceName}</span> foi liberado para uso imediato.
      </p>

      <div className="inline-flex items-center gap-space-xs px-3 py-1 mt-space-sm rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
        <span className="material-symbols-outlined text-[14px] text-secondary" aria-hidden="true">
          receipt_long
        </span>
        <span>
          Protocolo: <strong className="text-on-surface font-mono">{protocolId}</strong> •{" "}
          {new Date().toLocaleDateString("pt-BR")}
        </span>
      </div>
    </section>
  );
}
