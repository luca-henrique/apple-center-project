"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  type CosmeticCondition,
  type BatteryCondition,
  type PayoutMode,
  TRADE_IN_DEVICE_CATALOG,
  CONDITION_MULTIPLIERS,
  BATTERY_MULTIPLIERS,
  CREDIT_BONUS_AMOUNT,
} from "../model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

export function useTradeIn() {
  const router = useRouter();

  const [selectedModelId, setSelectedModelId] = useState<string>("iphone-13-128gb");
  const [condition, setCondition] = useState<CosmeticCondition>("flawless");
  const [battery, setBattery] = useState<BatteryCondition>("above85");
  const [payoutMode, setPayoutMode] = useState<PayoutMode>("credit");
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedModel = useMemo(() => {
    return (
      TRADE_IN_DEVICE_CATALOG.find((m) => m.id === selectedModelId) ||
      TRADE_IN_DEVICE_CATALOG[1]
    );
  }, [selectedModelId]);

  const calculations = useMemo(() => {
    const baseValue = selectedModel.baseValue;
    const conditionMul = CONDITION_MULTIPLIERS[condition].multiplier;
    const batteryMul = BATTERY_MULTIPLIERS[battery].multiplier;

    const finalCash = Math.round((baseValue * conditionMul * batteryMul) / 10) * 10;
    const finalCredit = finalCash + CREDIT_BONUS_AMOUNT;
    const currentValuation = payoutMode === "pix" ? finalCash : finalCredit;

    return {
      baseValue,
      conditionMul,
      batteryMul,
      finalCash,
      finalCredit,
      currentValuation,
      creditBonus: CREDIT_BONUS_AMOUNT,
    };
  }, [selectedModel, condition, battery, payoutMode]);

  const handleSelectModel = useCallback((modelId: string) => {
    setSelectedModelId(modelId);
    setActiveStep(1);
  }, []);

  const handleSelectCondition = useCallback((newCondition: CosmeticCondition) => {
    setCondition(newCondition);
    setActiveStep(2);
  }, []);

  const handleSelectBattery = useCallback((newBattery: BatteryCondition) => {
    setBattery(newBattery);
    setActiveStep(3);
  }, []);

  const handleSelectPayoutMode = useCallback((mode: PayoutMode) => {
    setPayoutMode(mode);
  }, []);

  const handleContinueTradeIn = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    toast.loading("Registrando sua avaliação técnica...", {
      id: "trade-in-submit",
      description: `Garantindo a cotação de ${formatCurrency(calculations.currentValuation)} por 7 dias.`,
    });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    toast.success("Cotação garantida com sucesso!", {
      id: "trade-in-submit",
      description:
        payoutMode === "credit"
          ? `Bônus de R$ 200 ativado! Redirecionando para aplicar o crédito no checkout.`
          : `Instruções de envio gratuito via Correios enviadas para o seu WhatsApp.`,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      if (payoutMode === "credit") {
        router.push("/checkout?tradeIn=applied");
      } else {
        router.push("/#produtos");
      }
    }, 600);
  }, [isSubmitting, calculations.currentValuation, payoutMode, router]);

  return {
    selectedModelId,
    selectedModel,
    condition,
    battery,
    payoutMode,
    activeStep,
    isSubmitting,
    calculations,
    handleSelectModel,
    handleSelectCondition,
    handleSelectBattery,
    handleSelectPayoutMode,
    handleContinueTradeIn,
  };
}
