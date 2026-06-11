"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage, pick } from "@/context/LanguageContext";
import type { ProjectImage } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  images: ProjectImage[];
}

export default function ProjectSection({ title, images }: Props) {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const getScrollAmount = () => track.scrollWidth - section.offsetWidth;

        if (getScrollAmount() <= 0) return;

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    );

    return () => mm.revert();
  }, [images]);

  return (
    <section ref={sectionRef} className="project-section">
      <h6 className="project-section__title">{title}</h6>

      {images.length > 0 && (
        <div ref={trackRef} className="project-section__track">
          {images.map((img, i) => (
            <div key={i} className="project-section__item">
              <Image
                src={img.src}
                alt={pick(img.alt, language)}
                fill
                className="project-section__img"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}