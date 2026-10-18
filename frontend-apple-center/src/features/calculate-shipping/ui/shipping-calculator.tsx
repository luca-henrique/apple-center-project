"use client";

import React from "react";
import { useShippingCalculator } from "../hooks/use-shipping-calculator";
import { FormField } from "@/shared/ui/form-field";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export function ShippingCalculator() {
  const { form, shippingOptions, isCalculating, handlePostalCodeChange, handleSubmit } =
    useShippingCalculator();

  const postalCodeError = form.formState.errors.postalCode?.message;

  return (
    <section className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">
          local_shipping
        </span>
        <h3 className="font-title-md text-title-md font-semibold text-on-surface">
          Calcular Frete e Prazo de Entrega
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 items-start">
        <div className="w-full sm:w-64">
          <FormField errorText={postalCodeError}>
            {({ id, hasError, "aria-describedby": ariaDescribedBy }) => (
              <Input
                id={id}
                type="text"
                maxLength={9}
                placeholder="00000-000"
                hasError={hasError}
                aria-describedby={ariaDescribedBy}
                {...form.register("postalCode")}
                onChange={(e) => {
                  form.register("postalCode").onChange(e);
                  handlePostalCodeChange(e);
                }}
              />
            )}
          </FormField>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isCalculating}
          className="w-full sm:w-auto shrink-0"
        >
          Calcular
        </Button>
      </form>

      {/* Results */}
      {shippingOptions && (
        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/15 animate-in fade-in duration-200">
          {shippingOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 transition-colors"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    {option.name}
                  </span>
                  {option.badge && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-secondary-container text-on-secondary-container">
                      {option.badge}
                    </span>
                  )}
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {option.description} • Chega em {option.estimatedDays}
                </span>
              </div>
              <span className="font-title-sm text-title-sm font-bold text-secondary">
                {option.priceFormatted}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
