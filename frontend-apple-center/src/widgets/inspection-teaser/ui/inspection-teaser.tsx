import React from "react";

export function InspectionTeaser() {
  const steps = [
    { title: "Bateria Original", desc: "Auditada em bancada com mínimo 90% a 100%" },
    { title: "Câmeras & FaceID", desc: "Foco, teleobjetiva, estabilização e sensores" },
    { title: "Display OLED", desc: "Sem burn-in, touch 100% responsivo e TrueTone ativo" },
    { title: "IMEI & Anatel", desc: "Checagem de procedência e bloqueios iCloud" },
  ];

  return (
    <section id="laudo" className="w-full max-w-7xl mx-auto px-gutter my-space-lg scroll-mt-20">
      <div className="p-space-md sm:p-space-lg rounded-3xl bg-surface-container-low border border-outline-variant/15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-bold mb-2">
            <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
              fact_check
            </span>
            <span>Laudo Laboratorial Apple Center</span>
          </div>
          <h2 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md font-bold text-on-surface">
            Mais de 35 Testes Rigorosos Antes de Chegar Até Você
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
            Cada aparelho recebe um certificado digital individual contendo o laudo técnico completo, número de série e cobertura de 1 ano de garantia total.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:max-w-lg">
          {steps.map((step) => (
            <div
              key={step.title}
              className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/10 flex items-start gap-2.5"
            >
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5" aria-hidden="true">
                check_circle
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  {step.title}
                </span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  {step.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
