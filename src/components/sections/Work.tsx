"use client";

import { useRef, useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useWorkAnimation } from "@/hooks/useWorkAnimation";
import { PROJECTS } from "@/data/project";
import { WorkItem } from "@/components/ui/static/works/WorkItem";
import { WorkPreview } from "@/components/ui/static/works/WorkPreview";

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const section = useRef<HTMLDivElement>(null);
  const header  = useRef<HTMLDivElement>(null);
  const items   = useRef<HTMLAnchorElement[]>([]);

  useWorkAnimation({ section, header, items });

  return (
    <SectionWrapper ref={section} className="section">

      <header ref={header} className="section-header__split__grid">
        <div className="div__title">
          <span className="tag">Selected work</span>
          <h2 className="section__title">Projetos</h2>
        </div>
        <div className="div__desc">
          <p className="">
            Uma seleção de aplicações web, interfaces mobile e sistemas ponta a ponta
            desenvolvidos com foco em performance, usabilidade e design refinado.
          </p>
        </div>
      </header>

      <div className="work__grid">
        <div className="work__list">
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

        <WorkPreview projects={PROJECTS} activeIndex={activeIndex} />
      </div>

    </SectionWrapper>
  );
}