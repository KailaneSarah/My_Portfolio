"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useWorkAnimation } from "@/hooks/useWorkAnimation";
import gsap from "gsap";

const PROJECTS = [
  {
    id: 1,
    name: "Sistema de gestão de aprovação",
    tag: "Web Development",
    color: "#A855F7",
    bg: "linear-gradient(135deg,#1a0d2e,#7B2FBE)",
  },
  {
    id: 2,
    name: "BlindDS - Aplicativo de acessibilidade",
    tag: "Mobile Development",
    color: "#FF0090",
    bg: "linear-gradient(135deg,#1a001a,#FF0090)",
  },
  {
    id: 3,
    name: "Site Institucional APCDT",
    tag: "Web Development",
    color: "#E040FB",
    bg: "linear-gradient(135deg,#0d0d1a,#3B5BDB)",
  },
  {
    id: 4,
    name: "Landing Page Animada",
    tag: "Web Development",
    color: "#A855F7",
    bg: "linear-gradient(135deg,#0d001a,#A855F7)",
  },
  {
    id: 5,
    name: "Rotas da Ibiapaba",
    tag: "Api Development",
    color: "#FF0090",
    bg: "linear-gradient(135deg,#1a0014,#E040FB)",
  },
];

// Efeito magnético direto — sem hook dentro de map
function useMagnetic(el: HTMLAnchorElement | null) {
  const onMouseMove = (e: React.MouseEvent) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - rect.left - rect.width  / 2) * 0.02,
      y: (e.clientY - rect.top  - rect.height / 2) * 0.02,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onMouseLeave = () => {
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
  };

  return { onMouseMove, onMouseLeave };
}

function WorkItem({
  project,
  index,
  onEnter,
  itemsRef,
}: {
  project: typeof PROJECTS[0];
  index: number;
  onEnter: (i: number) => void;
  itemsRef: React.MutableRefObject<HTMLAnchorElement[]>;
}) {
  const elRef = useRef<HTMLAnchorElement | null>(null);
  const { onMouseMove, onMouseLeave } = useMagnetic(elRef.current);

  return (
    <Link
      href={`/work/${project.id}`}
      ref={(el) => {
        if (el) {
          elRef.current = el;
          itemsRef.current[index] = el;
        }
      }}
      onMouseEnter={() => onEnter(index)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="work-item"
    >
      <div className="work-item__inner">
        <h3 className="work-item__name">{project.name}</h3>
        <div className="work-item__meta">
          <span className="work-item__tag">{project.tag}</span>
          <span className="work-item__arrow">↗</span>
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);

  const section = useRef<HTMLDivElement>(null);
  const header  = useRef<HTMLDivElement>(null);
  const items   = useRef<HTMLAnchorElement[]>([]);

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
          {PROJECTS.map((p, i) => (
            <WorkItem
              key={p.id}
              project={p}
              index={i}
              onEnter={setActiveIndex}
              itemsRef={items}
            />
          ))}
        </div>

        <div className="work-preview">
          <div className="work-preview__container">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`work-preview__slide ${activeIndex === i ? "active" : ""}`}
                style={{ background: p.bg }}
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