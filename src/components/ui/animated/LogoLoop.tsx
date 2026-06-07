"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  ReactNode,
} from "react";
import "@/styles/logoLoop.css";

type LogoItem =
  | {
      node: ReactNode;
      title: string;
      href?: string;
    }
  | {
      src: string;
      alt: string;
      href?: string;
    };

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
}

const LogoLoop = memo(
  ({
    logos,
    speed = 60,
    direction = "left",
    logoHeight = 48,
    gap = 28,
    pauseOnHover = true,
    fadeOut = true,
    fadeOutColor = "#0b0b0b",
    scaleOnHover = true,
    ariaLabel = "Tech logos",
  }: LogoLoopProps) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [hovered, setHovered] = useState(false);

    const velocity = useMemo(() => {
      return direction === "left" ? speed : -speed;
    }, [speed, direction]);

    useEffect(() => {
      let frame: number;
      let last = performance.now();
      let currentOffset = offset;

      const animate = (now: number) => {
        const delta = (now - last) / 1000;
        last = now;

        if (!hovered || !pauseOnHover) {
          const track = trackRef.current;
          if (track && track.children.length > 0) {
            const totalItems = track.children.length;
            const totalCopies = 4;
            const oneBlockItemsCount = totalItems / totalCopies;

            let resetPoint = 0;
            for (let i = 0; i < oneBlockItemsCount; i++) {
              const item = track.children[i] as HTMLElement;
              if (item) {
                resetPoint += item.offsetWidth + gap;
              }
            }

            currentOffset += velocity * delta;

            if (currentOffset >= resetPoint) {
              currentOffset -= resetPoint;
            }
            if (currentOffset < 0) {
              currentOffset += resetPoint;
            }

            setOffset(currentOffset);
          }
        }

        frame = requestAnimationFrame(animate);
      };

      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }, [velocity, hovered, pauseOnHover, gap, logos.length]);

    return (
      <div
        className={`logoloop ${fadeOut ? "logoloop--fade" : ""}`}
        style={
          {
            "--logoloop-gap": `${gap}px`,
            "--logoloop-logoHeight": `${logoHeight}px`,
            "--logoloop-fadeColor": fadeOutColor,
          } as React.CSSProperties
        }
        aria-label={ariaLabel}
      >
        <div
          ref={trackRef}
          className="logoloop__track"
          style={{ transform: `translateX(${-offset}px)` }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {logos.map((item: LogoItem, index) => {
            const content =
              "node" in item ? (
                <span className="logoloop__node">{item.node}</span>
              ) : (
                <img src={item.src} alt={item.alt} />
              );

            const href = "href" in item ? item.href : undefined;

            return (
              <div
                className="logoloop__item"
                key={index}
                style={{ animationDelay: `${index * 0.18}s` }}
              >
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="logoloop__link">
                    {content}
                  </a>
                ) : (
                  <div className="logoloop__link">{content}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;