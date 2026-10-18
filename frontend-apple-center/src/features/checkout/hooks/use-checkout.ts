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
} from "../model/checkout.schema";
import { IPHONE_15_PRO_MAX } from "@/entities/product/model/mock-products";

const DEFAULT_ITEM: CheckoutItem = {
  id: IPHONE_15_PRO_MAX.id,
  name: "iPhone 15 Pro Max",
  storage: "256GB",
  color: "Titânio Natural",
  gradeTag: "Grau A+",
  batteryHealth: "Saúde 98%",
  unitPriceOriginal: 7249,
  unitPricePix: 6399,
  quantity: 1,
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBINuoeVjfiveC-LwYCLnkelQxnNiAa35W0BVW2xOJbWUins4ewofya12_wnkMBCwaHbG3aZXAVPgvKBdozskKdeCWDgBuQwBSp8HiXd_Cniog4aFh11TJ5UUWW_Y9kKM-5VE6AyU_fRaw0IExQIeUEbszIL3sIlAH06jTZhXo439K7s052jICNxPvfi-G2GV1LQfjxdIdN6D-XIgx4lbHCI26fZrIrwgqxJ04OXSEWDZSnrcnX2kIm4Q",
  imageAlt: "iPhone 15 Pro Max Titânio Natural certificado com acabamento premium",
};

export const INSURANCE_UNIT_PRICE = 319;

export function useCheckout(initialItem: CheckoutItem = DEFAULT_ITEM) {
  const [item, setItem] = useState<CheckoutItem>(initialItem);
  const [isInsuranceActive, setIsInsuranceActive] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>("PRIMEIRACOMPRA");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);

  const couponForm = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "PRIMEIRACOMPRA",
    },
  });

  const handleIncreaseQuantity = useCallback(() => {
    setItem((prev) => {
      if (prev.quantity >= 5) {
        toast.info("Limite de 5 unidades por pedido atingido.");
        return prev;
      }
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, []);

  const handleDecreaseQuantity = useCallback(() => {
    setItem((prev) => {
      if (prev.quantity <= 1) return prev;
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, []);

  const handleRemoveItem = useCallback(() => {
    toast.error("O pedido precisa conter ao menos 1 item.", {
      description: "Caso deseje trocar de produto, selecione um novo modelo no catálogo.",
    });
  }, []);

  const handleToggleInsurance = useCallback(() => {
    setIsInsuranceActive((prev) => {
      const next = !prev;
      if (next) {
        toast.success("Proteção Apple Center adicionada ao pedido!");
      } else {
        toast.info("Proteção Apple Center removida.");
      }
      return next;
    });
  }, []);

  const handleSelectPaymentMethod = useCallback((method: PaymentMethod) => {
    setPaymentMethod(method);
    if (method === "pix") {
      toast.success("Desconto de 10% do Pix ativado!");
    }
  }, []);

  const handleApplyCoupon = useCallback((values: CouponFormValues) => {
    setIsApplyingCoupon(true);
    const upperCode = values.code.trim().toUpperCase();

    setTimeout(() => {
      setIsApplyingCoupon(false);
      const coupon = KNOWN_COUPONS[upperCode];

      if (coupon) {
        setAppliedCouponCode(upperCode);
        toast.success(`Cupom ${upperCode} aplicado com sucesso!`, {
          description: coupon.description,
        });
      } else {
        toast.error("Cupom inválido ou expirado.", {
          description: "Tente usar PRIMEIRACOMPRA ou APPLE10.",
        });
      }
    }, 400);
  }, []);

  const handleRemoveCoupon = useCallback(() => {
    setAppliedCouponCode(null);
    couponForm.setValue("code", "");
    toast.info("Cupom removido do pedido.");
  }, [couponForm]);

  // Pricing calculations
  const calculations = useMemo(() => {
    const itemsSubtotal = item.unitPriceOriginal * item.quantity;
    const insuranceTotal = isInsuranceActive ? INSURANCE_UNIT_PRICE * item.quantity : 0;
    const shippingTotal = 0; // Free express shipping

    let couponDiscount = 0;
    if (appliedCouponCode && KNOWN_COUPONS[appliedCouponCode]) {
      const coupon = KNOWN_COUPONS[appliedCouponCode];
      if (coupon.discountType === "fixed") {
        couponDiscount = coupon.discountValue;
      } else if (coupon.discountType === "percentage") {
        couponDiscount = itemsSubtotal * coupon.discountValue;
      }
    }

    const baseAmount = Math.max(0, itemsSubtotal + insuranceTotal - couponDiscount);
    const pixDiscount = paymentMethod === "pix" ? Math.round(baseAmount * 0.1 * 100) / 100 : 0;
    const finalTotal = paymentMethod === "pix" ? baseAmount - pixDiscount : baseAmount;

    const installmentCount = 12;
    const installmentValue = Math.round((baseAmount / installmentCount) * 100) / 100;

    return {
      itemsSubtotal,
      insuranceTotal,
      shippingTotal,
      couponDiscount,
      pixDiscount,
      finalTotal,
      installmentCount,
      installmentValue,
      appliedCoupon: appliedCouponCode ? KNOWN_COUPONS[appliedCouponCode] : null,
    };
  }, [item, isInsuranceActive, appliedCouponCode, paymentMethod]);

  const handleFinalizeOrder = useCallback(async () => {
    if (isProcessingOrder) return;
    setIsProcessingOrder(true);

    toast.loading("Processando Ambiente Seguro...", {
      id: "checkout-process",
      description: "Criptografando dados e gerando credenciais de pagamento...",
    });

    await new Promise((resolve) => setTimeout(resolve, 1400));

    toast.success("Pedido gerado com sucesso!", {
      id: "checkout-process",
      description:
        paymentMethod === "pix"
          ? "Código Pix Copia e Cola gerado. Conclua o pagamento no app do seu banco."
          : "Redirecionando para a operadora de pagamento segura...",
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
