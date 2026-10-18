"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CouponFormValues, CouponData } from "@/features/checkout/model/checkout.schema";
import { formatCurrency } from "@/shared/lib/format/currency";

export interface CouponBoxProps {
  form: UseFormReturn<CouponFormValues>;
  appliedCoupon: CouponData | null;
  isApplying: boolean;
  onApply: (e: React.FormEvent) => void;
  onRemove: () => void;
}

export function CouponBox({
  form,
  appliedCoupon,
  isApplying,
  onApply,
  onRemove,
}: CouponBoxProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section
      aria-label="Cupom de Desconto"
      className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs border border-outline-variant/10"
    >
      <label htmlFor="coupon-input" className="font-label-md text-label-md text-on-surface font-semibold">
        Cupom de Desconto
      </label>

      <form onSubmit={onApply} className="flex gap-space-xs items-start">
        <div className="relative flex-1">
          <span
            className="material-symbols-outlined text-outline absolute left-3 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none"
            aria-hidden="true"
          >
            sell
          </span>
          <input
            id="coupon-input"
            type="text"
            placeholder="Código do cupom"
            autoCapitalize="characters"
            autoCorrect="off"
            {...register("code")}
            className="w-full bg-surface-container-low text-on-surface font-label-md text-label-md pl-9 pr-3 py-2.5 rounded-lg uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-secondary/50 border border-transparent focus:border-secondary transition-all"
          />
          {errors.code && (
            <p className="text-error font-body-sm text-[11px] mt-1">
              {errors.code.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isApplying}
          className="min-h-11 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-2.5 rounded-lg active:scale-95 transition-all flex items-center justify-center shrink-0 disabled:opacity-50 cursor-pointer"
        >
          {isApplying ? (
            <span className="material-symbols-outlined text-[18px] animate-spin">
              refresh
            </span>
          ) : (
            "Aplicar"
          )}
        </button>
      </form>

      {/* Applied Coupon Feedback */}
      {appliedCoupon && (
        <div className="flex items-center justify-between gap-1.5 text-secondary font-label-sm text-label-sm mt-1 bg-secondary-container/20 px-3 py-2 rounded-lg border border-secondary-container/40">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[16px] text-secondary shrink-0" aria-hidden="true">
              check_circle
            </span>
            <span className="truncate">
              Cupom <b>{appliedCoupon.code}</b> aplicado (
              {appliedCoupon.discountType === "fixed"
                ? `- ${formatCurrency(appliedCoupon.discountValue, { includeCents: true })}`
                : `- 10%`}
              )
            </span>
          </div>

          <button
            type="button"
            onClick={onRemove}
            aria-label="Remover cupom"
            className="text-on-surface-variant hover:text-error text-[11px] font-semibold shrink-0 cursor-pointer underline px-1 py-0.5"
          >
            Remover
          </button>
        </div>
      )}
    </section>
  );
}
