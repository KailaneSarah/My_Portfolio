import { RefObject, useEffect } from "react";
import gsap from "gsap";

export function useHeroAnimation(refs: {
  eyebrow: RefObject<HTMLSpanElement>;
  line1:   RefObject<HTMLSpanElement>;
  line2:   RefObject<HTMLSpanElement>;
  desc:    RefObject<HTMLSpanElement>;
  cta:     RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(refs.eyebrow.current,
      { y: "110%", opacity: 0 },
      { y: "0%",   opacity: 1, duration: 0.7, ease: "power3.out" }
    )
    .fromTo(refs.line1.current,
      { y: "110%" }, { y: "0%", duration: 0.9, ease: "power4.out" }, "-=0.4"
    )
    .fromTo(refs.line2.current,
      { y: "110%" }, { y: "0%", duration: 0.9, ease: "power4.out" }, "-=0.75"
    )
    .fromTo(refs.desc.current,
      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5"
    )
    .fromTo(refs.cta.current,
      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5"
    );

    const play = () => tl.play();
    window.addEventListener("loaderDone", play);
    const fallback = setTimeout(play, 500);

    return () => {
      window.removeEventListener("loaderDone", play);
      clearTimeout(fallback);
      tl.kill();
    };
  }, []);
}