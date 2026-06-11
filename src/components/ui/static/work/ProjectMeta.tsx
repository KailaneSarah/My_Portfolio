'use client';

import React from 'react';
import { BentoGrid, BentoCard } from '@/components/ui/static/work/BentoGrid';
import { useLanguage, pick } from '@/context/LanguageContext';
import type { Localized } from '@/data/projects';
import '@/styles/pages/workPage.css';

interface ProjectMetaProps {
  category: Localized<string[]>;
  year: string;
  client: string;
  type: Localized<string>;
  about: Localized<string[]>;
}

export default function ProjectMeta({
  category,
  year,
  client,
  type,
  about,
}: ProjectMetaProps) {
  const { language, t } = useLanguage();
  const localizedCategory = pick(category, language);
  const localizedType = pick(type, language);
  const localizedAbout = pick(about, language);

  const features = [
    {
      name: t.projectMeta.year,
      className: 'bento-card--sm',
      background: (
        <div className="bento-card__year-bg" aria-hidden="true">
          {year}
        </div>
      ),
      children: (
        <span className="meta-card__value">{year}</span>
      ),
    },
    {
      name: t.projectMeta.client,
      className: 'bento-card--sm',
      children: (
        <span className="meta-card__value">{client}</span>
      ),
    },
    {
      name: t.projectMeta.type,
      className: 'bento-card--sm',
      children: (
        <span className="meta-card__value">{localizedType}</span>
      ),
    },
    {
      name: t.projectMeta.about,
      className: 'bento-card--wide',
      children: (
        <div className="meta-card__value meta-card--desc-value">
          {localizedAbout.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ),
    },
    {
      name: t.projectMeta.category,
      className: 'bento-card--wide',
      children: (
        <div className="meta-tags">
          {localizedCategory.map((c) => (
            <span key={c} className="meta-tag">
              {c}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <BentoGrid>
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}