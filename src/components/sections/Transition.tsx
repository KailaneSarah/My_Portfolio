"use client";

import { useRef } from "react";
import Crosshair from "@/components/ui/animated/Crosshair";
import TextPressure from "@/components/ui/animated/TextPressure";
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
          fontFamily="var(--font-primary)"
          weight
          italic
          alpha
          minFontSize={60}
          gradient={{
            from: "#ec4899",
            to:   "#7c3aed",
            stops: [
              { offset: "0%",   color: "#ec4899" },
              { offset: "25%",  color: "#fc84d8" },
              { offset: "35%",  color: "#c084fc" },
              { offset: "65%",  color: "#a855f7" },
              { offset: "100%", color: "#7c3aed" },
            ],
          }}
        />
      </div>

    </section>
  );
}