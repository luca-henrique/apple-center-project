import React from "react";
import type { TradeInOwnerFormValues } from "@/features/trade-in/model/trade-in.schema";

interface StepTwoLegalTermsProps {
  ownerData: TradeInOwnerFormValues;
  setOwnerData: React.Dispatch<React.SetStateAction<TradeInOwnerFormValues>>;
}

export function StepTwoLegalTerms({ ownerData, setOwnerData }: StepTwoLegalTermsProps) {
  return (
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

        <label className="flex items-start gap-space-sm cursor-pointer select-none">
          <input
            type="checkbox"
            checked={ownerData.acceptCleanImei}
            onChange={(e) => setOwnerData((prev) => ({ ...prev, acceptCleanImei: e.target.checked }))}
            className="mt-1 w-4 h-4 rounded text-secondary accent-secondary focus:ring-0 cursor-pointer shrink-0"
          />
          <span className="font-body-sm text-body-sm text-on-surface leading-snug">
            Declaro que o iPhone é de minha posse e propriedade legal, possui <strong>IMEI limpo</strong> e autorizo os testes periciais.
          </span>
        </label>

        <label className="flex items-start gap-space-sm cursor-pointer select-none">
          <input
            type="checkbox"
            checked={ownerData.acceptFindMyDisabled}
            onChange={(e) => setOwnerData((prev) => ({ ...prev, acceptFindMyDisabled: e.target.checked }))}
            className="mt-1 w-4 h-4 rounded text-secondary accent-secondary focus:ring-0 cursor-pointer shrink-0"
          />
          <span className="font-body-sm text-body-sm text-on-surface leading-snug">
            Estou ciente de que devo <strong>desativar o recurso &ldquo;Buscar iPhone&rdquo;</strong> e restaurar aos padrões de fábrica.
          </span>
        </label>
      </div>
    </section>
  );
}
