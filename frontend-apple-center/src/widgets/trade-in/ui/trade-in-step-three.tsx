"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  type TradeInModel,
  type PayoutMode,
  TECHNICAL_INSPECTION_GROUPS,
} from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

interface TradeInStepThreeProps {
  selectedModel: TradeInModel;
  payoutMode: PayoutMode;
  calculations: {
    finalCash: number;
    finalCredit: number;
    currentValuation: number;
    creditBonus: number;
  };
  isSubmitting: boolean;
  onAcceptReport: () => void;
}

export function TradeInStepThree({
  selectedModel,
  payoutMode,
  calculations,
  isSubmitting,
  onAcceptReport,
}: TradeInStepThreeProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "biometrics-display": true,
    "cameras-sensors": true,
    "logic-board": false,
    "security-compliance": false,
  });

  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const allExpanded = Object.values(expandedGroups).every(Boolean);
    const updated: Record<string, boolean> = {};
    TECHNICAL_INSPECTION_GROUPS.forEach((g) => {
      updated[g.id] = !allExpanded;
    });
    setExpandedGroups(updated);
  };

  const handleDownloadPdf = () => {
    toast.success("Download do Laudo Técnico Iniciado", {
      description: "Arquivo Laudo-Pericial-TRD89420.pdf assinado com certificado ICP-Brasil.",
    });
  };

  return (
    <div className="flex flex-col gap-space-md w-full">
      {/* 1. Status Highlight Card */}
      <section className="w-full">
        <div className="bg-gradient-to-br from-secondary-container/30 via-surface-container-lowest to-surface-container-lowest rounded-xl p-space-md shadow-sm border border-secondary/20 relative overflow-hidden">
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

      {/* 2. Device Summary & Approved Valuation Card */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex gap-space-md items-start">
            <div className="w-24 h-24 rounded-lg bg-surface-container-low p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
              <Image
                src={selectedModel.imageUrl}
                alt={selectedModel.imageAlt}
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1 mb-1 flex-wrap">
                <h3 className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                  {selectedModel.name}
                </h3>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-[11px] font-bold">
                  Verde Sierra
                </span>
              </div>

              <div className="space-y-1 mb-space-xs">
                <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
                    check_circle
                  </span>
                  <span>
                    Grau Estético: <strong className="text-on-surface font-semibold">Excelente A+</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
                    battery_charging_full
                  </span>
                  <span>
                    Saúde Bateria: <strong className="text-secondary font-semibold">88%</strong>{" "}
                    <span className="text-[10px] text-secondary font-bold">(+1% acima do pré-laudo)</span>
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-[10px] font-semibold">
                <span className="material-symbols-outlined text-[12px] text-secondary" aria-hidden="true">
                  verified
                </span>
                <span>Sem divergências de valor</span>
              </div>
            </div>
          </div>

          {/* Financial Split Cards */}
          <div className="mt-space-md grid grid-cols-1 gap-space-sm">
            {/* Option 1: Credit */}
            <div className="p-space-sm rounded-lg bg-primary-container text-on-primary shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] uppercase font-bold tracking-wider mb-1">
                    Recomendado • Trade-in Up
                  </span>
                  <p className="font-body-sm text-body-sm text-on-primary-container">
                    Crédito para Novo iPhone na loja
                  </p>
                  <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                    <span className="font-headline-md text-headline-md font-bold text-on-primary">
                      {formatCurrency(calculations.finalCredit)}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold">
                      + R$ {calculations.creditBonus} bônus
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-lowest/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary-container text-[20px]" aria-hidden="true">
                    phone_iphone
                  </span>
                </div>
              </div>
            </div>

            {/* Option 2: Pix */}
            <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/15">
              <div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Ou resgate em dinheiro via Pix à vista
                </p>
                <p className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {formatCurrency(calculations.finalCash)}
                </p>
              </div>
              <span className="material-symbols-outlined text-outline text-[22px]" aria-hidden="true">
                qr_code_2
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Technical Inspection 35-Point Checklist */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-space-sm flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Laudo Laboratorial
            </h3>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
              35/35 Aprovados
            </span>
          </div>
          <button
            type="button"
            onClick={toggleAll}
            className="font-label-sm text-label-sm text-secondary font-semibold hover:underline cursor-pointer"
          >
            {Object.values(expandedGroups).every(Boolean) ? "Recolher Tudo" : "Expandir Tudo"}
          </button>
        </div>

        <div className="space-y-space-sm">
          {TECHNICAL_INSPECTION_GROUPS.map((group) => {
            const isOpen = !!expandedGroups[group.id];
            return (
              <div
                key={group.id}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15"
              >
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between cursor-pointer text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                        {group.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                        {group.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-secondary font-medium">
                        {group.badge}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-space-md pt-space-xs space-y-2.5 border-t border-outline-variant/15">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between font-body-sm text-body-sm pt-1"
                      >
                        <span className="text-on-surface-variant">{item.name}</span>
                        <span className="flex items-center gap-1 font-semibold text-secondary shrink-0">
                          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                            {item.icon}
                          </span>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Video Inspection Player Preview Card */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              Gravação da Perícia em Bancada
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant font-mono">
              03:42 • 1080p 60fps
            </span>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsPlayingVideo(true)}
            onKeyDown={(e) => e.key === "Enter" && setIsPlayingVideo(true)}
            className="relative w-full h-44 rounded-lg overflow-hidden bg-surface-container-high group cursor-pointer mt-1"
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwxjJgaUpmflEyAyZsiYrH4AKGQ8K7ObZHVBc_xoJaopsJpMVmcaX41ILUxFgUqwKf1jVzxs0n4ITdOCSoYazcD9XDqNWk3OY0hrUamX6f_10YcMMJkm0FajR5hbucFEK9o34u4_cEydL5F5oQvJogyScwAkmg-IMLQoONBgZPVpLnPuRIdsPP5XSwZiFJD-_F7-GuK4EwUMZFqtpR4cMT6Qr2BasHfjgkCMHEUsSvsgJIpL-RFdEokw"
              alt="Bancada laboratorial estéril com perito Apple inspecionando iPhone"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-primary/40 flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px] ml-1" aria-hidden="true">
                  play_arrow
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-primary bg-primary/70 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                Assistir Vistoria Filmada
              </span>
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-label-sm text-[10px]">
              Rec: CAM-SP-04 • Bancada Estéril 02
            </div>
          </div>

          {isPlayingVideo && (
            <div className="mt-3 p-3 rounded-lg bg-secondary-container/20 border border-secondary/30 flex items-center justify-between text-body-sm text-secondary">
              <span className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                Streaming de alta resolução autenticado via SHA256 em execução.
              </span>
              <button
                type="button"
                onClick={() => setIsPlayingVideo(false)}
                className="font-label-sm underline font-bold"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Authenticity Seal & Hash Certificate Card */}
      <section className="w-full mb-space-lg">
        <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex items-start gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary-container text-[22px]" aria-hidden="true">
                workspace_premium
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-label-lg text-label-lg text-primary font-bold">
                Laboratório Apple Center São Paulo
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Certificação de Conformidade Hardware Apple v4.2
              </p>
              <div className="mt-space-xs p-2 rounded bg-surface-container-lowest font-mono text-[10px] text-outline break-all border border-outline-variant/20">
                SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
              </div>
              <div className="mt-space-sm flex items-center justify-between flex-wrap gap-2">
                <span className="font-label-sm text-[11px] text-secondary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    lock
                  </span>
                  Assinatura ICP-Brasil
                </span>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    picture_as_pdf
                  </span>
                  <span>Baixar Laudo (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sticky Bottom CTA Area */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl p-gutter pb-safe shadow-[0_-4px_16px_rgba(15,23,42,0.06)] border-t border-outline-variant/15">
        <div className="max-w-md mx-auto flex flex-col gap-space-xs">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onAcceptReport}
            className="w-full h-12 bg-secondary text-on-secondary rounded-lg font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-md cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                <span>Processando Resgate...</span>
              </>
            ) : (
              <>
                <span>Aceitar Laudo e Liberar {formatCurrency(calculations.currentValuation)}</span>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  arrow_forward
                </span>
              </>
            )}
          </button>
          <p className="text-center font-body-sm text-[11px] text-on-surface-variant">
            Ao confirmar, seu cupom ou depósito será gerado em instantes com garantia Apple Center.
          </p>
        </div>
      </div>
    </div>
  );
}
