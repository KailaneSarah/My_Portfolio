'use client';

import React from 'react';
import { BentoGrid, BentoCard } from '@/components/ui/static/work/BentoGrid';
import '@/styles/pages/workPage.css';

interface ProjectMetaProps {
  category: string[];
  year: string;
  client: string;
  description: string;
}

export default function ProjectMeta({
  category,
  year,
  client,
  description,
}: ProjectMetaProps) {
  const features = [
    {
      name: 'Year',
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
      name: 'Client',
      className: 'bento-card--sm',
      children: (
        <span className="meta-card__value">{client}</span>
      ),
    },
    {
      name: 'Type',
      className: 'bento-card--sm',
      children: (
        <span className="meta-card__value">Case Study</span>
      ),
    },
    {
      name: 'About',
      className: 'bento-card--wide',
      children: (
        <div className="meta-card__value meta-card--desc-value">
          {description}
        </div>
      ),
    },
    {
      name: 'Category',
      className: 'bento-card--wide',
      children: (
        <div className="meta-tags">
          {category.map((c) => (
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