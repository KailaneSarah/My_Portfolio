"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBg from "@/components/ui/animated/ParticlesBg";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  heroWord: string;
  description: string;
  cover: { src: string; alt: string };
}

export default function ProjectHero({ heroWord, description, cover }: Props) {
  const titleRef  = useRef<HTMLHeadingElement>(null);
  const descRef   = useRef<HTMLDivElement>(null);
  const groupRef  = useRef<HTMLDivElement>(null);
  const coverWrap = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          },
        });

        tl.fromTo(groupRef.current,
          {
            top:      "35%",
            left:     "50%",
            xPercent: -50,
            yPercent: -50,
          },
          {
            top:      "100%",
            left:     isDesktop ? "2.5rem" : "1.25rem",
            xPercent: 0,
            yPercent: -130,
            ease:     "power1.inOut",
          },
          0
        );

        tl.fromTo(titleRef.current,
          {
            scale:           1,
            transformOrigin: "center center",
          },
          {
            scale:           isDesktop ? 0.25 : 0.3,
            transformOrigin: "left bottom",
            ease:            "power1.inOut",
          },
          0
        );

        tl.fromTo(descRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, color: "#ffffff", ease: "power1.inOut" },
          0.15
        );

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
        <ParticlesBg
          particleCount={300}
          particleSpread={10}
          speed={0.5}
          particleColors={["#ff0090", "#9000ff"]}
        />

        <div ref={coverWrap} className="project-hero__cover">
          <div className="project-hero__img-overlay" />
          <Image src={cover.src} alt={cover.alt} fill priority className="project-hero__img" />
        </div>

        <div className="project-hero__overlay">
          <div ref={groupRef} className="project-hero__group">
            <h1 ref={titleRef} className="project-hero__title">{heroWord}</h1>
            <div ref={descRef} className="project-hero__desc">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}