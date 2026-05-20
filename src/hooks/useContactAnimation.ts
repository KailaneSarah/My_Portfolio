import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useContactAnimation(refs: {
  section: RefObject<HTMLDivElement>;
  line1:   RefObject<HTMLSpanElement>;
  line2:   RefObject<HTMLSpanElement>;
  email:   RefObject<HTMLAnchorElement>;
  footer:  RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: refs.section.current, start: "top 70%" },
      });

      tl.fromTo(refs.line1.current,  { y: "110%" }, { y: "0%",  duration: 0.9, ease: "power4.out" })
        .fromTo(refs.line2.current,  { y: "110%" }, { y: "0%",  duration: 0.9, ease: "power4.out" }, "-=0.7")
        .fromTo(refs.email.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .fromTo(refs.footer.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
    }, refs.section);

    return () => ctx.revert();
  }, []);
}