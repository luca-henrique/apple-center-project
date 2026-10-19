"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import type { Locale, Translation } from "@/shared/config/i18n";
import { getDictionary, DEFAULT_LOCALE } from "@/shared/config/i18n";

interface I18nContextType {
  locale: Locale;
  t: Translation;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getClientSnapshot(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const val = localStorage.getItem("preferred_locale") as Locale;
  return val === "pt-BR" || val === "en" || val === "es" ? val : DEFAULT_LOCALE;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const t = getDictionary(locale);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem("preferred_locale", newLocale);
    document.documentElement.lang = newLocale;
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: DEFAULT_LOCALE,
      t: getDictionary(DEFAULT_LOCALE),
      setLocale: () => {},
    };
  }
  return context;
}
