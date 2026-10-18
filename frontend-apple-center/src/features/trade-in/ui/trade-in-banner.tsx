"use client";

import React, { useState } from "react";
import { TradeInModal } from "./trade-in-modal";

export function TradeInBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-gutter my-space-md">
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-high border border-outline-variant/20 p-space-md sm:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-on-secondary-container text-[24px]">
                sync_alt
              </span>
            </div>
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                Programa Trade-in Oficial Apple Center
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Seu iPhone usado vale até R$ 3.500 na troca por um modelo mais novo.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto min-h-[44px] px-5 py-2.5 rounded-xl font-label-md text-label-md font-semibold bg-primary text-on-primary hover:bg-primary-container active:scale-95 transition-all shadow-sm shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Simular Troca</span>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </div>
      </section>

      <TradeInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
