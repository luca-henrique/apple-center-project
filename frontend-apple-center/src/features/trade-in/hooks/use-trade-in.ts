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
  DEFAULT_TRADE_IN_OWNER_DATA,
} from "../model/trade-in.schema";
import { calculateTradeInValuation } from "../model/trade-in.calculations";
import { formatCurrency } from "@/shared/lib/format/currency";

const COUPON_CODE = "TRADEIN-LUCAS-89420";
const PROTOCOL_ID = "#TRD-89420";

export function useTradeIn() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<TradeInStep>(1);
  const [selectedModelId, setSelectedModelId] = useState<string>("iphone-13-128gb");
  const [condition, setCondition] = useState<CosmeticCondition>("flawless");
  const [battery, setBattery] = useState<BatteryCondition>("above85");
  const [payoutMode, setPayoutMode] = useState<PayoutMode>("credit");
  const [ownerData, setOwnerData] = useState<TradeInOwnerFormValues>(DEFAULT_TRADE_IN_OWNER_DATA);
  const [pixKeyType, setPixKeyType] = useState<PixKeyType>("phone");
  const [pixKey, setPixKey] = useState<string>("(11) 98712-3432");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const selectedModel = useMemo(
    () => TRADE_IN_DEVICE_CATALOG.find((m) => m.id === selectedModelId) || TRADE_IN_DEVICE_CATALOG[1],
    [selectedModelId]
  );

  const calculations = useMemo(
    () => calculateTradeInValuation(selectedModel.baseValue, condition, battery, payoutMode),
    [selectedModel.baseValue, condition, battery, payoutMode]
  );

  const goToStep = useCallback((step: TradeInStep) => {
    setCurrentStep(step);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) goToStep((currentStep - 1) as TradeInStep);
    else router.back();
  }, [currentStep, router, goToStep]);

  const handleContinueTradeIn = useCallback(() => {
    goToStep(2);
    toast.success("Cotação gravada por 7 dias!");
  }, [goToStep]);

  const handleConfirmShippingAndGenerateReport = useCallback(async () => {
    if (!ownerData.acceptCleanImei || !ownerData.acceptFindMyDisabled) {
      toast.error("Aceite os termos legais para prosseguir.");
      return;
    }
    setIsSubmitting(true);
    toast.loading("Gerando etiqueta e laudo...", { id: "sub" });
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Etiqueta gerada e laudo emitido!", { id: "sub" });
    setIsSubmitting(false);
    goToStep(3);
  }, [ownerData, goToStep]);

  const handleAcceptReportAndReleaseCredit = useCallback(async () => {
    setIsSubmitting(true);
    toast.loading("Liberando crédito...", { id: "sub" });
    await new Promise((r) => setTimeout(r, 700));
    toast.success(`Cupom de ${formatCurrency(calculations.currentValuation)} pronto!`, { id: "sub" });
    setIsSubmitting(false);
    goToStep(4);
  }, [calculations.currentValuation, goToStep]);

  const handleCopyCoupon = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(COUPON_CODE);
      setIsCopied(true);
      toast.success("Cupom copiado!");
      setTimeout(() => setIsCopied(false), 3000);
    }
  }, []);

  const handleApplyCreditAndBuy = useCallback(
    (slug: string) => {
      toast.success("Cupom aplicado automaticamente!");
      router.push(`/checkout?coupon=${COUPON_CODE}&product=${slug}`);
    },
    [router]
  );

  return {
    currentStep, selectedModelId, selectedModel, condition, battery, payoutMode,
    ownerData, setOwnerData, pixKeyType, setPixKeyType, pixKey, setPixKey,
    isSubmitting, isCopied, couponCode: COUPON_CODE, protocolId: PROTOCOL_ID, calculations,
    goToStep, goToPreviousStep, handleContinueTradeIn,
    handleConfirmShippingAndGenerateReport, handleAcceptReportAndReleaseCredit,
    handleCopyCoupon, handleApplyCreditAndBuy,
    handleSelectModel: setSelectedModelId, handleSelectCondition: setCondition,
    handleSelectBattery: setBattery, handleSelectPayoutMode: setPayoutMode,
  };
}
