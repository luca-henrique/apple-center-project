import React from "react";

export function ReassuranceBanner() {
  return (
    <div className="pt-space-sm pb-space-xs">
      <div className="bg-secondary-container/30 rounded-xl px-space-md py-space-xs flex items-center justify-between text-on-secondary-container">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            verified_user
          </span>
          <span className="font-label-md text-label-md font-semibold">
            Checkout Garantido &amp; Certificado
          </span>
        </div>
        <span className="font-label-sm text-label-sm uppercase bg-secondary-container/70 px-2.5 py-0.5 rounded-full font-bold tracking-wider">
          100% Seguro
        </span>
      </div>
    </div>
  );
}
