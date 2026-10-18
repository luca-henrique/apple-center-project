import { TRUST_BADGES } from "../model/trust-badges-data";

export function TrustBadges() {
  return (
    <section className="w-full max-w-7xl mx-auto px-gutter my-space-xs" aria-label="Garantias e diferenciais">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.title}
            className="p-3 sm:p-4 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex items-center gap-3 transition-colors hover:border-primary/20"
          >
            <div
              className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[22px]">
                {badge.icon}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md font-bold text-on-surface truncate">
                {badge.title}
              </span>
              <span className="font-body-sm text-[12px] text-on-surface-variant truncate">
                {badge.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
