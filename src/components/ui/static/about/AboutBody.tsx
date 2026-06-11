"use client";

import { RefObject } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface AboutBodyProps {
  bodyRef: RefObject<HTMLDivElement>;
}

export function AboutBody({ bodyRef }: AboutBodyProps) {
  const { t } = useLanguage();

  return (
    <div ref={bodyRef} className="about__body">
      {t.about.body.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}