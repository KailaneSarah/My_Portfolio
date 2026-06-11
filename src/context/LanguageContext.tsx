"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Translations } from "@/data/translations";

export type Language = "en" | "pt";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "en" || saved === "pt") {
      setLanguageState(saved);
      document.documentElement.lang = saved === "pt" ? "pt-BR" : "en";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  };

  const toggleLanguage = () => setLanguage(language === "en" ? "pt" : "en");

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

export function pick<T>(value: { en: T; pt: T }, language: Language): T {
  return value[language];
}
