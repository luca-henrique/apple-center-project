"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function CheckoutHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-surface/85 backdrop-blur-xl border-b border-outline-variant/15 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-3xl mx-auto h-16 px-gutter flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            aria-label="Voltar para a página anterior"
            onClick={() => router.back()}
            className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-full text-on-surface hover:text-secondary hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              arrow_back_ios_new
            </span>
          </button>

          <Link href="/" className="flex items-center gap-2" aria-label="Ir para a página inicial">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                devices
              </span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight">
              Checkout Garantido
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-space-xs">
          <div
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm text-on-primary select-none"
            aria-label="Conta do Usuário"
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
