"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  shippingSchema,
  type ShippingFormValues,
  type ShippingOption,
} from "../model/shipping.schema";
import { formatZipCode } from "@/shared/lib/format/document";

export function useShippingCalculator() {
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      postalCode: "",
    },
    mode: "onBlur",
  });

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipCode(e.target.value);
    form.setValue("postalCode", formatted, { shouldValidate: false });
  };

  const onSubmit = async (values: ShippingFormValues) => {
    setIsCalculating(true);
    setShippingOptions(null);

    // Simulate API query for shipping options
    setTimeout(() => {
      const cleaned = values.postalCode.replace(/\D/g, "");
      if (cleaned.length !== 8) {
        form.setError("postalCode", { message: "Digite um CEP válido" });
        setIsCalculating(false);
        return;
      }

      setShippingOptions([
        {
          id: "sedex",
          name: "Sedex Expresso com Seguro",
          description: "Entrega prioritária com laudo lacrado",
          price: 0,
          priceFormatted: "Grátis",
          estimatedDays: "1 a 2 dias úteis",
          badge: "Recomendado",
        },
        {
          id: "motoboy",
          name: "Entrega Expressa Capital",
          description: "Receba hoje mesmo em mãos (com agendamento)",
          price: 29.9,
          priceFormatted: "R$ 29,90",
          estimatedDays: "Hoje até 20h",
        },
      ]);
      setIsCalculating(false);
    }, 600);
  };

  return {
    form,
    shippingOptions,
    isCalculating,
    handlePostalCodeChange,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
