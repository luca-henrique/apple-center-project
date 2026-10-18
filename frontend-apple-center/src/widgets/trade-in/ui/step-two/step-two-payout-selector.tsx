import React from "react";
import type { PayoutMode, PixKeyType } from "@/features/trade-in/model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";
import { StepTwoPixFields } from "./step-two-pix-fields";
import { StepTwoPayoutCardItem } from "./step-two-payout-card-item";

interface StepTwoPayoutSelectorProps {
  payoutMode: PayoutMode;
  calculations: {
    finalCash: number;
    finalCredit: number;
    creditBonus: number;
  };
  pixKeyType: PixKeyType;
  setPixKeyType: (type: PixKeyType) => void;
  pixKey: string;
  setPixKey: (key: string) => void;
  onSelectPayoutMode: (mode: PayoutMode) => void;
  ownerName: string;
}

export function StepTwoPayoutSelector({
  payoutMode,
  calculations,
  pixKeyType,
  setPixKeyType,
  pixKey,
  setPixKey,
  onSelectPayoutMode,
}: StepTwoPayoutSelectorProps) {
  return (
    <section className="w-full">
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm font-semibold">
          Destino do Pagamento
        </h3>

        <StepTwoPayoutCardItem
          mode="credit"
          isSelected={payoutMode === "credit"}
          onSelect={onSelectPayoutMode}
          title="Crédito p/ Novo iPhone"
          badge={`+R$ ${calculations.creditBonus} Bônus`}
          description="Cupom liberado imediatamente no laudo para abater na compra de qualquer iPhone lacrado ou seminovo."
          priceFormatted={formatCurrency(calculations.finalCredit)}
        />

        <StepTwoPayoutCardItem
          mode="pix"
          isSelected={payoutMode === "pix"}
          onSelect={onSelectPayoutMode}
          title="Transferência Pix em Conta"
          description="Depósito direto em até 2 horas úteis após a conferência e aprovação dos laudos periciais."
          priceFormatted={formatCurrency(calculations.finalCash)}
        >
          {payoutMode === "pix" && (
            <StepTwoPixFields
              pixKeyType={pixKeyType}
              setPixKeyType={setPixKeyType}
              pixKey={pixKey}
              setPixKey={setPixKey}
            />
          )}
        </StepTwoPayoutCardItem>
      </div>
    </section>
  );
}
