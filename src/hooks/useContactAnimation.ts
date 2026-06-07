import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useContactAnimation(refs: {
  section: RefObject<HTMLDivElement>;
  line1:   RefObject<HTMLSpanElement>;
  line2:   RefObject<HTMLSpanElement>;
  email:   RefObject<HTMLAnchorElement>;
}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refs.section.current,
          start: "top 70%",
          toggleActions: "play none none reset",
        },
      });

      tl.fromTo(refs.line1.current,
          { y: "110%" },
          { y: "0%", duration: 1, ease: "expo.out" }
        )
        .fromTo(refs.line2.current,
          { y: "110%" },
          { y: "0%", duration: 1.4, ease: "expo.out" },
          "-=0.5"
        )
        .fromTo(refs.email.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )

    }, refs.section);

    return () => ctx.revert();
  }, []);
}