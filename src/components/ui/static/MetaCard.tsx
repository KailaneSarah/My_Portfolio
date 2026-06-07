'use client';

import React from 'react';
import { useMetaCard } from '@/hooks/useMetaCard';
import { GLOW_COLOR } from '@/styles/projectMeta.styles.css';

interface MetaCardProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

const GLOW_DEFAULTS = {
  '--glow-x': '50%',
  '--glow-y': '50%',
  '--glow-intensity': '0',
} as React.CSSProperties;

export function MetaCard({ label, className = '', children }: MetaCardProps) {
  const ref = useMetaCard({ glowColor: GLOW_COLOR });

  return (
    <div
      ref={ref}
      className={`meta-card ${className}`.trim()}
      style={GLOW_DEFAULTS}
    >
      <span className="meta-card__label">{label}</span>
      <div className="meta-card__value">{children}</div>
    </div>
  );
}