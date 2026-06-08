import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectRef {
  slug: string;
  title: string;
  category: string;
}

interface Props {
  prev?: ProjectRef;
  next?: ProjectRef;
}

export default function ProjectNext({ prev, next }: Props) {
  return (
    <div className="project-next">

      {prev && (
        <Link href={`/work/${prev.slug}`} className="project-next__item project-next__item--prev">
          <span className="project-next__label">
            <span className="project-next__icon">
              <ArrowLeft strokeWidth={2} />
            </span>
            Previous project
          </span>
          <span className="project-next__title">{prev.title}</span>
          <span className="tag tag__secondary project-next__category">{prev.category}</span>
        </Link>
      )}

      {prev && next && <div className="project-next__divider" />}

      {next && (
        <Link href={`/work/${next.slug}`} className="project-next__item project-next__item--next">
          <span className="project-next__label">
            Next project
            <span className="project-next__icon">
              <ArrowRight strokeWidth={2} />
            </span>
          </span>
          <span className="project-next__title">{next.title}</span>
          <span className="tag tag__secondary project-next__category">{next.category}</span>
        </Link>
      )}

    </div>
  );
}