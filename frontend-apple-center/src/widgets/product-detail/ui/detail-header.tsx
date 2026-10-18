"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function DetailHeader() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-xs border-b border-outline-variant/15 transition-all">
      <div className="h-16 px-gutter flex items-center justify-between gap-space-sm max-w-7xl mx-auto">
        <div className="flex items-center gap-space-xs min-w-0">
          <button
            type="button"
            aria-label="Voltar para a página anterior"
            onClick={handleBack}
            className="w-11 h-11 -ml-2 flex items-center justify-center rounded-full text-on-surface hover:text-secondary active:scale-90 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              arrow_back_ios_new
            </span>
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                devices
              </span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight font-semibold">
              Detalhes do Aparelho
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-space-xs">
          <Link
            href="/"
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
            aria-label="Ir para a loja"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              storefront
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
