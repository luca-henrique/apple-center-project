import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CheckoutView } from "@/widgets/checkout";
import { getProductBySlug, IPHONE_15_PRO_MAX } from "@/entities/product";
import type { CheckoutItem } from "@/features/checkout/model/checkout.schema";

export const metadata: Metadata = {
  title: "Checkout Garantido & Seguro | Apple Center",
  description:
    "Finalize sua compra com segurança bancária 256-bit SSL, 10% de desconto no Pix e garantia de 12 meses Apple Center.",
  robots: {
    index: false,
    follow: false,
  },
};

interface CheckoutPageProps {
  searchParams?: Promise<{
    productId?: string;
    storage?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const productId = resolvedParams.productId;

  let initialItem: CheckoutItem | undefined = undefined;

  if (productId) {
    const product = await getProductBySlug(productId);
    if (product) {
      initialItem = {
        id: product.id,
        name: product.name,
        storage: resolvedParams.storage || product.storage,
        color: product.color,
        gradeTag: product.gradeTag,
        batteryHealth: product.batteryHealth,
        unitPriceOriginal: Math.round(product.pricePix * 1.11),
        unitPricePix: product.pricePix,
        quantity: 1,
        imageUrl: product.imageUrl,
        imageAlt: product.imageAlt,
      };
    }
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[32px] text-secondary animate-spin">
              refresh
            </span>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Carregando ambiente seguro de checkout...
            </p>
          </div>
        </div>
      }
    >
      <CheckoutView initialItem={initialItem} />
    </Suspense>
  );
}
