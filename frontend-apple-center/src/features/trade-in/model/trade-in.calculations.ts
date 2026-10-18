import {
  type CosmeticCondition,
  type BatteryCondition,
  type PayoutMode,
  CONDITION_MULTIPLIERS,
  BATTERY_MULTIPLIERS,
  CREDIT_BONUS_AMOUNT,
} from "./trade-in.schema";

export interface TradeInCalculations {
  baseValue: number;
  conditionMul: number;
  batteryMul: number;
  finalCash: number;
  finalCredit: number;
  currentValuation: number;
  creditBonus: number;
}

export function calculateTradeInValuation(
  baseValue: number,
  condition: CosmeticCondition,
  battery: BatteryCondition,
  payoutMode: PayoutMode
): TradeInCalculations {
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
}
