import { z } from "zod";

export type TradeInStep = 1 | 2 | 3 | 4;
export type CosmeticCondition = "flawless" | "good" | "fair";
export type BatteryCondition = "above85" | "below85";
export type PayoutMode = "credit" | "pix";
export type PixKeyType = "phone" | "cpf" | "email" | "random";

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
    baseValue: 2940,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTVq-Egz_yig8O3OsetnjTbDUFc3uhIMmEYxg5TlpKHuoS9vJZeY62Ku6XIr2tbCebSYUE7QPRBLSxElgaP9ma8-2Ki_LWVpSVlxpy7FiwvyggwZIYifXGtVG0gw2OIgL61yDaMfOFFgiaJ5IzvaO_-weuBkIl237KG1yowf0EXPpj7qn3v7wMMLbWtTFAaAPCXN694XLOSiYCL1pBdh1PxqYidI0V4u771d28ueBVQ3-Jdg9O4dNPiQ",
    imageAlt: "iPhone 13 128GB Verde Alpino certificado",
  },
  {
    id: "iphone-13-pro-128gb",
    name: "iPhone 13 Pro 128GB",
    baseValue: 3350,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 13 Pro 128GB Grafite com bordas de aço cirúrgico",
  },
  {
    id: "iphone-14-128gb",
    name: "iPhone 14 128GB",
    baseValue: 3600,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 14 128GB Estelar laudo 32 etapas",
  },
  {
    id: "iphone-14-pro-128gb",
    name: "iPhone 14 Pro 128GB",
    baseValue: 4200,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 14 Pro 128GB Roxo Profundo com Dynamic Island",
  },
  {
    id: "iphone-15-128gb",
    name: "iPhone 15 128GB",
    baseValue: 4600,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCA7c7Fjp9TjaJNcjmFc6eQYKlO7zluX7oaAn-u6P-nJpeVk3p3h6jV0XARm8PBiHu4bP3Nl_gQ27JnMOM2S0THjF9ZCb2z0nbyJs55X1mFIE9UhRBNvqbfMf14t1_zsrdM85b2UDy-MgrxP0WrZ0Z0LL7Iknh856j7J9u7Rdlxp00rXUjLr3wG4-MHl4Lv-Pou1s_tBUpN6psE7Nrzy--SbgqXtjI-2uWyb6wp4T4SOo5ET9tT-XHnA",
    imageAlt: "iPhone 15 128GB Rosa com vidro traseiro infundido",
  },
  {
    id: "iphone-15-pro-128gb",
    name: "iPhone 15 Pro 128GB",
    baseValue: 5300,
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

export const CREDIT_BONUS_AMOUNT = 300;

export const tradeInSimulationSchema = z.object({
  modelId: z.string().min(1, "Selecione o modelo do seu iPhone atual"),
  condition: z.enum(["flawless", "good", "fair"]),
  battery: z.enum(["above85", "below85"]),
  payoutMode: z.enum(["credit", "pix"]),
});

export type TradeInSimulationFormValues = z.infer<typeof tradeInSimulationSchema>;

export const tradeInOwnerSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  whatsapp: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  streetAddress: z.string().min(5, "Endereço é obrigatório"),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido"),
  pixKeyType: z.enum(["phone", "cpf", "email", "random"]),
  pixKey: z.string().optional(),
  acceptCleanImei: z.boolean().refine((val) => val === true, "Você deve declarar posse legal e IMEI limpo"),
  acceptFindMyDisabled: z.boolean().refine((val) => val === true, "Você deve concordar em desativar o Buscar iPhone"),
});

export type TradeInOwnerFormValues = z.infer<typeof tradeInOwnerSchema>;

export interface InspectionCheckItem {
  id: string;
  name: string;
  status: string;
  icon: string;
}

export interface InspectionGroup {
  id: string;
  title: string;
  icon: string;
  badge: string;
  items: InspectionCheckItem[];
}

