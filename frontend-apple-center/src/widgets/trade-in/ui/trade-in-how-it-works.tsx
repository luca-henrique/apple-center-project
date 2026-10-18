import React from "react";

export function TradeInHowItWorks() {
  const steps = [
    {
      num: 1,
      title: "1. Simule online",
      desc: "Responda o formulário em menos de 1 minuto sem compromisso.",
      icon: "devices",
    },
    {
      num: 2,
      title: "2. Envio gratuito com seguro",
      desc: "Poste nos Correios com código pré-pago e rastreio blindado.",
      icon: "local_shipping",
    },
    {
      num: 3,
      title: "3. Avaliação e Pix em até 24h",
      desc: "Laudo técnico aprovado e liberação imediata do dinheiro ou cupom.",
      icon: "paid",
    },
  ];

  return (
    <section aria-label="Como funciona o processo de Trade-in" className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between px-space-xs">
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          Como funciona o processo
        </h2>
        <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5 font-bold">
          100% Seguro
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            lock
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/10"
          >
            <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary font-headline-sm shrink-0">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                {step.icon}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {step.title}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {step.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
