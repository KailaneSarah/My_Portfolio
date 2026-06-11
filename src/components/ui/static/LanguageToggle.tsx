"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`language-toggle__btn ${language === "en" ? "is-active" : ""}`}
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <span className="language-toggle__divider" aria-hidden="true">/</span>
      <button
        type="button"
        className={`language-toggle__btn ${language === "pt" ? "is-active" : ""}`}
        onClick={() => setLanguage("pt")}
        aria-pressed={language === "pt"}
      >
        PT
      </button>
    </div>
  );
}
