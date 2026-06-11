export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectSection {
  title: string;
  images: ProjectImage[];
}

export interface Project {
  slug: string;
  title: string;
  heroWord: string; // Nova propriedade para a palavra gigante
  cover: ProjectImage;
  category: string[];
  year: string;
  client: string;
  description: string;
  sections: ProjectSection[];
  next?: {
    slug: string;
    title: string;
    category: string;
  };
}

export const projects: Project[] = [
  {
    slug: "blind-ds",
    title: "BlindDS",
    heroWord: "BLINDDS",
    cover: {
      src: "/BLINDDS-HERO.svg",
      alt: "Cover do projeto BlindDS",
    },
    category: ["Mobile Development"],
    year: "2024",
    client: "—",
    description: "Estrutura de dados não deveria ser território exclusivo de quem enxerga. O BlindDS é um app Flutter que permite a pessoas com deficiência visual aprender e montar estruturas de dados de forma autônoma — com suporte nativo a leitores de tela e uma interface construída sem depender de referência visual.",
    sections: [
      {
        title: "Interface",
        images: [
          { src: "/BLINDDS-01.svg", alt: "BlindDS tela 4" },
          { src: "/BLINDDS-02.svg", alt: "BlindDS tela 1" },
          { src: "/BLINDDS-03.svg", alt: "BlindDS tela 3" },
          { src: "/BLINDDS-04.svg", alt: "BlindDS tela 2" },
          
        ],
      },
    ],
    next: { slug: "site-apcdt", title: "Site Institucional APCDT", category: "Web Development" },
  },
  {
    slug: "site-apcdt",
    title: "Site Institucional APCDT",
    heroWord: "APCDT",
    cover: {
      src: "/APCDT-HERO.svg",
      alt: "Cover do projeto Site Institucional APCDT",
    },
    category: ["Web Development"],
    year: "2024",
    client: "APCDT",
    description: "A APCDT atende pessoas com diferentes tipos de deficiência e precisava de uma presença digital à altura do trabalho que realiza. Desenvolvi o site em WordPress com seis páginas, um portal web e um sistema integrado de doações e cadastro de voluntários — com acessibilidade como prioridade desde o código até as decisões de interface.",
    sections: [
      {
        title: "Design",
        images: [
          { src: "/APCDT-01.svg", alt: "Site APCDT tela 1" },
          { src: "/APCDT-02.svg", alt: "Site APCDT tela 2" },
          { src: "/APCDT-03.svg", alt: "Site APCDT tela 3" },
        ],
      },
    ],
    next: { slug: "blind-ds", title: "BlindDS", category: "Mobile Development" },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}