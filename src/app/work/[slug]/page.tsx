import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import Navbar from "@/components/layout/Navbar";
import ProjectHero from "@/components/ui/static/work/ProjectHero";
import ProjectMeta from "@/components/ui/static/work/ProjectMeta";
import ProjectSection from "@/components/ui/static/work/ProjectSection";
import ProjectNext from "@/components/ui/static/work/ProjectNext";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import "@/styles/pages/workPage.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.title.en} — Kailane Sarah`,
    description: project.description.en,
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="work-page">
        <ProjectHero
          heroWord={project.heroWord}
          description={project.description}
          cover={project.cover}
          coverMobile={project.coverMobile}
        />

        <SectionWrapper as="div" className="about" innerClassName="work__inner">
          <div className="work-page__body">
            <ProjectMeta
              category={project.category}
              year={project.year}
              client={project.client}
              type={project.type}
              about={project.about}
            />

            {project.sections.map((section) => (
              <ProjectSection
                key={section.title}
                title={section.title}
                images={section.images}
              />
            ))}
          </div>

          {project.next && <ProjectNext next={project.next} />}
        </SectionWrapper>
      </main>
    </>
  );
}