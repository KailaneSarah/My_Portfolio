"use client";

import LogoLoop from "@/components/ui/LogoLoop";
import { SectionWrapper } from "../layout/SectionWrapper";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiFramer,
} from "react-icons/si";

const techLogos = [
  {
    node: <SiReact />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiNextdotjs />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiFigma />,
    title: "Figma",
  },
  {
    node: <SiFramer />,
    title: "Framer Motion",
  },
];

export default function TechLoop() {
  return (
    
      <section className="tech-section">
        <div className="tech-section__loop">
          <LogoLoop
            logos={[...techLogos, ...techLogos, ...techLogos, ...techLogos]}
            speed={70}
            direction="left"
            logoHeight={54}
            gap={28}
            pauseOnHover
            fadeOut
            fadeOutColor="var(--c-bg)"
            scaleOnHover
          />
        </div>
      </section>

  );
}