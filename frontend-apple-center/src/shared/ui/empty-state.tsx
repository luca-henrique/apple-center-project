import React from "react";
import { Button } from "./button";

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon = "search_off",
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center p-8 text-center bg-surface-container-low rounded-2xl border border-outline-variant/20 max-w-md mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mb-4 text-outline">
        <span className="material-symbols-outlined text-[32px]" aria-hidden="true">
          {icon}
        </span>
      </div>

      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
        {title}
      </h3>

      <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="secondary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
