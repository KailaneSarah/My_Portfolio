import { forwardRef, ReactNode } from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface WrapperProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div";
}

interface InnerProps {
  children: ReactNode;
  className?: string;
}

export function SectionInner({ children, className }: InnerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6", className)}>
      {children}
    </div>
  );
}

export const SectionWrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ children, className, innerClassName, as: Tag = "section" }, ref) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn("relative w-full bg-[var(--c-bg)] py-32", className)}
      >
        <SectionInner className={innerClassName}>
          {children}
        </SectionInner>
      </Tag>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";