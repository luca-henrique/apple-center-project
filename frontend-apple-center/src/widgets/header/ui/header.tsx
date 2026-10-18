"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleOpenCart = () => {
    toast.info("Carrinho de Compras", {
      description: `${cartCount} item(ns) selecionado(s). Checkout seguro via Pix ou Cartão.`,
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/85 backdrop-blur-md border-b border-outline-variant/15 transition-all">
      <div className="max-w-7xl mx-auto px-gutter h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 select-none group" aria-label="Ir para a página inicial">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              devices
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-title-md text-title-md font-bold tracking-tight text-on-surface leading-none">
              Apple Center
            </span>
            <span className="font-label-sm text-[10px] text-secondary font-semibold uppercase tracking-wider mt-0.5">
              Certificados
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Help Button */}
          <button
            type="button"
            onClick={() => {
              setIsHelpOpen(!isHelpOpen);
              toast.info("Atendimento Especializado", {
                description: "WhatsApp: (11) 99999-8888 • Segunda a Sábado das 09h às 20h",
              });
            }}
            aria-label="Ajuda e Suporte"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              help_outline
            </span>
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={handleOpenCart}
            aria-label={`Carrinho com ${cartCount} itens`}
            className="relative min-w-[44px] min-h-[44px] px-3 py-2 rounded-full flex items-center justify-center gap-1 text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              shopping_bag
            </span>
            {cartCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
