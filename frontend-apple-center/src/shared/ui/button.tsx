import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98] shadow-sm",
  secondary:
    "bg-surface-container-high text-on-surface hover:bg-surface-variant active:scale-[0.98]",
  outline:
    "border border-outline-variant text-on-surface hover:bg-surface-container-low active:scale-[0.98]",
  ghost:
    "bg-transparent text-on-surface hover:bg-surface-container-low active:scale-[0.98]",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "min-h-[36px] px-3 py-1.5 text-label-sm font-label-sm rounded-lg",
  md: "min-h-[44px] px-4 py-2.5 text-label-md font-label-md rounded-xl",
  lg: "min-h-[50px] px-6 py-3 text-label-lg font-label-lg rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
    >
      {isLoading ? (
        <span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Carregando"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
