"use client";

import { useRef } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useAboutAnimation } from "@/hooks/useAboutAnimation";
import { AboutCard }    from "@/components/ui/static/about/AboutCard";
import { AboutBody }    from "@/components/ui/static/about/AboutBody";
import { AboutSkills }  from "@/components/ui/static/about/AboutSkills";
import { AboutResume }  from "@/components/ui/static/about/AboutResume";

export default function About() {
  const section = useRef<HTMLDivElement>(null);
  const words   = useRef<HTMLSpanElement[]>([]);
  const body    = useRef<HTMLDivElement>(null);
  const skills  = useRef<HTMLDivElement>(null);
  const card    = useRef<HTMLDivElement>(null);

  useAboutAnimation({ section, words, body, skills, card });

  return (
    <SectionWrapper
      ref={section}
      as="div"
      className="section about"
      innerClassName="about__inner"
    >
      <div className="about__grid">
        <AboutCard cardRef={card} />

        <div className="about__side">
          <header className="section-header">
            <span className="tag">About me</span>
            <h1 className="section__title">Design que funciona. Código que encanta.</h1>
          </header>

          <AboutBody   bodyRef={body}     />
           <AboutResume />
          <AboutSkills skillsRef={skills} />
         
        </div>
      </div>
    </SectionWrapper>
  );
}