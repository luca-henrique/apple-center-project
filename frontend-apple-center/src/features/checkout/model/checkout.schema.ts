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

export type CouponInfo = CouponData;

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

export const DEFAULT_CHECKOUT_ITEM: CheckoutItem = {
  id: "iphone-15-pro-max",
  name: "iPhone 15 Pro Max",
  storage: "256GB",
  color: "Titânio Natural",
  gradeTag: "Grau A+",
  batteryHealth: "Saúde 98%",
  unitPriceOriginal: 7249,
  unitPricePix: 6399,
  quantity: 1,
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBINuoeVjfiveC-LwYCLnkelQxnNiAa35W0BVW2xOJbWUins4ewofya12_wnkMBCwaHbG3aZXAVPgvKBdozskKdeCWDgBuQwBSp8HiXd_Cniog4aFh11TJ5UUWW_Y9kKM-5VE6AyU_fRaw0IExQIeUEbszIL3sIlAH06jTZhXo439K7s052jICNxPvfi-G2GV1LQfjxdIdN6D-XIgx4lbHCI26fZrIrwgqxJ04OXSEWDZSnrcnX2kIm4Q",
  imageAlt: "iPhone 15 Pro Max Titânio Natural certificado com acabamento premium",
};
