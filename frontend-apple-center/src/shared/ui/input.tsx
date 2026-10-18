import React, { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", hasError = false, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={`w-full min-h-11 px-3.5 py-2.5 rounded-xl text-body-md font-body-md bg-surface-container-lowest border transition-colors placeholder:text-outline/70 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:bg-surface-container-low ${
          hasError
            ? "border-error focus-visible:ring-error/30 text-error"
            : "border-outline-variant focus-visible:border-primary focus-visible:ring-primary/20 text-on-surface"
        } ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
