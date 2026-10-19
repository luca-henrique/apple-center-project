import type { Locale, Translation } from "./types";
import ptBR from "./dictionaries/pt-br.json";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";

const dictionaries: Record<Locale, Translation> = {
  "pt-BR": ptBR,
  en: en as Translation,
  es: es as Translation,
};

export const getDictionary = (locale: Locale = "pt-BR"): Translation => {
  return dictionaries[locale] || dictionaries["pt-BR"];
};
