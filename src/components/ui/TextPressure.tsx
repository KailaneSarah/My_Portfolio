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
  fontUrl?: string;
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
}

export default function TextPressure({
  text = "CREATE",

  // Fonte do projeto
  fontFamily = "var(--font-bricolage)",
  fontUrl = "",

  // Mantém animações
  width = false,
  weight = true,
  italic = false,
  alpha = true,
  flex = false,
  stroke = false,
  scale = false,

  textColor = "var(--c-fg)",
  strokeColor = "var(--c-purple)",

  strokeWidth = 2,
  className = "",
  minFontSize = 20,
}: TextPressureProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const titleRef =
    useRef<HTMLHeadingElement>(null);

  const spansRef = useRef<
    (HTMLSpanElement | null)[]
  >([]);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const cursor = useRef({
    x: 0,
    y: 0,
  });

  const [fontSize, setFontSize] =
    useState(minFontSize);

  const [scaleY, setScaleY] =
    useState(1);

  const [lineHeight, setLineHeight] =
    useState(1);

  const chars = useMemo(
    () => text.split(""),
    [text]
  );

  const dist = (
    a: { x: number; y: number },
    b: { x: number; y: number }
  ) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;

    return Math.sqrt(dx * dx + dy * dy);
  };

  const setSize = () => {
    if (
      !containerRef.current ||
      !titleRef.current
    )
      return;

    const {
      width: containerW,
      height: containerH,
    } =
      containerRef.current.getBoundingClientRect();

    let newFontSize =
      containerW * 10.0 / chars.length;

    newFontSize = Math.max(
      minFontSize,
      Math.min(newFontSize, 210)
    );

    setFontSize(newFontSize);

    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;

      const textRect =
        titleRef.current.getBoundingClientRect();

      if (
        scale &&
        textRect.height > 0
      ) {
        const yRatio =
          containerH / textRect.height;

        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  };

  useEffect(() => {
    const style =
      document.createElement("style");

    style.innerHTML = `
      .stroke span {
        position: relative;
        color: ${textColor};
      }

      .stroke span::after {
        content: attr(data-char);
        position: absolute;
        left: 0;
        top: 0;
        color: transparent;
        z-index: -1;

        -webkit-text-stroke-width: ${strokeWidth}px;
        -webkit-text-stroke-color: ${strokeColor};
      }
    `;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [
    strokeColor,
    strokeWidth,
    textColor,
  ]);

  useEffect(() => {
    setSize();

    const handleMouseMove = (
      e: MouseEvent
    ) => {
      cursor.current.x = e.clientX;

      cursor.current.y = e.clientY;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "resize",
      setSize
    );

    let rafId = 0;

    const animate = () => {
      mouse.current.x +=
        (cursor.current.x -
          mouse.current.x) /
        15;

      mouse.current.y +=
        (cursor.current.y -
          mouse.current.y) /
        15;

      if (titleRef.current) {
        const titleRect =
          titleRef.current.getBoundingClientRect();

        const maxDist =
          titleRect.width / 2;

        spansRef.current.forEach(
          (span) => {
            if (!span) return;

            const rect =
              span.getBoundingClientRect();

            const charCenter = {
              x:
                rect.x +
                rect.width / 2,

              y:
                rect.y +
                rect.height / 2,
            };

            const d = dist(
              mouse.current,
              charCenter
            );

            const getAttr = (
              distance: number,
              minVal: number,
              maxVal: number
            ) => {
              const val =
                maxVal -
                Math.abs(
                  (maxVal * distance) /
                    maxDist
                );

              return Math.max(
                minVal,
                val + minVal
              );
            };

            const wdth = width
              ? Math.floor(
                  getAttr(d, 5, 200)
                )
              : 100;

            const wght = weight
              ? Math.floor(
                  getAttr(d, 100, 900)
                )
              : 400;

            const italVal = italic
              ? getAttr(d, 0, 1).toFixed(2)
              : "0";

            const alphaVal = alpha
              ? getAttr(d, 0, 1).toFixed(2)
              : "1";

            span.style.opacity =
              alphaVal;

            span.style.fontVariationSettings = `
              'wght' ${wght},
              'wdth' ${wdth},
              'ital' ${italVal}
            `;
          }
        );
      }

      rafId =
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        setSize
      );
    };
  }, [
    alpha,
    chars.length,
    italic,
    scale,
    weight,
    width,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
    >
      <h1
        ref={titleRef}
        className={`
          uppercase
          text-center
          will-change-transform
          ${flex ? "flex justify-between" : ""}
          ${stroke ? "stroke" : ""}
          ${className}
        `}
        style={{
          fontFamily,
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin:
            "center top",
          margin: 0,
          fontWeight: 100,
          color: stroke
            ? undefined
            : textColor,
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}