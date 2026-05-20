"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useWorkAnimation, useMagneticItem } from "@/hooks/useWorkAnimation";

const PROJECTS = [
  {
    id: 1,
    name: "Identidade Visual",
    tag: "Branding",
    color: "#A855F7",
    bg: "linear-gradient(135deg,#1a0d2e,#7B2FBE)",
  },
  {
    id: 2,
    name: "App Mobile",
    tag: "UX/UI Design",
    color: "#FF0090",
    bg: "linear-gradient(135deg,#1a001a,#FF0090)",
  },
  {
    id: 3,
    name: "Site Institucional",
    tag: "Development",
    color: "#E040FB",
    bg: "linear-gradient(135deg,#0d0d1a,#3B5BDB)",
  },
  {
    id: 4,
    name: "Campanha Digital",
    tag: "Illustration",
    color: "#A855F7",
    bg: "linear-gradient(135deg,#0d001a,#A855F7)",
  },
  {
    id: 5,
    name: "Editorial",
    tag: "Art Direction",
    color: "#FF0090",
    bg: "linear-gradient(135deg,#1a0014,#E040FB)",
  },
];

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);

  const section = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const items = useRef<HTMLAnchorElement[]>([]);

  useWorkAnimation({ section, header, items });

  return (
    <SectionWrapper as="div" ref={section} className="work">
     <div ref={header} className="section-header">
  <div className="section-header__left">
    <span className="tech-section__badge">Selected work</span>
    <h2 className="section-title">Projetos</h2>
  </div>
  <p className="section-description">
    Aqui vai o texto da sua descrição detalhada dos projetos ou transição.
  </p>
</div>
      

      <div className="work-grid">
        <div className="work-list">
          {PROJECTS.map((p, i) => {
            const magnetic = useMagneticItem(items.current[i]);

            return (
              <Link
                key={p.id}
                href={`/work/${p.id}`}
                ref={(el) => {
                  if (el) items.current[i] = el;
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseMove={magnetic.onMouseMove}
                onMouseLeave={magnetic.onMouseLeave}
                className="work-item"
              >
                <div className="work-item__inner">
                  <h3 className="work-item__name">{p.name}</h3>

                  <div className="work-item__meta">
                    <span className="work-item__tag">{p.tag}</span>

                    <span className="work-item__arrow">↗</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="work-preview">
          <div className="work-preview__container">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`work-preview__slide ${
                  activeIndex === i ? "active" : ""
                }`}
                style={{
                  background: p.bg,
                }}
              >
                <div
                  className="work-preview__glow"
                  style={{
                    background: `radial-gradient(circle at center, ${p.color}, transparent 70%)`,
                  }}
                />

                <div className="work-preview__content">
                  <p className="work-preview__title">{p.name}</p>

                  <p className="work-preview__tag">{p.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}