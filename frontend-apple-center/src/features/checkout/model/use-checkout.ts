"use client";

import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  type PaymentMethod,
  type CheckoutItem,
  type CouponFormValues,
  couponSchema,
  KNOWN_COUPONS,
  DEFAULT_CHECKOUT_ITEM,
} from "./checkout.schema";
import { calculateCheckoutPricing } from "./checkout.calculations";

export function useCheckout(initialItem: CheckoutItem = DEFAULT_CHECKOUT_ITEM) {
  const [item, setItem] = useState<CheckoutItem>(initialItem);
  const [isInsuranceActive, setIsInsuranceActive] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>("PRIMEIRACOMPRA");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);

  const couponForm = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: { code: "PRIMEIRACOMPRA" },
  });

  const handleIncreaseQuantity = useCallback(() => {
    setItem((prev) =>
      prev.quantity >= 5 ? (toast.info("Limite de 5 unidades atingido."), prev) : { ...prev, quantity: prev.quantity + 1 }
    );
  }, []);

  const handleDecreaseQuantity = useCallback(() => {
    setItem((prev) => (prev.quantity <= 1 ? prev : { ...prev, quantity: prev.quantity - 1 }));
  }, []);

  const handleRemoveItem = useCallback(() => {
    toast.error("O pedido precisa conter ao menos 1 item.", {
      description: "Caso deseje trocar de produto, selecione um novo modelo no catálogo.",
    });
  }, []);

  const handleToggleInsurance = useCallback(() => {
    setIsInsuranceActive((prev) => {
      const next = !prev;
      toast[next ? "success" : "info"](
        next ? "Proteção Apple Center adicionada ao pedido!" : "Proteção Apple Center removida."
      );
      return next;
    });
  }, []);

  const handleSelectPaymentMethod = useCallback((method: PaymentMethod) => {
    setPaymentMethod(method);
    if (method === "pix") toast.success("Desconto de 10% do Pix ativado!");
  }, []);

  const handleApplyCoupon = useCallback((values: CouponFormValues) => {
    setIsApplyingCoupon(true);
    const upperCode = values.code.trim().toUpperCase();
    setTimeout(() => {
      setIsApplyingCoupon(false);
      const coupon = KNOWN_COUPONS[upperCode];
      if (coupon) {
        setAppliedCouponCode(upperCode);
        toast.success(`Cupom ${upperCode} aplicado com sucesso!`, { description: coupon.description });
      } else {
        toast.error("Cupom inválido ou expirado.", { description: "Tente usar PRIMEIRACOMPRA ou APPLE10." });
      }
    }, 400);
  }, []);

  const handleRemoveCoupon = useCallback(() => {
    setAppliedCouponCode(null);
    couponForm.setValue("code", "");
    toast.info("Cupom removido do pedido.");
  }, [couponForm]);

  const calculations = useMemo(
    () => calculateCheckoutPricing(item, isInsuranceActive, appliedCouponCode, paymentMethod),
    [item, isInsuranceActive, appliedCouponCode, paymentMethod]
  );

  const handleFinalizeOrder = useCallback(async () => {
    if (isProcessingOrder) return;
    setIsProcessingOrder(true);
    toast.loading("Processando Ambiente Seguro...", { id: "checkout-process" });
    await new Promise((resolve) => setTimeout(resolve, 1400));
    toast.success("Pedido gerado com sucesso!", {
      id: "checkout-process",
      description: paymentMethod === "pix" ? "Código Pix Copia e Cola gerado no app do banco." : "Redirecionando...",
    });
    setIsProcessingOrder(false);
  }, [isProcessingOrder, paymentMethod]);

  return {
    item,
    isInsuranceActive,
    paymentMethod,
    appliedCouponCode,
    isApplyingCoupon,
    isProcessingOrder,
    couponForm,
    calculations,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveItem,
    handleToggleInsurance,
    handleSelectPaymentMethod,
    handleApplyCoupon: couponForm.handleSubmit(handleApplyCoupon),
    handleRemoveCoupon,
    handleFinalizeOrder,
  };
}
