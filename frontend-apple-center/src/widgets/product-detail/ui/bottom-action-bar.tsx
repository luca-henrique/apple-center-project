"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Product, ProductStorageOption } from "@/entities/product/model/types";
import { formatCurrency } from "@/shared/lib/format/currency";
import { Button } from "@/shared/ui/button";

export interface BottomActionBarProps {
  product: Product;
  selectedStorage: ProductStorageOption;
}

export function BottomActionBar({ product, selectedStorage }: BottomActionBarProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const currentPricePix = product.pricePix + (selectedStorage.priceDiff || 0);

  const router = useRouter();

  const handleBuyNow = () => {
    setIsPurchasing(true);
    toast.success("Iniciando checkout seguro...", {
      description: `Preparando seu pedido de ${formatCurrency(currentPricePix)}.`,
    });
    setTimeout(() => {
      router.push(`/checkout?productId=${encodeURIComponent(product.slug)}&storage=${encodeURIComponent(selectedStorage.label)}`);
    }, 400);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-lg border-t border-outline-variant/15 p-3 sm:p-4 pb-safe shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Price Preview */}
        <div className="flex flex-col min-w-0">
          <span className="font-label-sm text-[11px] text-on-surface-variant leading-none">
            À vista no Pix
          </span>
          <span className="font-headline-sm text-headline-sm font-bold text-secondary truncate">
            {formatCurrency(currentPricePix)}
          </span>
          <span className="font-body-sm text-[11px] text-on-surface-variant truncate">
            ou 12x de {formatCurrency((currentPricePix * 1.11) / 12, { includeCents: true })}
          </span>
        </div>

        {/* Action Button */}
        <Button
          type="button"
          variant="primary"
          size="lg"
          isLoading={isPurchasing}
          onClick={handleBuyNow}
          className="flex-1 sm:flex-initial sm:min-w-[240px]"
          leftIcon={
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              lock
            </span>
          }
        >
          Comprar com Garantia
        </Button>
      </div>
    </div>
  );
}
