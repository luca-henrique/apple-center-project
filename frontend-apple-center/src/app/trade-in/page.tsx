import React from "react";
import type { Metadata } from "next";
import { TradeInView } from "@/widgets/trade-in";
import { BottomNav } from "@/widgets/bottom-nav";

export const metadata: Metadata = {
  title: "Trade-In Apple Center | Troque seu iPhone Usado com Bônus Imediato",
  description:
    "Simule a avaliação do seu iPhone usado em 3 passos com rigor de laboratório Apple. Ganhe até R$ 200 de bônus exclusivo na troca garantida.",
  alternates: {
    canonical: "/trade-in",
  },
  openGraph: {
    title: "Trade-In Apple Center | Troque seu iPhone Usado com Bônus Imediato",
    description:
      "Cotação instantânea para o seu iPhone usado com envio seguro gratuito e bônus de até R$ 200 na troca.",
    url: "/trade-in",
    siteName: "Apple Center",
    type: "website",
  },
};

export default function TradeInPage() {
  return (
    <>
      <TradeInView />
      <BottomNav />
    </>
  );
}
