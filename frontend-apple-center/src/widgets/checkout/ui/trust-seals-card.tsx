import React from "react";

export function TrustSealsCard() {
  return (
    <section
      aria-label="Garantia e Segurança da Compra"
      className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs border border-outline-variant/10"
    >
      <div className="flex items-center gap-space-sm">
        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0" aria-hidden="true">
          lock
        </span>
        <div className="flex-1">
          <p className="font-label-md text-label-md text-on-surface font-semibold">
            Checkout Criptografado 256-bit SSL
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Seus dados e pagamentos são processados com segurança bancária.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-space-sm pt-2 border-t border-outline-variant/10">
        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0" aria-hidden="true">
          published_with_changes
        </span>
        <div className="flex-1">
          <p className="font-label-md text-label-md text-on-surface font-semibold">
            Garantia de 90 dias com devolução grátis
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Satisfação total ou estorno integral imediato sem burocracia.
          </p>
        </div>
      </div>
    </section>
  );
}
