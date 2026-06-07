"use client";

import { gsap } from "gsap";
import {
  RefObject,
  useEffect,
  useRef,
} from "react";

interface CrosshairProps {
  color?: string;
  containerRef?: RefObject<HTMLElement | null>;
}

export default function Crosshair({
  color = "var(--c-violet)",
  containerRef,
}: CrosshairProps) {
  const lineHorizontalRef =
    useRef<HTMLDivElement>(null);

  const lineVerticalRef =
    useRef<HTMLDivElement>(null);

  const filterXRef =
    useRef<SVGFETurbulenceElement>(null);

  const filterYRef =
    useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const container =
      containerRef?.current || null;

    const target: HTMLElement | Window =
      container || window;

    const lerp = (
      a: number,
      b: number,
      n: number
    ) => (1 - n) * a + n * b;

    const getMousePos = (
      e: MouseEvent
    ) => {
      if (container) {
        const bounds =
          container.getBoundingClientRect();

        return {
          x: e.clientX - bounds.left,
          y: e.clientY - bounds.top,
        };
      }

      return {
        x: e.clientX,
        y: e.clientY,
      };
    };

    let mouse = { x: 0, y: 0 };

    let animationId = 0;

    const renderedStyles = {
      tx: {
        previous: 0,
        current: 0,
        amt: 0.15,
      },

      ty: {
        previous: 0,
        current: 0,
        amt: 0.15,
      },
    };

    gsap.set(
      [
        lineHorizontalRef.current,
        lineVerticalRef.current,
      ],
      {
        opacity: 0,
      }
    );

    const primitiveValues = {
      turbulence: 0,
    };

    gsap.timeline({
      paused: true,

      onStart: () => {
        if (
          lineHorizontalRef.current &&
          lineVerticalRef.current
        ) {
          lineHorizontalRef.current.style.filter =
            "url(#filter-noise-x)";

          lineVerticalRef.current.style.filter =
            "url(#filter-noise-y)";
        }
      },

      onUpdate: () => {
        if (
          filterXRef.current &&
          filterYRef.current
        ) {
          filterXRef.current.setAttribute(
            "baseFrequency",
            primitiveValues.turbulence.toString()
          );

          filterYRef.current.setAttribute(
            "baseFrequency",
            primitiveValues.turbulence.toString()
          );
        }
      },

      onComplete: () => {
        if (
          lineHorizontalRef.current &&
          lineVerticalRef.current
        ) {
          lineHorizontalRef.current.style.filter =
            "none";

          lineVerticalRef.current.style.filter =
            "none";
        }
      },
    }).to(primitiveValues, {
      duration: 0.5,
      ease: "power1",
      startAt: { turbulence: 1 },
      turbulence: 0,
    });

    const handleMouseMove = (
      event: Event
    ) => {
      const e = event as MouseEvent;

      mouse = getMousePos(e);

      if (container) {
        const bounds =
          container.getBoundingClientRect();

        const inside =
          e.clientX >= bounds.left &&
          e.clientX <= bounds.right &&
          e.clientY >= bounds.top &&
          e.clientY <= bounds.bottom;

        gsap.to(
          [
            lineHorizontalRef.current,
            lineVerticalRef.current,
          ],
          {
            opacity: inside ? 1 : 0,
            duration: 0.2,
          }
        );
      }
    };

    const render = () => {
      renderedStyles.tx.current = mouse.x;

      renderedStyles.ty.current = mouse.y;

      for (const key in renderedStyles) {
        const style =
          renderedStyles[
            key as keyof typeof renderedStyles
          ];

        style.previous = lerp(
          style.previous,
          style.current,
          style.amt
        );
      }

      gsap.set(lineVerticalRef.current, {
        x: renderedStyles.tx.previous,
      });

      gsap.set(lineHorizontalRef.current, {
        y: renderedStyles.ty.previous,
      });

      animationId =
        requestAnimationFrame(render);
    };

    render();

    target.addEventListener(
      "mousemove",
      handleMouseMove as EventListener
    );

    return () => {
      target.removeEventListener(
        "mousemove",
        handleMouseMove as EventListener
      );

      cancelAnimationFrame(animationId);
    };
  }, [containerRef]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="absolute w-full h-full">
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              ref={filterXRef}
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
            />

            <feDisplacementMap
              in="SourceGraphic"
              scale="40"
            />
          </filter>

          <filter id="filter-noise-y">
            <feTurbulence
              ref={filterYRef}
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
            />

            <feDisplacementMap
              in="SourceGraphic"
              scale="40"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={lineHorizontalRef}
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: color,
          opacity: 0,
          mixBlendMode: "difference",
        }}
      />

      <div
        ref={lineVerticalRef}
        className="absolute top-0 left-0 h-full w-px"
        style={{
          background: color,
          opacity: 0,
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}