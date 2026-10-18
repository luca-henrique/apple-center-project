import React from "react";
import type { TradeInOwnerFormValues } from "@/features/trade-in/model/trade-in.schema";

interface StepTwoOwnerCardProps {
  ownerData: TradeInOwnerFormValues;
}

export function StepTwoOwnerCard({ ownerData }: StepTwoOwnerCardProps) {
  return (
    <section className="w-full">
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                badge
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Dados do Proprietário
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
            Para Laudo Legal
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Nome Completo</span>
              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                {ownerData.fullName}
              </span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
              verified_user
            </span>
          </div>

          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">CPF (Receita Federal)</span>
              <span className="font-label-md text-label-md text-on-surface font-mono">***.482.918-**</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]" aria-hidden="true">
              lock
            </span>
          </div>

          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">WhatsApp</span>
              <span className="font-label-md text-label-md text-on-surface font-mono">{ownerData.whatsapp}</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
              chat
            </span>
          </div>

          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">E-mail</span>
              <span className="font-label-md text-label-md text-on-surface truncate">{ownerData.email}</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]" aria-hidden="true">
              mark_email_read
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
