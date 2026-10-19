"use client";

import { useState, useRef, useEffect } from "react";
import { LOCALES } from "@/shared/config/i18n";
import { useI18n } from "@/shared/lib/i18n";

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentConfig = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
        className="min-w-11 min-h-11 px-2.5 py-1.5 rounded-full flex items-center justify-center gap-1.5 text-on-surface hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer text-label-sm font-semibold select-none border border-outline-variant/20"
      >
        <span className="text-[16px]" aria-hidden="true">
          {currentConfig.flag}
        </span>
        <span className="text-[11px] uppercase tracking-wider">{currentConfig.code.slice(0, 2)}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 w-36 py-1.5 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/15 flex flex-col animate-in fade-in zoom-in-95 duration-150"
        >
          {LOCALES.map((item) => {
            const isSelected = item.code === locale;
            return (
              <button
                key={item.code}
                type="button"
                role="menuitem"
                onClick={() => {
                  setLocale(item.code);
                  setIsOpen(false);
                }}
                className={`min-h-11 px-3 py-2 text-left flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer text-body-sm font-medium ${
                  isSelected ? "text-primary font-bold bg-primary/5" : "text-on-surface"
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
