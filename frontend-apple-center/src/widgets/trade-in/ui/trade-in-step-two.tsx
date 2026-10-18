"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  type TradeInModel,
  type CosmeticCondition,
  type BatteryCondition,
  type PayoutMode,
  type PixKeyType,
  type TradeInOwnerFormValues,
  CONDITION_MULTIPLIERS,
} from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

interface TradeInStepTwoProps {
  selectedModel: TradeInModel;
  condition: CosmeticCondition;
  battery: BatteryCondition;
  payoutMode: PayoutMode;
  calculations: {
    finalCash: number;
    finalCredit: number;
    currentValuation: number;
    creditBonus: number;
  };
  ownerData: TradeInOwnerFormValues;
  setOwnerData: React.Dispatch<React.SetStateAction<TradeInOwnerFormValues>>;
  pixKeyType: PixKeyType;
  setPixKeyType: (type: PixKeyType) => void;
  pixKey: string;
  setPixKey: (key: string) => void;
  onSelectPayoutMode: (mode: PayoutMode) => void;
  isSubmitting: boolean;
  onConfirmShipping: () => void;
}

export function TradeInStepTwo({
  selectedModel,
  condition,
  battery,
  payoutMode,
  calculations,
  ownerData,
  setOwnerData,
  pixKeyType,
  setPixKeyType,
  pixKey,
  setPixKey,
  onSelectPayoutMode,
  isSubmitting,
  onConfirmShipping,
}: TradeInStepTwoProps) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const pixKeyTypeLabels: { type: PixKeyType; label: string }[] = [
    { type: "phone", label: "Celular" },
    { type: "cpf", label: "CPF" },
    { type: "email", label: "E-mail" },
    { type: "random", label: "Aleatória" },
  ];

  return (
    <div className="flex flex-col gap-space-md w-full">
      {/* 1. Resumo Compacto da Cotação */}
      <section className="w-full">
        <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-md relative overflow-hidden">
          {/* Subtle gradient glow */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-secondary opacity-15 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between pb-space-xs flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-label-sm font-label-sm text-primary-fixed">
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                lock_clock
              </span>
              Cotação Garantida por 7 dias
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                shield
              </span>
              Seguro R$ 0,00
            </span>
          </div>

          <div className="flex items-center gap-space-md pt-space-xs">
            <div className="relative w-16 h-20 rounded-lg bg-surface-container-lowest/10 p-1 shrink-0 flex items-center justify-center overflow-hidden">
              <Image
                src={selectedModel.imageUrl}
                alt={selectedModel.imageAlt}
                width={64}
                height={80}
                className="w-full h-full object-contain rounded"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-label-lg text-label-lg text-on-primary truncate">
                  {selectedModel.name}
                </h2>
                <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest/20 font-label-sm text-label-sm text-on-primary">
                  Verde Alpino
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-on-primary-container font-body-sm text-body-sm">
                <span className="inline-flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px] text-secondary-fixed" aria-hidden="true">
                    battery_charging_full
                  </span>
                  {battery === "above85" ? "87%" : "79%"}
                </span>
                <span>•</span>
                <span className="text-secondary-fixed">
                  Grau {CONDITION_MULTIPLIERS[condition].label.split(" ")[0]}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                <span className="font-headline-md text-headline-md text-secondary-fixed tracking-tight font-bold">
                  {formatCurrency(calculations.currentValuation)}
                </span>
                <span className="font-body-sm text-body-sm text-on-primary-container">
                  {payoutMode === "credit"
                    ? `(com Bônus R$ ${calculations.creditBonus})`
                    : "(Transferência Pix)"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Destino do Valor Avaliado */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex items-center gap-2 mb-space-sm">
            <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                payments
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Destino do Valor Avaliado
            </h3>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            Selecione como deseja resgatar o valor do seu aparelho após a validação no laboratório:
          </p>

          {/* Opção A: Crédito na Loja + Bônus */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectPayoutMode("credit")}
            onKeyDown={(e) => e.key === "Enter" && onSelectPayoutMode("credit")}
            className={`cursor-pointer mb-space-sm p-space-md rounded-xl transition-all border ${
              payoutMode === "credit"
                ? "bg-secondary-container/15 border-secondary shadow-sm"
                : "bg-surface-container-low border-transparent opacity-75 hover:opacity-100"
            }`}
          >
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-start gap-space-sm">
                <div
                  className={`w-5 h-5 mt-0.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    payoutMode === "credit"
                      ? "bg-secondary text-on-secondary"
                      : "border-2 border-outline-variant bg-surface"
                  }`}
                >
                  {payoutMode === "credit" && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Crédito p/ Novo iPhone
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                      +R$ {calculations.creditBonus} Bônus
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Cupom liberado imediatamente no laudo para abater na compra de qualquer iPhone lacrado ou seminovo certificado.
                  </p>
                </div>
              </div>
              <span className="font-label-lg text-label-lg text-secondary font-bold whitespace-nowrap">
                {formatCurrency(calculations.finalCredit)}
              </span>
            </div>
            <div className="mt-space-sm pt-space-xs flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-lowest p-2 rounded-lg">
              <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
                redeem
              </span>
              <span>Bônus especial de fidelidade circular incluso na cotação.</span>
            </div>
          </div>

          {/* Opção B: Pix Direto em Conta */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectPayoutMode("pix")}
            onKeyDown={(e) => e.key === "Enter" && onSelectPayoutMode("pix")}
            className={`cursor-pointer p-space-md rounded-xl transition-all border ${
              payoutMode === "pix"
                ? "bg-secondary-container/15 border-secondary shadow-sm"
                : "bg-surface-container-low border-transparent opacity-75 hover:opacity-100"
            }`}
          >
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-start gap-space-sm">
                <div
                  className={`w-5 h-5 mt-0.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    payoutMode === "pix"
                      ? "bg-secondary text-on-secondary"
                      : "border-2 border-outline-variant bg-surface"
                  }`}
                >
                  {payoutMode === "pix" && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Transferência Pix em Conta
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Depósito direto em até 2 horas úteis após a conferência e aprovação dos laudos periciais.
                  </p>
                </div>
              </div>
              <span className="font-label-lg text-label-lg text-on-surface font-bold whitespace-nowrap">
                {formatCurrency(calculations.finalCash)}
              </span>
            </div>

            {/* Campos Expansíveis PIX */}
            {payoutMode === "pix" && (
              <div className="mt-space-md pt-space-sm flex flex-col gap-space-sm border-t border-outline-variant/15">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    Tipo de Chave Pix
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {pixKeyTypeLabels.map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPixKeyType(item.type);
                        }}
                        className={`py-1.5 px-2 rounded-lg font-label-sm text-label-sm text-center transition-colors ${
                          pixKeyType === item.type
                            ? "bg-primary text-on-primary font-bold shadow-xs"
                            : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    Chave Pix Cadastrada
                  </label>
                  <div className="flex items-center px-space-md h-12 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-outline-variant/30">
                    <span className="material-symbols-outlined text-secondary text-[20px] mr-2" aria-hidden="true">
                      contactless
                    </span>
                    <input
                      type="text"
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      className="flex-1 font-mono bg-transparent outline-none text-on-surface"
                      placeholder="Digite sua chave Pix"
                    />
                    <span className="text-secondary font-label-sm text-label-sm flex items-center gap-0.5 shrink-0 ml-2">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Validado
                    </span>
                  </div>
                </div>

                <div className="p-space-xs px-2.5 rounded-lg bg-surface-container text-on-surface-variant text-body-sm font-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">
                    account_balance
                  </span>
                  <span className="truncate">
                    Titular: {ownerData.fullName} • CPF: ***.482.918-**
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Dados Pessoais do Proprietário */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  badge
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Dados do Proprietário
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
              Para Laudo Legal
            </span>
          </div>

          <div className="flex flex-col gap-space-xs">
            {/* Nome Completo */}
            <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Nome Completo
                </span>
                <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                  {ownerData.fullName}
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
                verified_user
              </span>
            </div>

            {/* CPF */}
            <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  CPF (Receita Federal)
                </span>
                <span className="font-label-md text-label-md text-on-surface font-mono">
                  ***.482.918-**
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]" aria-hidden="true">
                lock
              </span>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  WhatsApp (Avisos de Inspeção)
                </span>
                <span className="font-label-md text-label-md text-on-surface font-mono">
                  {ownerData.whatsapp}
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
                chat
              </span>
            </div>

            {/* E-mail */}
            <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  E-mail (Laudo & Etiqueta PDF)
                </span>
                <span className="font-label-md text-label-md text-on-surface truncate">
                  {ownerData.email}
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
                mark_email_read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Endereço do Remetente */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  local_shipping
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Endereço de Coleta / Postagem
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer"
            >
              {isEditingAddress ? "Concluído" : "Alterar"}
            </button>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
            <div className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5" aria-hidden="true">
                home_pin
              </span>
              <div className="flex flex-col min-w-0">
                {isEditingAddress ? (
                  <div className="flex flex-col gap-2 mt-1">
                    <input
                      type="text"
                      value={ownerData.streetAddress}
                      onChange={(e) =>
                        setOwnerData((prev) => ({ ...prev, streetAddress: e.target.value }))
                      }
                      className="text-body-sm p-1.5 rounded bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
                      placeholder="Endereço e número"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ownerData.city}
                        onChange={(e) =>
                          setOwnerData((prev) => ({ ...prev, city: e.target.value }))
                        }
                        className="text-body-sm p-1.5 rounded bg-surface-container-lowest border border-outline-variant/30 text-on-surface flex-1"
                        placeholder="Cidade"
                      />
                      <input
                        type="text"
                        value={ownerData.zipCode}
                        onChange={(e) =>
                          setOwnerData((prev) => ({ ...prev, zipCode: e.target.value }))
                        }
                        className="text-body-sm p-1.5 rounded bg-surface-container-lowest border border-outline-variant/30 text-on-surface w-28"
                        placeholder="CEP"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      {ownerData.streetAddress}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {ownerData.neighborhood}, {ownerData.city} - {ownerData.state}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                      CEP: {ownerData.zipCode}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Agência Correios Recomendada */}
            <div className="mt-space-xs pt-space-xs flex items-center gap-2 bg-surface-container-lowest p-space-sm rounded-lg">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0" aria-hidden="true">
                storefront
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Agência Correios Recomendada:
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Ag. Brigadeiro Luís Antônio (a 350m do seu endereço)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Termo de Autorização e Procedência Legal */}
      <section className="w-full mb-space-lg">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15 flex flex-col gap-space-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
              gavel
            </span>
            <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
              Termo de Conformidade e Procedência
            </h4>
          </div>

          {/* Checkbox 1 */}
          <label className="flex items-start gap-space-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={ownerData.acceptCleanImei}
              onChange={(e) =>
                setOwnerData((prev) => ({ ...prev, acceptCleanImei: e.target.checked }))
              }
              className="mt-1 w-4 h-4 rounded text-secondary accent-secondary focus:ring-0 cursor-pointer shrink-0"
            />
            <span className="font-body-sm text-body-sm text-on-surface leading-snug">
              Declaro que o iPhone é de minha posse e propriedade legal, possui{" "}
              <strong>IMEI limpo</strong> (sem bloqueio de furto/perda) e autorizo os testes de
              desmontagem e bancada pericial técnica.
            </span>
          </label>

          {/* Checkbox 2 */}
          <label className="flex items-start gap-space-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={ownerData.acceptFindMyDisabled}
              onChange={(e) =>
                setOwnerData((prev) => ({ ...prev, acceptFindMyDisabled: e.target.checked }))
              }
              className="mt-1 w-4 h-4 rounded text-secondary accent-secondary focus:ring-0 cursor-pointer shrink-0"
            />
            <span className="font-body-sm text-body-sm text-on-surface leading-snug">
              Estou ciente de que devo{" "}
              <strong>desativar o recurso &ldquo;Buscar iPhone&rdquo;</strong> (Find My) e
              restaurar aos padrões de fábrica antes de postar nos Correios.
            </span>
          </label>
        </div>
      </section>

      {/* 6. Sticky Bottom CTA Area */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl p-space-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe border-t border-outline-variant/15">
        <div className="max-w-md mx-auto flex flex-col gap-1.5 items-center">
          <button
            type="button"
            disabled={isSubmitting || !ownerData.acceptCleanImei || !ownerData.acceptFindMyDisabled}
            onClick={onConfirmShipping}
            className="w-full h-13 py-3.5 px-space-md rounded-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                <span>Gerando Etiqueta e Laudo...</span>
              </>
            ) : (
              <>
                <span>Gerar Etiqueta de Envio Grátis</span>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  local_shipping
                </span>
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[14px] text-secondary" aria-hidden="true">
              verified
            </span>
            <span>Frete Sedex Reverso Grátis • Seguro Porto Seguro Coberto</span>
          </div>
        </div>
      </div>
    </div>
  );
}
