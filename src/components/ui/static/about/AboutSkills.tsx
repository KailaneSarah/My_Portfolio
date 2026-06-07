"use client";

import { RefObject } from "react";
import { SKILLS } from "@/data/about";

interface AboutSkillsProps {
  skillsRef: RefObject<HTMLDivElement>;
}

export function AboutSkills({ skillsRef }: AboutSkillsProps) {
  return (
    <div ref={skillsRef} className="about__skills">
      {SKILLS.map((skill) => (
        <span key={skill} className="tag tag__secondary">
          {skill}
        </span>
      ))}
    </div>
  );
}