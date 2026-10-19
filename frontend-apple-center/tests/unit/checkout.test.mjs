import { describe, it } from "node:test";
import assert from "node:assert";

const INSURANCE_UNIT_PRICE = 319;
const INSTALLMENT_COUNT = 12;

function calculateCheckoutPricing(item, isInsuranceActive, appliedCoupon, paymentMethod) {
  const itemsSubtotal = item.unitPriceOriginal * item.quantity;
  const insuranceTotal = isInsuranceActive ? INSURANCE_UNIT_PRICE * item.quantity : 0;
  const shippingTotal = 0;

  let couponDiscount = 0;
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
    installmentValue,
  };
}

describe("calculateCheckoutPricing unit tests", () => {
  const mockItem = {
    unitPriceOriginal: 5000,
    quantity: 1,
  };

  it("calculates basic total without insurance or discounts", () => {
    const res = calculateCheckoutPricing(mockItem, false, null, "credit_card");
    assert.strictEqual(res.itemsSubtotal, 5000);
    assert.strictEqual(res.insuranceTotal, 0);
    assert.strictEqual(res.finalTotal, 5000);
    assert.strictEqual(res.installmentValue, 416.67);
  });

  it("applies 10% PIX discount correctly", () => {
    const res = calculateCheckoutPricing(mockItem, false, null, "pix");
    assert.strictEqual(res.pixDiscount, 500);
    assert.strictEqual(res.finalTotal, 4500);
  });

  it("adds insurance cost per quantity", () => {
    const multiItem = { unitPriceOriginal: 5000, quantity: 2 };
    const res = calculateCheckoutPricing(multiItem, true, null, "credit_card");
    assert.strictEqual(res.insuranceTotal, 638);
    assert.strictEqual(res.finalTotal, 10638);
  });

  it("applies fixed coupon discount correctly", () => {
    const coupon = { discountType: "fixed", discountValue: 200 };
    const res = calculateCheckoutPricing(mockItem, false, coupon, "credit_card");
    assert.strictEqual(res.couponDiscount, 200);
    assert.strictEqual(res.finalTotal, 4800);
  });
});
