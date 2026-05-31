"use client";

import { useId } from "react";
import { useCurvedLoop } from "@/hooks/useCurvedLoop";
import "@/styles/curvedLoop.css";

interface Word {
  text: string;
  highlight?: boolean;
}

const WORDS: Word[] = [
  { text: "DEV", highlight: true },
  { text: "}{"                   },
  { text: "DEV", highlight: true },
  { text: "}{"                   },
  { text: "DEV", highlight: true },
  { text: "}{"                   },
  { text: "DEV", highlight: true },
  { text: "}{"                   },
  { text: "DEV", highlight: true },
  { text: "}{"                   },
];

const MARQUEE_TEXT = WORDS.map((w) => w.text).join("\u00A0\u00A0");

interface CurvedLoopProps {
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  visibleOn?: "mobile" | "desktop" | "both";
}

export default function CurvedLoop({
  speed = 1.5,
  curveAmount = 400,
  direction = "left",
  interactive = true,
  visibleOn = "mobile",
}: CurvedLoopProps) {
  const id         = useId().replace(/:/g, "-");
  const pathId     = `curve-${id}`;
  const gradientId = `dev-grad-${id}`;

  const {
    measureRef,
    textPathRef,
    ready,
    offsetRef,
    repeatCount,
    onPointerDown,
    onPointerMove,
    endDrag,
  } = useCurvedLoop({ speed, direction, interactive });

  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  return (
    <div className={`curved-loop curved-loop--${visibleOn}`}>
      <svg
        className="curved-loop__svg"
        viewBox="0 0 1440 120"
        style={{
          visibility: ready ? "visible" : "hidden",
          cursor: interactive ? "grab" : "auto",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />

          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="var(--c-purple)" />
            <stop offset="100%" stopColor="var(--c-pink)"   />
          </linearGradient>
        </defs>

        <text
          ref={measureRef}
          className="curved-loop__text"
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {MARQUEE_TEXT}
        </text>
   
        {ready && repeatCount > 0 && (
          <text className="curved-loop__text" xmlSpace="preserve">
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={offsetRef.current + "px"}
              xmlSpace="preserve"
            >
              {Array(repeatCount)
                .fill(WORDS)
                .flat()
                .map((word: Word, i) => (
                  <tspan
                    key={i}
                    fill={word.highlight ? `url(#${gradientId})` : undefined}
                    className={word.highlight ? "curved-loop__word--highlight" : undefined}
                  >
                    {word.text}
                    {"\u00A0\u00A0"}
                  </tspan>
                ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}