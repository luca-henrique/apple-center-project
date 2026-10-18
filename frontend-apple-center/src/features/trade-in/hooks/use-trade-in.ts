"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  type TradeInStep,
  type CosmeticCondition,
  type BatteryCondition,
  type PayoutMode,
  type PixKeyType,
  type TradeInOwnerFormValues,
  TRADE_IN_DEVICE_CATALOG,
  CONDITION_MULTIPLIERS,
  BATTERY_MULTIPLIERS,
  CREDIT_BONUS_AMOUNT,
} from "../model/trade-in.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

export function useTradeIn() {
  const router = useRouter();

  // Multi-step journey: 1: Cotação, 2: Dados & Envio, 3: Laudo Pericial, 4: Resgate
  const [currentStep, setCurrentStep] = useState<TradeInStep>(1);

  // Step 1: Simulator selection
  const [selectedModelId, setSelectedModelId] = useState<string>("iphone-13-128gb");
  const [condition, setCondition] = useState<CosmeticCondition>("flawless");
  const [battery, setBattery] = useState<BatteryCondition>("above85");
  const [payoutMode, setPayoutMode] = useState<PayoutMode>("credit");

  // Step 2: Owner details & logistics
  const [ownerData, setOwnerData] = useState<TradeInOwnerFormValues>({
    fullName: "Lucas Mendes da Silva",
    cpf: "482.918.728-10",
    whatsapp: "(11) 98712-3432",
    email: "lucas.mendes@email.com",
    streetAddress: "Av. Paulista, 1842 - Apto 104",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-200",
    pixKeyType: "phone",
    pixKey: "(11) 98712-3432",
    acceptCleanImei: true,
    acceptFindMyDisabled: true,
  });

  const [pixKeyType, setPixKeyType] = useState<PixKeyType>("phone");
  const [pixKey, setPixKey] = useState<string>("(11) 98712-3432");

  // Process / Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const couponCode = "TRADEIN-LUCAS-89420";
  const protocolId = "#TRD-89420";

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

  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const goToStep = useCallback(
    (step: TradeInStep) => {
      setCurrentStep(step);
      scrollToTop();
    },
    [scrollToTop]
  );

  const goToNextStep = useCallback(() => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as TradeInStep);
      scrollToTop();
    }
  }, [currentStep, scrollToTop]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as TradeInStep);
      scrollToTop();
    } else {
      router.back();
    }
  }, [currentStep, router, scrollToTop]);

  const handleSelectModel = useCallback((modelId: string) => {
    setSelectedModelId(modelId);
  }, []);

  const handleSelectCondition = useCallback((newCondition: CosmeticCondition) => {
    setCondition(newCondition);
  }, []);

  const handleSelectBattery = useCallback((newBattery: BatteryCondition) => {
    setBattery(newBattery);
  }, []);

  const handleSelectPayoutMode = useCallback((mode: PayoutMode) => {
    setPayoutMode(mode);
  }, []);

  // Step 1 -> Step 2
  const handleContinueTradeIn = useCallback(() => {
    goToStep(2);
    toast.success("Cotação inicial gravada!", {
      description: `Garantida por 7 dias. Preencha seus dados para envio gratuito.`,
    });
  }, [goToStep]);

  // Step 2 -> Step 3
  const handleConfirmShippingAndGenerateReport = useCallback(async () => {
    if (!ownerData.acceptCleanImei || !ownerData.acceptFindMyDisabled) {
      toast.error("Termos de procedência pendentes", {
        description: "Aceite os termos de posse legal e desativação do Buscar iPhone para prosseguir.",
      });
      return;
    }

    setIsSubmitting(true);
    toast.loading("Gerando etiqueta e integrando laudo pericial...", {
      id: "step-2-submit",
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Etiqueta gerada e laudo emitido!", {
      id: "step-2-submit",
      description: "Seu aparelho foi inspecionado em bancada técnica.",
    });

    setIsSubmitting(false);
    goToStep(3);
  }, [ownerData, goToStep]);

  // Step 3 -> Step 4
  const handleAcceptReportAndReleaseCredit = useCallback(async () => {
    setIsSubmitting(true);
    toast.loading("Liberando crédito no sistema Apple Center...", {
      id: "step-3-submit",
    });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    toast.success("Crédito liberado com sucesso!", {
      id: "step-3-submit",
      description: `Seu cupom no valor de ${formatCurrency(calculations.currentValuation)} está pronto!`,
    });

    setIsSubmitting(false);
    goToStep(4);
  }, [calculations.currentValuation, goToStep]);

  // Step 4 Copy Coupon
  const handleCopyCoupon = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(couponCode);
      setIsCopied(true);
      toast.success("Cupom copiado!", {
        description: `${couponCode} foi copiado para sua área de transferência.`,
      });
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [couponCode]);

  // Step 4 Apply and Buy
  const handleApplyCreditAndBuy = useCallback(
    (productSlug: string) => {
      toast.success("Cupom aplicado automaticamente!", {
        description: `Desconto de ${formatCurrency(calculations.currentValuation)} aplicado no carrinho.`,
      });
      router.push(`/checkout?coupon=${couponCode}&product=${productSlug}`);
    },
    [couponCode, calculations.currentValuation, router]
  );

  return {
    currentStep,
    selectedModelId,
    selectedModel,
    condition,
    battery,
    payoutMode,
    ownerData,
    setOwnerData,
    pixKeyType,
    setPixKeyType,
    pixKey,
    setPixKey,
    isSubmitting,
    isCopied,
    couponCode,
    protocolId,
    calculations,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    handleSelectModel,
    handleSelectCondition,
    handleSelectBattery,
    handleSelectPayoutMode,
    handleContinueTradeIn,
    handleConfirmShippingAndGenerateReport,
    handleAcceptReportAndReleaseCredit,
    handleCopyCoupon,
    handleApplyCreditAndBuy,
  };
}

