"use client";

import React from "react";
import { CheckoutHeader } from "./checkout-header";
import { ReassuranceBanner } from "./reassurance-banner";
import { CheckoutItemCard } from "./checkout-item-card";
import { ProtectionAddonCard } from "./protection-addon-card";
import { CouponBox } from "./coupon-box";
import { PaymentMethodSelector } from "./payment-method-selector";
import { OrderSummaryCard } from "./order-summary-card";
import { TrustSealsCard } from "./trust-seals-card";
import { CheckoutBottomCta } from "./checkout-bottom-cta";
import { useCheckout } from "@/features/checkout/hooks/use-checkout";
import type { CheckoutItem } from "@/features/checkout/model/checkout.schema";

export interface CheckoutViewProps {
  initialItem?: CheckoutItem;
}

export function CheckoutView({ initialItem }: CheckoutViewProps) {
  const {
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
    handleApplyCoupon,
    handleRemoveCoupon,
    handleFinalizeOrder,
  } = useCheckout(initialItem);

  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      {/* Fixed Header */}
      <CheckoutHeader />

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-safe bg-surface">
        <div className="w-full max-w-xl mx-auto px-gutter pb-12 flex flex-col">
          {/* Top Reassurance Bar */}
          <ReassuranceBanner />

          {/* Checkout Bento Stack */}
          <div className="flex flex-col gap-space-md mt-space-xs">
            {/* Item Details */}
            <CheckoutItemCard
              item={item}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
              onRemove={handleRemoveItem}
            />

            {/* Care Plus Protection Addon */}
            <ProtectionAddonCard
              isActive={isInsuranceActive}
              onToggle={handleToggleInsurance}
            />

            {/* Coupon Box */}
            <CouponBox
              form={couponForm}
              appliedCoupon={calculations.appliedCoupon}
              isApplying={isApplyingCoupon}
              onApply={handleApplyCoupon}
              onRemove={handleRemoveCoupon}
            />

            {/* Payment Method Selector */}
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onSelect={handleSelectPaymentMethod}
            />

            {/* Order Summary Bento */}
            <OrderSummaryCard
              itemsSubtotal={calculations.itemsSubtotal}
              insuranceTotal={calculations.insuranceTotal}
              isInsuranceActive={isInsuranceActive}
              shippingTotal={calculations.shippingTotal}
              couponDiscount={calculations.couponDiscount}
              appliedCouponCode={appliedCouponCode}
              pixDiscount={calculations.pixDiscount}
              finalTotal={calculations.finalTotal}
              installmentCount={calculations.installmentCount}
              installmentValue={calculations.installmentValue}
              paymentMethod={paymentMethod}
            />

            {/* Trust Seals */}
            <TrustSealsCard />

            {/* Sticky/Final Action Button */}
            <CheckoutBottomCta
              isProcessing={isProcessingOrder}
              onFinalize={handleFinalizeOrder}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
