import type { LocaleConfig, Locale } from "./types";

export * from "./types";
export * from "./get-dictionary";

export const LOCALES: LocaleConfig[] = [
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export const DEFAULT_LOCALE: Locale = "pt-BR";
