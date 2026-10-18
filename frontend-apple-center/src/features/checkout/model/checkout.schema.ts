import { z } from "zod";

export type PaymentMethod = "pix" | "card" | "nupay";

export interface CheckoutItem {
  id: string;
  name: string;
  storage: string;
  color: string;
  gradeTag: string;
  batteryHealth: string;
  unitPriceOriginal: number;
  unitPricePix: number;
  quantity: number;
  imageUrl: string;
  imageAlt: string;
}

export interface CouponData {
  code: string;
  discountType: "fixed" | "percentage";
  discountValue: number;
  description: string;
}

export const couponSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, "Informe um código de cupom válido")
    .max(20, "Código de cupom muito longo"),
});

export type CouponFormValues = z.infer<typeof couponSchema>;

export const KNOWN_COUPONS: Record<string, CouponData> = {
  PRIMEIRACOMPRA: {
    code: "PRIMEIRACOMPRA",
    discountType: "fixed",
    discountValue: 150,
    description: "Cupom de primeira compra (-R$ 150,00)",
  },
  APPLE10: {
    code: "APPLE10",
    discountType: "percentage",
    discountValue: 0.1,
    description: "10% de desconto adicional",
  },
  CLIENTEVIP: {
    code: "CLIENTEVIP",
    discountType: "fixed",
    discountValue: 200,
    description: "Desconto VIP Exclusivo (-R$ 200,00)",
  },
};
