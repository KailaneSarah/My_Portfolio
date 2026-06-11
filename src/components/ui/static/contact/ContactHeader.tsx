"use client";

import { RefObject } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ContactHeaderProps {
  line1: RefObject<HTMLSpanElement>;
  line2: RefObject<HTMLSpanElement>;
}

export function ContactHeader({ line1, line2 }: ContactHeaderProps) {
  const { t } = useLanguage();

  return (
    <>
      <span className="tag">{t.contact.tag}</span>

      <div className="contact__big">
        <span className="line">
          <span ref={line1}>{t.contact.line1}</span>
        </span>
        <span className="line">
          <span ref={line2}>{t.contact.line2}</span>
        </span>
      </div>
    </>
  );
}