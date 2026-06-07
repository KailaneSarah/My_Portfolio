"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
  gradient?: {
    from: string;
    to: string;
    stops?: { offset: string; color: string }[];
  };
}

export default function TextPressure({
  text = "CREATE",
  fontFamily = "var(--font-primary)",
  width = false,
  weight = true,
  italic = false,
  alpha = true,
  flex = false,
  stroke = false,
  scale = false,
  textColor = "var(--c-fg)",
  strokeColor = "var(--c-fg)",
  strokeWidth = 2,
  className = "",
  minFontSize = 20,
  gradient,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const svgTextRef   = useRef<SVGTextElement>(null);
  const spansRef     = useRef<(HTMLSpanElement | SVGTSpanElement | null)[]>([]);
  const mouse        = useRef({ x: 0, y: 0 });
  const cursor       = useRef({ x: 0, y: 0 });

  const [fontSize,  setFontSize]  = useState(minFontSize);
  const [scaleY,    setScaleY]    = useState(1);
  const [lineHeight,setLineHeight]= useState(1);
  const [svgHeight, setSvgHeight] = useState(minFontSize * 1.2);

  const chars = useMemo(() => text.split(""), [text]);

  const gradientStops = useMemo(() => {
    if (!gradient) return [];
    if (gradient.stops) return gradient.stops;
    return [
      { offset: "0%",   color: gradient.from },
      { offset: "100%", color: gradient.to   },
    ];
  }, [gradient]);

  const dist = (
    a: { x: number; y: number },
    b: { x: number; y: number }
  ) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const setSize = () => {
    if (!containerRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    let newFontSize = (containerW * 10.0) / chars.length;
    newFontSize = Math.max(minFontSize, Math.min(newFontSize, 210));

    setFontSize(newFontSize);
    setSvgHeight(newFontSize * 1.2);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .stroke span {
        position: relative;
        color: ${textColor};
      }
      .stroke span::after {
        content: attr(data-char);
        position: absolute;
        left: 0; top: 0;
        color: transparent;
        z-index: -1;
        -webkit-text-stroke-width: ${strokeWidth}px;
        -webkit-text-stroke-color: ${strokeColor};
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, [strokeColor, strokeWidth, textColor]);

  useEffect(() => {
    setSize();

    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", setSize);

    let rafId = 0;

    const animate = () => {
      mouse.current.x += (cursor.current.x - mouse.current.x) / 15;
      mouse.current.y += (cursor.current.y - mouse.current.y) / 15;

      const activeRef = gradient ? svgTextRef.current : titleRef.current;

      if (activeRef) {
        const titleRect = activeRef.getBoundingClientRect();
        const maxDist   = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect       = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width  / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouse.current, charCenter);

          const getAttr = (distance: number, minVal: number, maxVal: number) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          const wdth     = width  ? Math.floor(getAttr(d, 5, 200))  : 100;
          const wght     = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
          const italVal  = italic ? getAttr(d, 0, 1).toFixed(2)      : "0";
          const alphaVal = alpha
            ? isTouchDevice ? "1" : getAttr(d, 0.05, 1).toFixed(2)
            : "1";

          const el = span as SVGTSpanElement & HTMLElement;
          el.style.opacity = alphaVal;
          el.style.fontVariationSettings = `
            'wght' ${isTouchDevice ? 400 : wght},
            'wdth' ${isTouchDevice ? 100 : wdth},
            'ital' ${isTouchDevice ? "0"  : italVal}
          `;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setSize);
    };
  }, [alpha, chars.length, gradient, italic, scale, weight, width]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      {gradient ? (
        <svg
          width="100%"
          height={svgHeight}
          overflow="visible"
          style={{ display: "block" }}
        >
          <defs>
            <linearGradient id="tp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {gradientStops.map((stop, i) => (
                <stop key={i} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          <text
            ref={svgTextRef}
            x="50%"
            y={svgHeight * 0.85}
            textAnchor="middle"
            fill="url(#tp-gradient)"
            style={{
              fontFamily,
              fontSize,
              fontWeight:    800,
              textTransform: "uppercase",
              letterSpacing: "-0.04em",
            }}
          >
            {chars.map((char, i) => (
              <tspan
                key={i}
                ref={(el) => { spansRef.current[i] = el; }}
              >
                {char}
              </tspan>
            ))}
          </text>
        </svg>
      ) : (
        <h1
          ref={titleRef}
          className={`
            uppercase text-center will-change-transform
            ${flex ? "flex justify-between" : ""}
            ${stroke ? "stroke" : ""}
            ${className}
          `}
          style={{
            fontFamily,
            fontSize,
            lineHeight,
            transform:       `scale(1, ${scaleY})`,
            transformOrigin: "center top",
            margin:          0,
            fontWeight:      100,
            display:         "block",
            width:           "100%",
            color:           stroke ? undefined : textColor,
          }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              ref={(el) => { spansRef.current[i] = el; }}
              data-char={char}
              style={{ display: "inline" }}
            >
              {char}
            </span>
          ))}
        </h1>
      )}
    </div>
  );
}