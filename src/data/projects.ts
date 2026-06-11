export interface Localized<T> {
  en: T;
  pt: T;
}

export interface ProjectImage {
  src: string;
  alt: Localized<string>;
}

export interface ProjectSection {
  title: string;
  images: ProjectImage[];
}

export interface Project {
  slug: string;
  title: Localized<string>;
  heroWord: string; // palavra gigante — sigla, igual nos dois idiomas
  cover: ProjectImage;
  coverMobile: ProjectImage;
  category: Localized<string[]>;
  year: string;
  client: string;
  type: Localized<string>;
  description: Localized<string>;
  about: Localized<string[]>;
  sections: ProjectSection[];
  next?: {
    slug: string;
    title: Localized<string>;
    category: Localized<string>;
  };
}

export const projects: Project[] = [
  {
    slug: "blind-ds",
    title: { en: "BlindDS", pt: "BlindDS" },
    heroWord: "BLINDDS",
    cover: {
      src: "/BLINDDS-HERO.svg",
      alt: { en: "BlindDS project cover", pt: "Cover do projeto BlindDS" },
    },
    coverMobile: {
      src: "/BLINDDS-HERO-MOBILE.png",
      alt: { en: "BlindDS project cover", pt: "Cover do projeto BlindDS" },
    },
    category: {
      en: ["Mobile Development", "Accessibility", "Educational Technology"],
      pt: ["Desenvolvimento Mobile", "Acessibilidade", "Tecnologia Educacional"],
    },
    year: "2026",
    client: "NUPREDS – IFCE Tianguá",
    type: { en: "PIBIT Undergraduate Research Grant", pt: "Bolsa PIBIT" },
    description: {
      en: "BlindDS is an app that lets people with visual impairments learn and build data structures on their own.",
      pt: "O BlindDS é um app que permite a pessoas com deficiência visual aprender e montar estruturas de dados de forma autônoma.",
    },
    about: {
      en: [
        "BlindDS is an educational app developed to support visually impaired students in learning Data Structures. Built with Flutter on the front-end and Django on the back-end, the project treats accessibility as a core requirement at every stage of development.",
        "The initiative emerged from the need to make a traditionally complex and abstract subject more accessible and understandable. Through interactive features and adapted exercises, the app helps students visualize and grasp the concepts, fostering greater autonomy in their learning process.",
      ],
      pt: [
        "O BlindDS é um aplicativo educacional desenvolvido para apoiar estudantes com deficiência visual no aprendizado de Estruturas de Dados. Construído com Flutter no front-end e Django no back-end, o projeto tem a acessibilidade como requisito fundamental em todas as etapas do desenvolvimento.",
        "A iniciativa surgiu da necessidade de tornar uma disciplina tradicionalmente complexa e abstrata mais acessível e compreensível. Por meio de recursos interativos e práticas adaptadas, o aplicativo auxilia os estudantes na visualização e compreensão dos conceitos, promovendo maior autonomia no processo de aprendizagem.",
      ],
    },
    sections: [
      {
        title: "Interface",
        images: [
          { src: "/BLINDDS-01.svg", alt: { en: "BlindDS screen 4", pt: "BlindDS tela 4" } },
          { src: "/BLINDDS-02.svg", alt: { en: "BlindDS screen 1", pt: "BlindDS tela 1" } },
          { src: "/BLINDDS-03.svg", alt: { en: "BlindDS screen 3", pt: "BlindDS tela 3" } },
          { src: "/BLINDDS-04.svg", alt: { en: "BlindDS screen 2", pt: "BlindDS tela 2" } },
        ],
      },
    ],
    next: {
      slug: "site-apcdt",
      title: { en: "APCDT Institutional Website", pt: "Site Institucional APCDT" },
      category: { en: "Web Development", pt: "Desenvolvimento Web" },
    },
  },
  {
    slug: "site-apcdt",
    title: { en: "APCDT Institutional Website", pt: "Site Institucional APCDT" },
    heroWord: "APCDT",
    cover: {
      src: "/APCDT-HERO.svg",
      alt: { en: "APCDT Institutional Website project cover", pt: "Cover do projeto Site Institucional APCDT" },
    },
    coverMobile: {
      src: "/APCDT-HERO-MOBILE.png",
      alt: { en: "APCDT Institutional Website project cover", pt: "Cover do projeto Site Institucional APCDT" },
    },
    category: {
      en: ["Web Development", "Accessibility", "Social Impact"],
      pt: ["Desenvolvimento Web", "Acessibilidade", "Impacto Social"],
    },
    year: "2025",
    client: "NUPREDS – Projeto de Extensão",
    type: { en: "University Extension Project", pt: "Projeto de Extensão" },
    description: {
      en: "A web platform for donations and volunteering, designed with accessibility as a priority.",
      pt: "Plataforma web para doações e voluntariado, projetada com acessibilidade como prioridade.",
    },
    about: {
      en: [
        "APCDT is an accessible web platform developed for a local non-profit organization. The project was designed as an institutional portal that brings the community closer to the NGO, providing information about its actions, activities and social impact.",
        "In addition to strengthening the institution's digital presence, the platform lets visitors make donations, sign up as volunteers and follow events and initiatives promoted by the organization. Accessibility was treated as a core requirement throughout development, ensuring a more inclusive experience for different types of users.",
      ],
      pt: [
        "A APCDT é uma plataforma web acessível desenvolvida para uma organização sem fins lucrativos da região. O projeto foi concebido como um portal institucional capaz de aproximar a comunidade da ONG, oferecendo informações sobre suas ações, atividades e impacto social.",
        "Além de fortalecer a presença digital da instituição, a plataforma permite que visitantes realizem doações, se cadastrem como voluntários e acompanhem eventos e iniciativas promovidas pela organização. A acessibilidade foi tratada como um requisito central durante todo o processo de desenvolvimento, garantindo uma experiência mais inclusiva para diferentes perfis de usuários.",
      ],
    },
    sections: [
      {
        title: "Design",
        images: [
          { src: "/APCDT-01.svg", alt: { en: "APCDT website screen 1", pt: "Site APCDT tela 1" } },
          { src: "/APCDT-02.svg", alt: { en: "APCDT website screen 2", pt: "Site APCDT tela 2" } },
          { src: "/APCDT-03.svg", alt: { en: "APCDT website screen 3", pt: "Site APCDT tela 3" } },
        ],
      },
    ],
    next: {
      slug: "blind-ds",
      title: { en: "BlindDS", pt: "BlindDS" },
      category: { en: "Mobile Development", pt: "Desenvolvimento Mobile" },
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
