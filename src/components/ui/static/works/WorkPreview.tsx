"use client";

import Image from "next/image";
import { PROJECTS } from "@/data/project";

interface WorkPreviewProps {
  projects: typeof PROJECTS;
  activeIndex: number;
}

export function WorkPreview({ projects, activeIndex }: WorkPreviewProps) {
  return (
    <div className="work__preview">
      <div className="work__preview__container">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`work__preview__slide ${activeIndex === i ? "active" : ""}`}
            style={p.image ? undefined : { background: p.bg }}
          >
            {p.image ? (
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="work__preview__img"
              />
            ) : (
              <div
                className="work__preview__glow"
                style={{
                  background: `radial-gradient(circle at center, ${p.color}, transparent 70%)`,
                }}
              />
            )}
            <div className="work__preview__content">
              <p className="work__preview__title">{p.name}</p>
              <p className="work__preview__tag">{p.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}