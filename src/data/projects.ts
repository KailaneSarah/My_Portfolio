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
    slug: "sistema-de-gestao",
    title: "Sistema de gestão de aprovação",
    heroWord: "GESTÃO",
    cover: {
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400&q=80",
      alt: "Cover do projeto Sistema de gestão de aprovação",
    },
    category: ["Web Development"],
    year: "2024",
    client: "—",
    description: "Descrição do projeto sistema de gestão de aprovação.",
    sections: [
      {
        title: "Overview",
        images: [
          { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", alt: "Sistema de gestão tela 1" },
          { src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80", alt: "Sistema de gestão tela 2" },
        ],
      },
    ],
    next: { slug: "blind-ds", title: "BlindDS", category: "Mobile Development" },
  },
  {
    slug: "blind-ds",
    title: "BlindDS ",
    heroWord: "BLINDDS",
    cover: {
      src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1400&q=80",
      alt: "Cover do projeto BlindDS",
    },
    category: ["Mobile Development"],
    year: "2024",
    client: "—",
    description: "Aplicativo mobile focado em acessibilidade para pessoas com deficiência visual.",
    sections: [
      {
        title: "Interface",
        images: [
          { src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80", alt: "BlindDS tela 1" },
          { src: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&q=80", alt: "BlindDS tela 2" },
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
      src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80",
      alt: "Cover do projeto Site Institucional APCDT",
    },
    category: ["Web Development"],
    year: "2024",
    client: "APCDT",
    description: "Site institucional desenvolvido para a APCDT com foco em acessibilidade e clareza de informação.",
    sections: [
      {
        title: "Design",
        images: [
          { src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80", alt: "Site APCDT tela 1" },
          { src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80", alt: "Site APCDT tela 2" },
        ],
      },
    ],
    next: { slug: "landing-page-animada", title: "Landing Page Animada", category: "Web Development" },
  },
  {
    slug: "landing-page-animada",
    title: "Landing Page Animada",
    heroWord: "LANDING",
    cover: {
      src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&q=80",
      alt: "Cover da Landing Page Animada",
    },
    category: ["Web Development"],
    year: "2024",
    client: "—",
    description: "Landing page com animações avançadas em GSAP e design imersivo.",
    sections: [
      {
        title: "Animações",
        images: [
          { src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80", alt: "Landing page tela 1" },
          { src: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&q=80", alt: "Landing page tela 2" },
        ],
      },
    ],
    next: { slug: "rotas-da-ibiapaba", title: "Rotas da Ibiapaba", category: "Api Development" },
  },
  {
    slug: "rotas-da-ibiapaba",
    title: "Rotas da Ibiapaba",
    heroWord: "ROTAS",
    cover: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      alt: "Cover do projeto Rotas da Ibiapaba",
    },
    category: ["Api Development"],
    year: "2024",
    client: "—",
    description: "API e plataforma de rotas turísticas da região da Ibiapaba no Ceará.",
    sections: [
      {
        title: "Overview",
        images: [
          { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80", alt: "Rotas da Ibiapaba tela 1" },
          { src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80", alt: "Rotas da Ibiapaba tela 2" },
        ],
      },
    ],
    next: { slug: "sistema-de-gestao", title: "Sistema de gestão de aprovação", category: "Web Development" },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}