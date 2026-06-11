"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/project";
import { useLanguage, pick } from "@/context/LanguageContext";

interface WorkAccordionProps {
  projects: typeof PROJECTS;
}

export function WorkAccordion({ projects }: WorkAccordionProps) {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      className="work-accordion"
      onMouseLeave={isDesktop ? () => setActiveIndex(0) : undefined}
    >
      {projects.map((project, index) => {
        const isActive = index === activeIndex;

        return (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className={`work-accordion__item ${isActive ? "is-active" : ""}`}
            style={project.image ? undefined : { background: project.bg }}
            onMouseEnter={isDesktop ? () => setActiveIndex(index) : undefined}
            onFocus={isDesktop ? () => setActiveIndex(index) : undefined}
            onClick={(e) => {
              if (!isActive) {
                e.preventDefault();
                setActiveIndex(index);
              }
            }}
          >
            {project.image && (
              <Image
                src={project.image}
                alt={pick(project.name, language)}
                fill
                className="work-accordion__img"
              />
            )}

            <div className="work-accordion__overlay" />

            <div className="work-accordion__content">
              <span className="tag tag__secondary work-accordion__tag">
                {pick(project.tag, language)}
              </span>
              <span className="work-accordion__title">{pick(project.name, language)}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
