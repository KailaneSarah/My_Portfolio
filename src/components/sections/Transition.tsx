"use client";

import { useRef } from "react";
import Crosshair from "@/components/ui/Crosshair";
import TextPressure from "@/components/ui/TextPressure";
import { SectionInner } from "@/components/layout/SectionWrapper";

export default function Transition() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[var(--c-bg)]"
    >
      <div 
        className="absolute top-0 left-0 w-full h-64 pointer-events-none z-[1]"
        style={{ background: "var(--gradient-down)" }} 
      />
      <div 
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-[1]"
        style={{ background: "var(--gradient-up)" }} 
      />

      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--c-purple), transparent 70%)" }} 
      />

      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--c-fg) 1px, transparent 1px), linear-gradient(90deg, var(--c-fg) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} 
      />

      <Crosshair containerRef={sectionRef} />

      <SectionInner className="relative z-10">
        <div className="h-[260px]">
          <TextPressure
            text="DEVELOPER"
            fontFamily="var(--font-bricolage)"
            weight
            italic
            minFontSize={20}
          />
        </div>
      </SectionInner>
    </section>
  );
}