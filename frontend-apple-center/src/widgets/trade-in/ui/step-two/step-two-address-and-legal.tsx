import React, { useState } from "react";
import type { TradeInOwnerFormValues } from "@/features/trade-in/model/trade-in.schema";
import { StepTwoLegalTerms } from "./step-two-legal-terms";
import { StepTwoBottomCta } from "./step-two-bottom-cta";

interface StepTwoAddressAndLegalProps {
  ownerData: TradeInOwnerFormValues;
  setOwnerData: React.Dispatch<React.SetStateAction<TradeInOwnerFormValues>>;
  isSubmitting: boolean;
  onConfirmShipping: () => void;
}

export function StepTwoAddressAndLegal({
  ownerData,
  setOwnerData,
  isSubmitting,
  onConfirmShipping,
}: StepTwoAddressAndLegalProps) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  return (
    <>
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  local_shipping
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
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
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {ownerData.streetAddress}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {ownerData.neighborhood}, {ownerData.city} - {ownerData.state}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                  CEP: {ownerData.zipCode}
                </span>
              </div>
            </div>

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

      <StepTwoLegalTerms ownerData={ownerData} setOwnerData={setOwnerData} />

      <StepTwoBottomCta
        isSubmitting={isSubmitting}
        isDisabled={!ownerData.acceptCleanImei || !ownerData.acceptFindMyDisabled}
        onConfirmShipping={onConfirmShipping}
      />
    </>
  );
}
