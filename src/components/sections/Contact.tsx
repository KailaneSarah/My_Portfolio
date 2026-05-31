"use client";

import { useRef } from "react";
import { SectionInner } from "@/components/layout/SectionWrapper";
import { useContactAnimation } from "@/hooks/useContactAnimation";
import ParticlesBg from "@/components/ui/ParticlesBg";

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
        <ParticlesBg
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleColors={["#ff0090", "#9000ff"]}
          particleBaseSize={200}
          sizeRandomness={1}
          cameraDistance={10}
        />
      </div>

      <SectionInner className="contact__inner">
        <div className="contact__content">
          <span className="tech-section__badge">Contact</span>

          <div className="contact__big">
            <span className="line">
              <span ref={line1}>Vamos</span>
            </span>
            <span className="line">
              <span ref={line2}>trabalhar.</span> 
            </span>
          </div>

          <a ref={email} href="mailto:kailaneSarah.developer@email.com" className="contact__email">
            Entre em contato por: kailaneSarah.developer@email.com
            <span>↗</span>
          </a>
        </div>

        <div ref={footer} className="contact__footer">
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
      </SectionInner>

    </section>
  );
}