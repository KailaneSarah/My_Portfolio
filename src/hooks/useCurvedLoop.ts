"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseCurvedLoopProps {
  speed: number;
  direction: "left" | "right";
  interactive: boolean;
}

export function useCurvedLoop({ speed, direction, interactive }: UseCurvedLoopProps) {
  const measureRef  = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

  const offsetRef  = useRef(0);
  const spacingRef = useRef(0);
  const dragRef    = useRef(false);
  const lastXRef   = useRef(0);
  const velRef     = useRef(0);
  const dirRef     = useRef(direction);
  const rafRef     = useRef<number>(0);

  const [ready, setReady]             = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);

  useEffect(() => {
    if (measureRef.current) {
      const length = measureRef.current.getComputedTextLength();
      if (length > 0) {
        spacingRef.current = length;
        const count = Math.ceil((1440 * 3) / length) + 4;
        setRepeatCount(count);
        setReady(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    const step = () => {
      if (!dragRef.current && textPathRef.current && spacingRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        offsetRef.current += delta;

        const w = spacingRef.current;
        if (offsetRef.current <= -w) offsetRef.current += w;
        if (offsetRef.current >= w)  offsetRef.current -= w;

        textPathRef.current.setAttribute("startOffset", offsetRef.current + "px");
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, speed]);

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [interactive]);

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    offsetRef.current += dx;
    const w = spacingRef.current;
    if (offsetRef.current <= -w) offsetRef.current += w;
    if (offsetRef.current >= w)  offsetRef.current -= w;

    textPathRef.current.setAttribute("startOffset", offsetRef.current + "px");
  }, [interactive]);

  const endDrag = useCallback(() => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  }, [interactive]);

  return {
    measureRef,
    textPathRef,
    ready,
    offsetRef,
    repeatCount,
    onPointerDown,
    onPointerMove,
    endDrag,
  };
}