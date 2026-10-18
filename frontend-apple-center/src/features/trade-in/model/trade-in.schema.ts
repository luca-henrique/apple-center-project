import { z } from "zod";

export type CosmeticCondition = "flawless" | "good" | "fair";
export type BatteryCondition = "above85" | "below85";
export type PayoutMode = "credit" | "pix";

export interface TradeInModel {
  id: string;
  name: string;
  baseValue: number;
  imageUrl: string;
  imageAlt: string;
}

export const TRADE_IN_DEVICE_CATALOG: TradeInModel[] = [
  {
    id: "iphone-12-128gb",
    name: "iPhone 12 128GB",
    baseValue: 1800,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 12 128GB acabamento premium",
  },
  {
    id: "iphone-13-128gb",
    name: "iPhone 13 128GB",
    baseValue: 2450,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 13 128GB Verde Alpino certificado",
  },
  {
    id: "iphone-13-pro-128gb",
    name: "iPhone 13 Pro 128GB",
    baseValue: 2900,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 13 Pro 128GB Grafite com bordas de aço cirúrgico",
  },
  {
    id: "iphone-14-128gb",
    name: "iPhone 14 128GB",
    baseValue: 3300,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 14 128GB Estelar laudo 32 etapas",
  },
  {
    id: "iphone-14-pro-128gb",
    name: "iPhone 14 Pro 128GB",
    baseValue: 3950,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 14 Pro 128GB Roxo Profundo com Dynamic Island",
  },
  {
    id: "iphone-15-128gb",
    name: "iPhone 15 128GB",
    baseValue: 4400,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 15 128GB Rosa com vidro traseiro infundido",
  },
  {
    id: "iphone-15-pro-128gb",
    name: "iPhone 15 Pro 128GB",
    baseValue: 5100,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 15 Pro 128GB Titânio Preto com chip A17 Pro",
  },
];

export const CONDITION_MULTIPLIERS: Record<CosmeticCondition, { multiplier: number; label: string; desc: string; icon: string }> = {
  flawless: {
    multiplier: 1.0,
    label: "Perfeito (Como novo)",
    desc: "Tela e corpo sem riscos ou amassados",
    icon: "diamond",
  },
  good: {
    multiplier: 0.88,
    label: "Bom (Leves marcas de uso)",
    desc: "Micro-riscos imperceptíveis no display",
    icon: "thumb_up",
  },
  fair: {
    multiplier: 0.7,
    label: "Com detalhes (Riscos ou trincas)",
    desc: "Sinais de queda ou trinca sem afetar touch",
    icon: "broken_image",
  },
};

export const BATTERY_MULTIPLIERS: Record<BatteryCondition, { multiplier: number; label: string; desc: string; icon: string }> = {
  above85: {
    multiplier: 1.0,
    label: "Acima de 85%",
    desc: "Valor máximo retido",
    icon: "battery_full",
  },
  below85: {
    multiplier: 0.82,
    label: "Abaixo de 85%",
    desc: "Reciclagem técnica",
    icon: "battery_alert",
  },
};

export const CREDIT_BONUS_AMOUNT = 200;

export const tradeInSimulationSchema = z.object({
  modelId: z.string().min(1, "Selecione o modelo do seu iPhone atual"),
  condition: z.enum(["flawless", "good", "fair"]),
  battery: z.enum(["above85", "below85"]),
  payoutMode: z.enum(["credit", "pix"]),
});

export type TradeInSimulationFormValues = z.infer<typeof tradeInSimulationSchema>;
