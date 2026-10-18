"use client";

import React from "react";
import Link from "next/link";
import { toast } from "sonner";

export function TradeInHeader() {
  const handleNotify = () => {
    toast.info("Alertas de Cotação", {
      description: "Você será notificado quando novos bônus de Trade-In forem liberados.",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-surface/85 backdrop-blur-xl border-b border-outline-variant/15 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-3xl mx-auto h-16 px-gutter flex items-center justify-between gap-space-sm">
        <Link href="/" className="flex items-center gap-space-sm min-w-0 select-none group" aria-label="Ir para a página inicial">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              devices
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-bold leading-none">
              Apple Certified
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight font-semibold mt-0.5">
              Trade In
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            aria-label="Notificações de Trade-in"
            onClick={handleNotify}
            className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              notifications
            </span>
          </button>
          <div
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm text-on-primary select-none"
            aria-label="Perfil do Usuário"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
