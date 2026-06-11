"use client";

import { useRef } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useWorkAnimation } from "@/hooks/useWorkAnimation";
import { PROJECTS } from "@/data/project";
import { WorkAccordion } from "@/components/ui/static/works/WorkAccordion";
import { useLanguage } from "@/context/LanguageContext";

export default function Work() {
  const { t } = useLanguage();
  const section = useRef<HTMLDivElement>(null);
  const header  = useRef<HTMLDivElement>(null);
  const items   = useRef<HTMLAnchorElement[]>([]);

  useWorkAnimation({ section, header, items });

  return (
    <SectionWrapper ref={section} className="section">

      <div ref={header} className="work-layout">
        <div className="work-layout__text">
          <span className="tag">{t.work.tag}</span>
          <h2 className="section__title">{t.work.title}</h2>
          <p className="work-layout__desc">
            {t.work.description}
          </p>
        </div>

        <div className="work-layout__gallery">
          <WorkAccordion projects={PROJECTS} />
        </div>
      </div>

    </SectionWrapper>
  );
}