"use client";

import { useRef } from "react";
import Aurora from "@/components/ui/animated/Aurora";
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
    <section className="section hero">
      
      <div className="hero__canvas-wrapper">
        <Aurora
          colorStops={["#A855F7", "#e81c8c", "#db3bdb"]}
          amplitude={1.7}
          blend={1.0}
          speed={6.5}
          intensity={0.6}
        />
      </div>

      <div className="hero__content">
        <SectionInner className="section__inner section__inner--center"> 

          <header className="section-header section-header--center"> 
            <span className="tag">
              <span ref={eyebrow}>Bem-vindo(a)!</span>
            </span>

            <h1 className="section__title hero__title">
              <span className="line">
                <span ref={line1}>Oi, eu sou </span>
              </span>
              <span className="line">
                <span ref={line2}>
                  Kailane Sarah<span className="accent">:)</span>
                </span>
              </span>
            </h1>

            <p className="section__desc hero__desc">
              <span ref={desc}>
                Fullstack developer — web, mobile e acessibilidade.
              </span>
            </p>
          </header>

          <div ref={cta} className="hero__cta">
            <a href="#work" className="btn-primary">Ver projetos</a>
            <a href="#about" className="btn-secondary">Sobre mim</a>
          </div>
          
        </SectionInner>
      </div>
    </section>
  );
}