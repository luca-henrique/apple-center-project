import type ptBR from "./dictionaries/pt-br.json";

export type Translation = typeof ptBR;
export type Locale = "pt-BR" | "en" | "es";

export interface LocaleConfig {
  code: Locale;
  label: string;
  flag: string;
}
