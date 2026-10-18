export interface TrustBadgeItem {
  icon: string;
  title: string;
  description: string;
}

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    icon: "verified_user",
    title: "Garantia 1 Ano",
    description: "Suporte e cobertura",
  },
  {
    icon: "battery_charging_full",
    title: "Bateria Auditada",
    description: "Mínimo 90% a 100%",
  },
  {
    icon: "local_shipping",
    title: "Frete Seguro Grátis",
    description: "Com rastreio expresso",
  },
  {
    icon: "fact_check",
    title: "Laudo Técnico",
    description: "+35 itens testados",
  },
];
