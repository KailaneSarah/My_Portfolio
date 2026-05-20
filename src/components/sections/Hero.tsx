"use client";

import { useRef } from "react";
import Aurora from "@/components/ui/Aurora";
import { SectionInner } from "@/components/layout/SectionWrapper";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

export default function Hero() {
  const eyebrow = useRef<HTMLSpanElement>(null);
  const line1   = useRef<HTMLSpanElement>(null);
  const line2   = useRef<HTMLSpanElement>(null);
  const desc    = useRef<HTMLSpanElement>(null);
  const cta     = useRef<HTMLDivElement>(null);

  useHeroAnimation({ eyebrow, line1, line2, desc, cta });

  return (
    <section className="hero">
      <Aurora
        colorStops={["#A855F7", "#e81c8c", "#db3bdb"]}
        amplitude={1.7}
        blend={1.0}
        speed={6.5}
        intensity={0.6}
      />

      <SectionInner className="hero__content">
        <div className="tech-section__badge">
          <span ref={eyebrow}>Bem-vindo(a)!</span>
        </div>

        <h1 className="hero__title">
          <span className="line"><span ref={line1}>Oi, eu sou </span></span>
          <span className="line">
            <span ref={line2}>Sarah<span className="accent">!</span></span>
          </span>
        </h1>

        <div className="hero__desc">
          <span ref={desc}>
            Desenvolvedora de software, mobile e web
            & especialista em UI, UX e acessibilidade
          </span>
        </div>

        <div ref={cta} className="hero__cta">
          <a href="#work" className="btn-primary">Ver projetos</a>
          <a href="#about" className="btn-secondary">Sobre mim</a>
        </div>
      </SectionInner>
    </section>
  );
}