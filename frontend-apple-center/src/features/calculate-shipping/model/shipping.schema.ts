import { z } from "zod";

export const shippingSchema = z.object({
  postalCode: z
    .string()
    .min(8, "O CEP deve conter ao menos 8 dígitos")
    .regex(/^\d{5}-?\d{3}$/, "Formato de CEP inválido (ex: 01310-100)"),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  estimatedDays: string;
  badge?: string;
}
