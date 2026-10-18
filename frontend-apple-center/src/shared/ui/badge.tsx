import React, { type ReactNode } from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "outline"
  | "discount";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  icon?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-surface-container-high text-on-surface",
  success: "bg-secondary-container text-on-secondary-container",
  warning: "bg-amber-100 text-amber-900 border border-amber-200",
  outline: "border border-outline-variant text-on-surface-variant bg-surface-container-lowest",
  discount: "bg-emerald-500/10 text-emerald-700 font-semibold border border-emerald-500/20",
};

export function Badge({
  variant = "secondary",
  children,
  className = "",
  icon,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm leading-none transition-colors ${VARIANT_STYLES[variant]} ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[13px] leading-none" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
