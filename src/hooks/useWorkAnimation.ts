import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWorkAnimation(refs: {
  section: RefObject<HTMLDivElement>;
  header:  RefObject<HTMLDivElement>;
  items:   RefObject<HTMLAnchorElement[]>;
}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(refs.header.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: refs.header.current,
            start: "top 85%",
          },
        }
      );

      if (!refs.items.current?.length) return;

      gsap.fromTo(refs.items.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {                                    // ← estava faltando
            trigger: refs.items.current[0] ?? refs.section.current,
            start: "top 85%",
          },
        }
      );
    }, refs.section);

    return () => ctx.revert();
  }, []);
}

export function useMagneticItem(el: HTMLAnchorElement) {
  return {
    onMouseMove: (e: React.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - rect.left - rect.width  / 2) * 0.02,
        y: (e.clientY - rect.top  - rect.height / 2) * 0.02,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    onMouseLeave: () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
    },
  };
}