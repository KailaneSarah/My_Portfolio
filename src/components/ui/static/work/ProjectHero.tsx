"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBg from "@/components/ui/animated/ParticlesBg";
import { useLanguage, pick } from "@/context/LanguageContext";
import type { Localized, ProjectImage } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  heroWord: string;
  description: Localized<string>;
  cover: ProjectImage;
  coverMobile: ProjectImage;
}

export default function ProjectHero({ heroWord, description, cover, coverMobile }: Props) {
  const { language } = useLanguage();
  const titleRef  = useRef<HTMLHeadingElement>(null);
  const descRef   = useRef<HTMLDivElement>(null);
  const groupRef  = useRef<HTMLDivElement>(null);
  const coverWrap = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // animação de entrada do título (independente do scroll)
    gsap.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.2 }
    );

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile:  "(max-width: 768px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top top",
            end:   "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              if (self.progress > 0.5) {
                groupRef.current?.classList.add("is-docked");
              } else {
                groupRef.current?.classList.remove("is-docked");
              }
            },
          },
        });

        // move o grupo do centro para o canto inferior esquerdo.
        // Usa apenas x/y/xPercent/yPercent (transform), nunca top/left —
        // misturar propriedades de layout (%) com xPercent/yPercent no
        // mesmo tween faz o GSAP duplicar o deslocamento de centralização
        // em algumas larguras, jogando o grupo para fora da tela.
        tl.fromTo(groupRef.current,
          {
            x:        "50vw",
            y:        "35vh",
            xPercent: -50,
            yPercent: -50,
          },
          {
            x:        isDesktop ? "2.5rem" : "1.25rem",
            y:        "100vh",
            xPercent: 0,
            yPercent: -130,
            ease:     "power1.inOut",
          },
          0
        );

        // escala o título — âncora muda de centro para esquerda
        tl.fromTo(titleRef.current,
          {
            scale:           1,
            transformOrigin: "center bottom",
          },
          {
            scale:           isDesktop ? 0.25 : 0.90,
            transformOrigin: "left bottom",
            ease:            "power1.inOut",
          },
          0
        );

        // fade-in da descrição durante o scroll
        tl.fromTo(descRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, ease: "power1.inOut" },
          0.15
        );

        // expande a imagem de cover
        tl.fromTo(coverWrap.current,
          { clipPath: "inset(30% 20% 30% 20% round 24px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" },
          0
        );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={scrollRef} className="project-hero__scroll">
      <div className="project-hero__sticky">
        <div className="project-hero__particles">
          <ParticlesBg
            particleCount={300}
            particleSpread={10}
            speed={0.5}
            particleColors={["#ff0090", "#9000ff"]}
          />
        </div>

        <div ref={coverWrap} className="project-hero__cover">
          <div className="project-hero__img-overlay" />
          <Image
            src={cover.src}
            alt={pick(cover.alt, language)}
            fill
            priority
            className="project-hero__img project-hero__img--desktop"
          />
          <Image
            src={coverMobile.src}
            alt={pick(coverMobile.alt, language)}
            fill
            priority
            className="project-hero__img project-hero__img--mobile"
          />
        </div>

        <div className="project-hero__overlay">
          <div ref={groupRef} className="project-hero__group">
            <h1 ref={titleRef} className="project-hero__title">
              {heroWord}
            </h1>
            <div ref={descRef} className="project-hero__desc">
              <p>{pick(description, language)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}