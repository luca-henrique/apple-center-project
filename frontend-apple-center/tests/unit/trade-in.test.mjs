import { describe, it } from "node:test";
import assert from "node:assert";

const CREDIT_BONUS_AMOUNT = 300;

function calculateTradeInValuation(baseValue, conditionMul, batteryMul, payoutMode) {
  const finalCash = Math.round((baseValue * conditionMul * batteryMul) / 10) * 10;
  const finalCredit = finalCash + CREDIT_BONUS_AMOUNT;
  const currentValuation = payoutMode === "pix" ? finalCash : finalCredit;

  return {
    baseValue,
    finalCash,
    finalCredit,
    currentValuation,
    creditBonus: CREDIT_BONUS_AMOUNT,
  };
}

describe("calculateTradeInValuation unit tests", () => {
  it("calculates exact cash payout for perfect condition (1.0 x 1.0)", () => {
    const res = calculateTradeInValuation(4000, 1.0, 1.0, "pix");
    assert.strictEqual(res.finalCash, 4000);
    assert.strictEqual(res.currentValuation, 4000);
  });

  it("applies credit bonus when payout mode is store_credit", () => {
    const res = calculateTradeInValuation(4000, 1.0, 1.0, "store_credit");
    assert.strictEqual(res.finalCredit, 4300);
    assert.strictEqual(res.currentValuation, 4300);
  });

  it("applies condition degradation multiplier correctly", () => {
    // 0.8 condition x 0.9 battery on 4000 = 2880
    const res = calculateTradeInValuation(4000, 0.8, 0.9, "pix");
    assert.strictEqual(res.finalCash, 2880);
    assert.strictEqual(res.currentValuation, 2880);
  });
});
