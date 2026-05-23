"use client";

import { useRef } from "react";
import Antigravity from "@/components/ui/Antigravity";
import { SectionInner } from "@/components/layout/SectionWrapper";
import { useContactAnimation } from "@/hooks/useContactAnimation";

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn",  href: "https://linkedin.com"  },
  { name: "Behance",   href: "https://behance.net"   },
];

export default function Contact() {
  const section = useRef<HTMLDivElement>(null);
  const line1   = useRef<HTMLSpanElement>(null);
  const line2   = useRef<HTMLSpanElement>(null);
  const email   = useRef<HTMLAnchorElement>(null);
  const footer  = useRef<HTMLDivElement>(null);

  useContactAnimation({ section, line1, line2, email, footer });

  return (
    <section ref={section} className="contact">

      <div className="contact__bg">
        <Antigravity
          count={300}
          magnetRadius={10}
          ringRadius={10}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={2}
          lerpSpeed={0.1}
          color="#ff0090"
          particleShape="capsule"
          pulseSpeed={3}
          fieldStrength={10}
        />
      </div>

      {/* Conteúdo centralizado com max-width */}
      <SectionInner className="contact__inner">
        <div className="contact__content">
          <span className="tech-section__badge">Contact</span>

          <div className="contact__big">
            <span className="line">
              <span ref={line1}>Vamos</span>
            </span>
            <span className="line">
              <span ref={line2} className="stroke-text">trabalhar.</span>
            </span>
          </div>

          <a ref={email} href="mailto:contato@email.com" className="contact__email">
            Entre em contato por: kailaneSarah.developer@email.com
            <span>↗</span>
          </a>
        </div>

        <div ref={footer} className="contact__footer">
          <span className="contact__footer-copy">
            © {new Date().getFullYear()} Seu Nome — Todos os direitos reservados
          </span>

          <div className="contact__footer-links">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="contact__footer-social"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </SectionInner>

    </section>
  );
}