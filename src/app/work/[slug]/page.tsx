import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import Navbar from "@/components/layout/Navbar";
import ProjectHero from "@/components/work/ProjectHero";
import ProjectMeta from "@/components/work/ProjectMeta";
import ProjectSection from "@/components/work/ProjectSection";
import ProjectNext from "@/components/work/ProjectNext";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

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
    title: `${project.title} — Kailane Sarah`,
    description: project.description,
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
        />

        <SectionWrapper as="div" className="about" innerClassName="work__inner">
        <div className="work-page__body">
          <ProjectMeta
            category={project.category}
            year={project.year}
            client={project.client}
            description={project.description}
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