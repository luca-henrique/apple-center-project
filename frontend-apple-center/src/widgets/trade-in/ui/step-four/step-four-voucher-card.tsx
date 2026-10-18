import React from "react";
import { formatCurrency } from "@/shared/lib/format/currency";

interface StepFourVoucherCardProps {
  pixCashoutRequested: boolean;
  calculations: {
    finalCash: number;
    finalCredit: number;
    creditBonus: number;
  };
  couponCode: string;
  isCopied: boolean;
  onCopyCoupon: () => void;
  onSwitchToPix: () => void;
}

export function StepFourVoucherCard({
  pixCashoutRequested,
  calculations,
  couponCode,
  isCopied,
  onCopyCoupon,
  onSwitchToPix,
}: StepFourVoucherCardProps) {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary p-space-md sm:p-space-lg shadow-md border border-secondary/20">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary-container/10 pointer-events-none blur-2xl" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-secondary-container/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center justify-between mb-space-xs flex-wrap gap-2">
            <span className="font-label-md text-label-md uppercase tracking-wider text-primary-fixed font-bold">
              {pixCashoutRequested ? "Resgate Pix em Andamento" : "Crédito Disponível"}
            </span>
            {!pixCashoutRequested && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  add_circle
                </span>
                +R$ {calculations.creditBonus} Bônus Trade-in
              </span>
            )}
          </div>

          <div className="my-space-xs flex items-baseline gap-1">
            <span className="font-display-hero-mobile text-display-hero-mobile font-bold tracking-tight text-white text-3xl sm:text-4xl">
              {formatCurrency(pixCashoutRequested ? calculations.finalCash : calculations.finalCredit)}
            </span>
          </div>

          <p className="font-body-sm text-body-sm text-surface-variant/90 mb-space-md">
            {pixCashoutRequested
              ? "Ordem de pagamento via Pix processada. Depósito em até 2 horas na sua conta cadastrada."
              : "Disponível por 30 dias para qualquer iPhone novo ou Seminovo Certificado."}
          </p>

          {!pixCashoutRequested && (
            <div className="bg-primary/70 backdrop-blur-md rounded-lg p-space-sm flex items-center justify-between gap-space-sm border border-secondary/30">
              <div className="min-w-0 flex-1">
                <span className="block font-label-sm text-label-sm text-surface-variant font-medium">
                  Cupom de Resgate Imediato
                </span>
                <span className="font-headline-sm text-headline-sm text-secondary-fixed tracking-wider font-mono truncate select-all font-bold">
                  {couponCode}
                </span>
              </div>
              <button
                type="button"
                onClick={onCopyCoupon}
                className="px-space-md h-10 rounded bg-secondary-container text-on-secondary-container font-label-md text-label-md flex items-center gap-1 active:scale-95 transition-transform shrink-0 cursor-pointer font-semibold shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  {isCopied ? "check" : "content_copy"}
                </span>
                <span>{isCopied ? "Copiado!" : "Copiar"}</span>
              </button>
            </div>
          )}

          {!pixCashoutRequested && (
            <div className="mt-space-md pt-space-sm flex items-start gap-space-xs bg-surface-container-lowest/10 rounded-lg p-space-sm">
              <span className="material-symbols-outlined text-[18px] text-primary-fixed shrink-0 mt-0.5" aria-hidden="true">
                account_balance_wallet
              </span>
              <p className="font-body-sm text-body-sm text-surface-variant">
                Prefere receber em dinheiro? O valor base de{" "}
                <strong className="text-white">{formatCurrency(calculations.finalCash)}</strong> pode
                ser transferido via Pix se você optar por não resgatar em produtos agora.
                <button
                  type="button"
                  onClick={onSwitchToPix}
                  className="inline text-secondary-fixed font-semibold underline underline-offset-2 ml-1 cursor-pointer"
                >
                  Alternar para Pix
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
