"use client";

import { RefObject } from "react";
import { SKILLS } from "@/data/about";
import { useLanguage } from "@/context/LanguageContext";

interface AboutSkillsProps {
  skillsRef: RefObject<HTMLDivElement>;
}

export function AboutSkills({ skillsRef }: AboutSkillsProps) {
  const { language } = useLanguage();

  return (
    <div ref={skillsRef} className="about__skills">
      {SKILLS[language].map((skill) => (
        <span key={skill} className="tag tag__secondary">
          {skill}
        </span>
      ))}
    </div>
  );
}