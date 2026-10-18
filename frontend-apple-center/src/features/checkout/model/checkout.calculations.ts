import {
  type CheckoutItem,
  type PaymentMethod,
  type CouponInfo,
  KNOWN_COUPONS,
} from "./checkout.schema";

export const INSURANCE_UNIT_PRICE = 319;
export const INSTALLMENT_COUNT = 12;

export interface CheckoutCalculations {
  itemsSubtotal: number;
  insuranceTotal: number;
  shippingTotal: number;
  couponDiscount: number;
  pixDiscount: number;
  finalTotal: number;
  installmentCount: number;
  installmentValue: number;
  appliedCoupon: CouponInfo | null;
}

export function calculateCheckoutPricing(
  item: CheckoutItem,
  isInsuranceActive: boolean,
  appliedCouponCode: string | null,
  paymentMethod: PaymentMethod
): CheckoutCalculations {
  const itemsSubtotal = item.unitPriceOriginal * item.quantity;
  const insuranceTotal = isInsuranceActive ? INSURANCE_UNIT_PRICE * item.quantity : 0;
  const shippingTotal = 0; // Free express shipping

  let couponDiscount = 0;
  const appliedCoupon = appliedCouponCode ? KNOWN_COUPONS[appliedCouponCode] || null : null;

  if (appliedCoupon) {
    if (appliedCoupon.discountType === "fixed") {
      couponDiscount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === "percentage") {
      couponDiscount = itemsSubtotal * appliedCoupon.discountValue;
    }
  }

  const baseAmount = Math.max(0, itemsSubtotal + insuranceTotal - couponDiscount);
  const pixDiscount = paymentMethod === "pix" ? Math.round(baseAmount * 0.1 * 100) / 100 : 0;
  const finalTotal = paymentMethod === "pix" ? baseAmount - pixDiscount : baseAmount;

  const installmentValue = Math.round((baseAmount / INSTALLMENT_COUNT) * 100) / 100;

  return {
    itemsSubtotal,
    insuranceTotal,
    shippingTotal,
    couponDiscount,
    pixDiscount,
    finalTotal,
    installmentCount: INSTALLMENT_COUNT,
    installmentValue,
    appliedCoupon,
  };
}
