"use client";

import { useRef } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useAboutAnimation } from "@/hooks/useAboutAnimation";
import ProfileCard from "@/components/ui/ProfileCard";

const SKILLS = [
  "Branding",
  "UX/UI Design",
  "Web Development",
  "Motion",
  "Art Direction",
  "Typography",
  "React / Next.js",
  "Figma",
  "GSAP",
];

const TAGLINE =
  "Transformo ideias complexas em experiências digitais que as pessoas adoram usar.";

export default function About() {
  const section = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLSpanElement[]>([]);
  const body = useRef<HTMLDivElement>(null);
  const skills = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useAboutAnimation({ section, words, body, skills, card });

  return (
    <SectionWrapper as="div" className="about" innerClassName="about__inner">
      <div className="about__grid">

        <div ref={card} className="about__card-wrapper">
          <ProfileCard
            name="Sarah"
            title="Designer & Developer"
            handle="sarahdev"
            status="Available" 
            contactText="Contato"
            avatarUrl="https://i.pravatar.cc/1000"
            iconUrl="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
            grainUrl="https://www.transparenttextures.com/patterns/asfalt-dark.png"
            showUserInfo
            showBehindGradient
            enableTilt
            onContactClick={() => {
              document
                .querySelector(".contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>

        <div className="about__side">
          <span className="tech-section__badge">
          Stack & Ferramentas
        </span>
          <h2 className="about__tagline">
            {TAGLINE.split(" ").map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) words.current[i] = el;
                }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h2>

          <div ref={body} className="about__body">
            <p>
              Sou designer e desenvolvedor com foco em criar interfaces que
              equilibram estética refinada e experiências funcionais.
            </p>
            <p>
              Acredito que o bom design é invisível — ele guia as pessoas
              naturalmente, sem esforço. Cada detalhe importa, desde a
              tipografia até o timing das animações.
            </p>
          </div>

          <div ref={skills} className="about__skills">
            {SKILLS.map((skill) => (
              <span key={skill} className="about__skill">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}