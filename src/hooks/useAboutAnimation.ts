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
    const el = section.current;
    if (!el) return;

    const ctx = gsap.context(() => {

      if (words.current && words.current.length > 0) {
        gsap.fromTo(
          words.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 60%",
              toggleActions: "play none none reset",
            },
          }
        );
      }

      if (card?.current) {
        gsap.fromTo(
          card.current,
          { opacity: 0, y: 60, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card.current,
              start: "top 70%",
              toggleActions: "play none none reset",
            },
          }
        );
      }

      if (body.current) {
        gsap.fromTo(
          body.current,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: body.current,
              start: "top 75%",
              toggleActions: "play none none reset",
            },
          }
        );
      }

      if (skills.current) {
        const skillItems = skills.current.querySelectorAll(".about__skill");
        if (skillItems.length > 0) {
          gsap.fromTo(
            skillItems,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: skills.current,
                start: "top 80%",
                toggleActions: "play none none reset",
              },
            }
          );
        }
      }

    }, el); 

    return () => ctx.revert();
  }, [section, words, body, skills, card]);
}