export const TECHNICAL_INSPECTION_GROUPS: InspectionGroup[] = [
  {
    id: "biometrics-display",
    title: "Biometria & Display",
    icon: "fingerprint",
    badge: "8 itens periciados • 100% OK",
    items: [
      { id: "face-id", name: "Sensor Face ID (Mapeamento 3D)", status: "Funcional", icon: "check_circle" },
      { id: "display-oled", name: "Tela Super Retina XDR OLED", status: "Original Apple", icon: "check_circle" },
      { id: "true-tone", name: "Sensor True Tone & Brilho Automático", status: "Ativo Calibrado", icon: "check_circle" },
      { id: "pixel-matrix", name: "Pixel Matrix & Ausência de Burn-in", status: "0 Defeitos", icon: "check_circle" },
    ],
  },
  {
    id: "cameras-sensors",
    title: "Câmeras & Sensores Ópticos",
    icon: "photo_camera",
    badge: "9 itens periciados • 100% OK",
    items: [
      { id: "wide-cam", name: "Câmera Grande-Angular 12MP (OIS)", status: "Estabilização OK", icon: "check_circle" },
      { id: "ultra-wide", name: "Ultra-Angular 12MP & Lentes", status: "Sem arranhões", icon: "check_circle" },
      { id: "microphones", name: "Microfones Direcionais (3 canais)", status: "Áudio Cristalino", icon: "check_circle" },
    ],
  },
  {
    id: "logic-board",
    title: "Placa Lógica, Energia & Conectividade",
    icon: "developer_board",
    badge: "11 itens periciados • 100% OK",
    items: [
      { id: "standby-power", name: "Consumo de Corrente em Standby", status: "0.02A Nominal", icon: "check_circle" },
      { id: "lightning-port", name: "Conector Lightning & MagSafe", status: "Sem Oxidação", icon: "check_circle" },
      { id: "battery-cycles", name: "Saúde Térmica & Ciclos de Carga", status: "412 ciclos (Saudável)", icon: "check_circle" },
    ],
  },
  {
    id: "security-compliance",
    title: "Segurança & Homologação",
    icon: "shield",
    badge: "7 itens periciados • 100% OK",
    items: [
      { id: "find-my", name: "Buscar iPhone (iCloud Lock)", status: "Desativado", icon: "check_circle" },
      { id: "gsma-anatel", name: "Consulta Base GSMA & Anatel", status: "IMEI 100% Limpo", icon: "check_circle" },
    ],
  },
];

export interface TradeInUpgradeSuggestion {
  id: string;
  name: string;
  tag: string;
  badge: string;
  colorName: string;
  originalPrice: number;
  installmentText: string;
  imageUrl: string;
  imageAlt: string;
  productSlug: string;
}

export const TRADE_IN_UPGRADE_SUGGESTIONS: TradeInUpgradeSuggestion[] = [
  {
    id: "iphone-15-pro-max-256gb",
    name: "iPhone 15 Pro Max 256GB",
    tag: "Novo Lacrado",
    badge: "1 Ano Garantia",
    colorName: "Titânio Natural",
    originalPrice: 6676.1,
    installmentText: "ou 12x de R$ 318,15 sem juros",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwCTCANZJM7ieuZGEcSHZg2hb4j2-emn12PsgfekhzhtEqbcZSZjJLSuhcRGI7hqCvD3FDSLlUfIHbNmRyXtIa6reMrEw8at7JXGYWSXoLnxyioVi2TCg-H5CEN7rBo2Swug-4ZEG4csVNJIGccgo8tJgExoEPKzcYZSz_Aa5cjLau1lIvEDGqo43hdPpBk62UVgJVDO_SxShAFW-OL3AGXjFIhhzboXABbxeCf4yafnJtp2YxPk6PwA",
    imageAlt: "Apple iPhone 15 Pro Max Titânio Natural acabamento refinado",
    productSlug: "iphone-15-pro-max-256gb",
  },
  {
    id: "iphone-14-pro-128gb-grade-a",
    name: "iPhone 14 Pro 128GB",
    tag: "Excelente Grade A+",
    badge: "Bateria 98%",
    colorName: "Roxo Profundo",
    originalPrice: 4890.0,
    installmentText: "ou 12x de R$ 152,77 sem juros",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiXAZK1VK5uzX21BnuHceAnaN-8G88SNNZngVrT8Df4AbByn6TpIqOkeabYN1S6YHjVMBReZMSBFT8szavhwbNRuR6oTnMFcTWLiCFqGR5y3o1EsboCtnDd8spjxjVMFAbnK0VePIdKQslVqPWQ_2i2dTbR13n2YvRlMvfSzdTCcLxiKeOnVu11azARrbGGrPo8jFWVmEdrP7rcgLlAjnsculhPFI8WGvlDeBnnksc65q2WNYussfoYg",
    imageAlt: "Apple iPhone 14 Pro Roxo Profundo seminovo certificado",
    productSlug: "iphone-14-pro-128gb",
  },
];

export const DEFAULT_TRADE_IN_OWNER_DATA: TradeInOwnerFormValues = {
  fullName: "Lucas Mendes da Silva",
  cpf: "482.918.728-10",
  whatsapp: "(11) 98712-3432",
  email: "lucas.mendes@email.com",
  streetAddress: "Av. Paulista, 1842 - Apto 104",
  neighborhood: "Bela Vista",
  city: "São Paulo",
  state: "SP",
  zipCode: "01310-200",
  pixKeyType: "phone",
  pixKey: "(11) 98712-3432",
  acceptCleanImei: true,
  acceptFindMyDisabled: true,
};

