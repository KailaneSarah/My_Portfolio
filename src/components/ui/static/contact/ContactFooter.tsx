import { RefObject } from "react";

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn",  href: "https://linkedin.com"  },
  { name: "Behance",   href: "https://behance.net"   },
];

interface ContactFooterProps {
  footerRef: RefObject<HTMLDivElement>;
}

export function ContactFooter({ footerRef }: ContactFooterProps) {
  return (
    <div ref={footerRef} className="contact__footer">
      <span className="contact__footer-copy">
        © {new Date().getFullYear()} Kailane Sarah — Todos os direitos reservados
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