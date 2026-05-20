import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseAboutAnimationProps {
  section: RefObject<HTMLDivElement | null>;
  words:   RefObject<HTMLSpanElement[]>;
  body:    RefObject<HTMLDivElement | null>;
  skills:  RefObject<HTMLDivElement | null>;
  card?:   RefObject<HTMLDivElement | null>;
}

export function useAboutAnimation({
  section,
  words,
  body,
  skills,
  card,
}: UseAboutAnimationProps) {
  useEffect(() => {
    const ctx = gsap.context(() => {

      if (words.current!.length > 0) {
        gsap.fromTo(
          words.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (card?.current) {
        gsap.fromTo(
          card.current,
          {
            opacity: 0,
            y: 80,
            scale: 0.92,
            rotateY: -8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (body.current) {
        gsap.fromTo(
          body.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card?.current ?? body.current,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (skills.current) {
        const skillItems = skills.current.querySelectorAll(".about__skill");
        gsap.fromTo(
          skillItems,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card?.current ?? skills.current,
              start: "top 55%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [section, words, body, skills, card]);
}
