"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { PROJECTS } from "@/data/project";

interface WorkItemProps {
  project: typeof PROJECTS[number];
  index: number;
  onEnter: (i: number) => void;
  itemsRef: React.MutableRefObject<HTMLAnchorElement[]>;
}

export function WorkItem({ project, index, onEnter, itemsRef }: WorkItemProps) {
  const elRef = useRef<HTMLAnchorElement | null>(null);
  const { onMouseMove, onMouseLeave } = useMagnetic(elRef.current);

  return (
    <Link
      href={`/work/${project.slug}`}
      ref={(el) => {
        if (el) {
          elRef.current = el;
          itemsRef.current[index] = el;
        }
      }}
      onMouseEnter={() => onEnter(index)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="work__item"
    >
      <div className="work__item__inner">
        <h3 className="work__item__name">{project.name}</h3>
        <div className="work__item__meta">
          <span className="tag tag__secondary">{project.tag}</span>
        </div>
      </div>
    </Link>
  );
}