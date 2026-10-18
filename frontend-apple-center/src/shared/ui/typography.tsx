import React, { type ElementType, type ReactNode } from "react";

export type TypographyVariant =
  | "title"
  | "page-title"
  | "subtitle"
  | "page-subtitle"
  | "heading"
  | "body"
  | "caption";

interface TypographyProps {
  variant?: TypographyVariant;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}

const VARIANT_MAP: Record<TypographyVariant, { defaultTag: ElementType; classes: string }> = {
  title: {
    defaultTag: "h1",
    classes: "font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md font-bold text-on-surface tracking-tight mb-1",
  },
  "page-title": {
    defaultTag: "h1",
    classes: "text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-1",
  },
  subtitle: {
    defaultTag: "p",
    classes: "font-body-sm text-body-sm text-on-surface-variant",
  },
  "page-subtitle": {
    defaultTag: "p",
    classes: "text-sm text-on-surface-variant",
  },
  heading: {
    defaultTag: "h2",
    classes: "font-title-lg text-title-lg font-semibold text-on-surface",
  },
  body: {
    defaultTag: "p",
    classes: "font-body-md text-body-md text-on-surface",
  },
  caption: {
    defaultTag: "span",
    classes: "font-label-sm text-label-sm text-on-surface-variant",
  },
};

export function Typography({
  variant = "body",
  as,
  children,
  className = "",
  id,
}: TypographyProps) {
  const config = VARIANT_MAP[variant] || VARIANT_MAP.body;
  const Tag = as || config.defaultTag;

  return (
    <Tag id={id} className={`${config.classes} ${className}`}>
      {children}
    </Tag>
  );
}
