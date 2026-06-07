'use client';

import React from 'react';
import { MetaCard } from '@/components/ui/static/MetaCard';
import { projectMetaStyles, GLOW_COLOR } from '@/styles/projectMeta.styles.css';

interface ProjectMetaProps {
  category: string[];
  year: string;
  client: string;
  description: string;
}

const GLOW_DEFAULTS = {
  '--glow-x': '50%',
  '--glow-y': '50%',
  '--glow-intensity': '0',
} as React.CSSProperties;

export default function ProjectMeta({
  category,
  year,
  client,
  description,
}: ProjectMetaProps) {
  return (
    <>
      <style>{projectMetaStyles}</style>

      <div className="project-meta-bento">
        <MetaCard label="Year">{year}</MetaCard>

        <MetaCard label="Client">{client}</MetaCard>

        <MetaCard label="Type">Case Study</MetaCard>

        <div
          className="meta-card meta-card--desc"
          style={GLOW_DEFAULTS}
        >
          <span className="meta-card__label">About</span>
          <div className="meta-card__value">{description}</div>
        </div>

        <MetaCard label="Category" className="meta-card--tags">
          <div className="meta-tags">
            {category.map((c) => (
              <span key={c} className="meta-tag">
                {c}
              </span>
            ))}
          </div>
        </MetaCard>
      </div>
    </>
  );
}
