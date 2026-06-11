"use client";

import { useLanguage } from "@/context/LanguageContext";

export function AboutResume() {
  const { t } = useLanguage();

  return (
    <a
      href="/resume.pdf"
      download
      className="about__resume"
    >
      {t.about.resume}
      <span className="about__resume-icon">↓</span>
    </a>
  );
}