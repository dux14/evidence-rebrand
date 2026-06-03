"use client";

import { createContext, useContext, useEffect, useState } from "react";
import esData from "@/content/copy.es.json";
import enData from "@/content/copy.en.json";
import type { Copy } from "@/lib/copy";

export type Locale = "es" | "en";

const DICTIONARIES: Record<Locale, Copy> = {
  es: esData as Copy,
  en: enData as Copy,
};

const STORAGE_KEY = "ev-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "es",
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  // Hydrate persisted choice after mount (SSR siempre renderiza ES).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") setLocale(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "es" ? "es-CO" : "en";
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

export function useCopy(): Copy {
  return DICTIONARIES[useContext(LocaleContext).locale];
}
