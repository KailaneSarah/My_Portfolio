"use client";

import { RefObject } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EMAIL = "kailanesarahpro@gmail.com";

interface ContactEmailProps {
  emailRef: RefObject<HTMLAnchorElement>;
}

export function ContactEmail({ emailRef }: ContactEmailProps) {
  const { t } = useLanguage();

  return (
    <a ref={emailRef} href={`mailto:${EMAIL}`} className="contact__email">
      {t.contact.emailPrefix} {EMAIL}
    </a>
  );
}