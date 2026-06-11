"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage, pick } from "@/context/LanguageContext";
import type { Localized } from "@/data/projects";

interface ProjectRef {
  slug: string;
  title: Localized<string>;
  category: Localized<string>;
}

interface Props {
  prev?: ProjectRef;
  next?: ProjectRef;
}

export default function ProjectNext({ prev, next }: Props) {
  const { language, t } = useLanguage();

  return (
    <div className="project-next">

      {prev && (
        <Link href={`/work/${prev.slug}`} className="project-next__item project-next__item--prev">
          <span className="project-next__label">
            <span className="project-next__icon">
              <ArrowLeft strokeWidth={2} />
            </span>
            {t.projectNext.previous}
          </span>
          <span className="project-next__title">{pick(prev.title, language)}</span>
          <span className="tag tag__secondary project-next__category">{pick(prev.category, language)}</span>
        </Link>
      )}

      {prev && next && <div className="project-next__divider" />}

      {next && (
        <Link href={`/work/${next.slug}`} className="project-next__item project-next__item--next">
          <span className="project-next__label">
            {t.projectNext.next}
            <span className="project-next__icon">
              <ArrowRight strokeWidth={2} />
            </span>
          </span>
          <span className="project-next__title">{pick(next.title, language)}</span>
          <span className="tag tag__secondary project-next__category">{pick(next.category, language)}</span>
        </Link>
      )}

    </div>
  );
}