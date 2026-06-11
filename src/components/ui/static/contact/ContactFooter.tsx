"use client";

import { RefObject } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/kailane.sarah/"    },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/kailane-sarah/"  },
  { name: "GitHub",    href: "https://github.com/KailaneSarah"             },
];

interface ContactFooterProps {
  footerRef: RefObject<HTMLDivElement>;
}

export function ContactFooter({ footerRef }: ContactFooterProps) {
  const { t } = useLanguage();

  return (
    <div ref={footerRef} className="contact__footer">
      <span className="contact__footer-copy">
        © {new Date().getFullYear()} Kailane Sarah — {t.contact.footerCopy}
      </span>

      <div className="contact__footer-links">
        {SOCIALS.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="contact__footer-social"
          > 
            {name}
          </a>
        ))}
      </div>
    </div>
  );
}