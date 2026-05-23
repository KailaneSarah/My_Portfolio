"use client";

import { useRef } from "react";
import Crosshair from "@/components/ui/Crosshair";
import TextPressure from "@/components/ui/TextPressure";
import "@/styles/transition.css";

export default function Transition() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="transition-section">

      <div className="transition-section__fade transition-section__fade--top" />
      <div className="transition-section__fade transition-section__fade--bottom" />
      <div className="transition-section__glow" />
      <div className="transition-section__grid" />

      <Crosshair containerRef={sectionRef} />

      <div className="transition-section__text">
        <TextPressure
          text="DEVELOPER"
          fontFamily="var(--font-bricolage)"
          weight
          italic
          minFontSize={60}
        />
      </div>

    </section>
  );
}