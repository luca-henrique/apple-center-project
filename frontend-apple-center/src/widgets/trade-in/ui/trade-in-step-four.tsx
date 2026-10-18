"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  type TradeInModel,
  type PayoutMode,
  TRADE_IN_UPGRADE_SUGGESTIONS,
} from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

interface TradeInStepFourProps {
  selectedModel: TradeInModel;
  payoutMode: PayoutMode;
  calculations: {
    finalCash: number;
    finalCredit: number;
    currentValuation: number;
    creditBonus: number;
  };
  couponCode: string;
  protocolId: string;
  isCopied: boolean;
  onCopyCoupon: () => void;
  onApplyCreditAndBuy: (slug: string) => void;
  onSelectPayoutMode: (mode: PayoutMode) => void;
}

export function TradeInStepFour({
  selectedModel,
  payoutMode,
  calculations,
  couponCode,
  protocolId,
  isCopied,
  onCopyCoupon,
  onApplyCreditAndBuy,
  onSelectPayoutMode,
}: TradeInStepFourProps) {
  const [pixCashoutRequested, setPixCashoutRequested] = useState<boolean>(false);

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

  const handleSwitchToPix = () => {
    onSelectPayoutMode("pix");
    setPixCashoutRequested(true);
    toast.success("Alternado para Resgate via Pix!", {
      description: `O valor de ${formatCurrency(calculations.finalCash)} será creditado na sua chave cadastrada.`,
    });
  };

  return (
    <div className="flex flex-col gap-space-md w-full">
      {/* 1. Hero de Celebração & Sucesso */}
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
          <span className="font-semibold text-on-surface">{selectedModel.name}</span> foi liberado
          para uso imediato.
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

      {/* 2. Card Destaque Vale-Crédito Ativo */}
      <section className="w-full">
        <div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary p-space-md sm:p-space-lg shadow-md border border-secondary/20">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary-container/10 pointer-events-none blur-2xl" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary-container/20 to-transparent pointer-events-none" />

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
                {formatCurrency(
                  pixCashoutRequested ? calculations.finalCash : calculations.finalCredit
                )}
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-surface-variant/90 mb-space-md">
              {pixCashoutRequested
                ? "Ordem de pagamento via Pix processada. Depósito em até 2 horas na sua conta cadastrada."
                : "Disponível por 30 dias para qualquer iPhone novo ou Seminovo Certificado."}
            </p>

            {/* Bloco Cupom com Copiar */}
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

            {/* Opção Alternativa de PIX */}
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
                    onClick={handleSwitchToPix}
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

      {/* 3. Sugestões de Upgrade Inteligente */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px]" aria-hidden="true">
              recommend
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Sugestões com seu crédito aplicado
            </h3>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          Economia imediata calculada com seu saldo de {formatCurrency(calculations.finalCredit)}:
        </p>

        <div className="flex flex-col gap-space-md">
          {TRADE_IN_UPGRADE_SUGGESTIONS.map((item) => {
            const finalDiscountedPrice = Math.max(0, item.originalPrice - calculations.finalCredit);

            return (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15"
              >
                <div className="flex gap-space-md">
                  <div className="w-24 h-24 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-[11px] font-bold">
                        {item.tag}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                      {item.name}
                    </h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">
                      {item.colorName}
                    </span>

                    <div className="mt-2">
                      <span className="font-body-sm text-body-sm text-on-surface-variant line-through block">
                        De {formatCurrency(item.originalPrice)}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-label-sm text-label-sm text-secondary font-bold">
                          Por
                        </span>
                        <span className="font-headline-md text-headline-md font-bold text-secondary">
                          {formatCurrency(finalDiscountedPrice)}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant block">
                        {item.installmentText}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyCreditAndBuy(item.productSlug)}
                  className="w-full mt-space-md h-12 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm cursor-pointer hover:bg-primary/95"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    shopping_cart_checkout
                  </span>
                  <span>Aplicar Crédito e Comprar</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Conformidade Jurídica & Recibo de Quitação */}
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

      {/* 5. Botões de Ação Inferiores */}
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
    </div>
  );
}
