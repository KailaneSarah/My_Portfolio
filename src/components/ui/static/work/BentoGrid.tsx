import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn('bento-grid', className)}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType;
  description?: string;
  children?: ReactNode;
  'data-span'?: string;
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  children,
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn('bento-card', className)}
      {...props}
    >
      {background && (
        <div className="bento-card__bg">{background}</div>
      )}

      <div className="bento-card__content">
        {Icon && (
          <Icon className="bento-card__icon" aria-hidden="true" />
        )}
        <span className="meta-card__label">{name}</span>
        {description && (
          <p className="bento-card__desc">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}