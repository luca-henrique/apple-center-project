import React from "react";
import Link from "next/link";
import { toast } from "sonner";

export function StepFourConciergeActions() {
  const handleDownloadReceipt = () => {
    toast.success("Download do Recibo de Quitação", {
      description: "Arquivo Recibo-TradeIn-89420.pdf transferido com sucesso.",
    });
  };

  const handleConcierge = () => {
    toast.info("Concierge Apple Center", {
      description: "Abrindo canal VIP de atendimento no WhatsApp para acompanhamento do pedido.",
    });
  };

  return (
    <>
      {/* Conformidade Jurídica & Recibo de Quitação */}
      <section className="w-full">
        <div className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/15">
          <div className="flex items-start gap-space-sm mb-space-sm">
            <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                verified_user
              </span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Termo de Quitação & Transferência
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Dispositivo inspecionado e baixado do iCloud com sucesso. A titularidade foi repassada para Apple Center e o crédito outorgado sem ônus residual.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-lg p-space-sm flex items-center justify-between shadow-xs border border-outline-variant/15">
            <div className="flex items-center gap-space-xs min-w-0">
              <span className="material-symbols-outlined text-secondary text-[22px] shrink-0" aria-hidden="true">
                picture_as_pdf
              </span>
              <div className="min-w-0">
                <span className="font-label-md text-label-md text-on-surface truncate block font-semibold">
                  Recibo-TradeIn-89420.pdf
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant block">
                  Assinado digitalmente • 142 KB
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="h-9 px-3 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 active:scale-95 transition-transform hover:bg-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                download
              </span>
              <span>Baixar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Botões de Ação Inferiores */}
      <section className="w-full flex flex-col gap-space-sm pt-space-xs pb-space-lg">
        <Link
          href="/#produtos"
          className="w-full h-14 rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            storefront
          </span>
          <span>Usar Crédito no Catálogo</span>
        </Link>

        <div className="flex items-center gap-space-sm pt-space-xs">
          <Link
            href="/"
            className="flex-1 h-11 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-transform border border-outline-variant/15 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              home
            </span>
            <span>Voltar ao Início</span>
          </Link>
          <button
            type="button"
            onClick={handleConcierge}
            className="flex-1 h-11 rounded-lg bg-surface-container-lowest text-secondary font-label-md text-label-md flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-transform border border-outline-variant/15 font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              support_agent
            </span>
            <span>Suporte Concierge</span>
          </button>
        </div>
      </section>
    </>
  );
}
