import React, { type ReactNode, useId } from "react";

export interface FormFieldProps {
  label?: string;
  errorText?: string;
  helperText?: string;
  required?: boolean;
  children: (props: { id: string; hasError: boolean; "aria-describedby"?: string }) => ReactNode;
  className?: string;
}

export function FormField({
  label,
  errorText,
  helperText,
  required = false,
  children,
  className = "",
}: FormFieldProps) {
  const generatedId = useId();
  const inputId = `field-${generatedId}`;
  const errorId = `error-${generatedId}`;
  const helperId = `helper-${generatedId}`;

  const hasError = Boolean(errorText);
  const describedBy = hasError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-label-md text-label-md text-on-surface font-medium flex items-center gap-1 select-none"
        >
          <span>{label}</span>
          {required && <span className="text-error" aria-hidden="true">*</span>}
        </label>
      )}

      {children({ id: inputId, hasError, "aria-describedby": describedBy })}

      {hasError ? (
        <span
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-label-sm font-label-sm text-error flex items-center gap-1 mt-0.5"
        >
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            error
          </span>
          <span>{errorText}</span>
        </span>
      ) : helperText ? (
        <span id={helperId} className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
