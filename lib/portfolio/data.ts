import "server-only";

import { getRepositoryMetrics } from "@/lib/github/cache";
import type { Portfolio, Project } from "./types";

const curatedProjects: readonly Project[] = [
  {
    title: "PsyStream",
    slug: "psystream",
    summary: "The best website where you can see a tv series, film or anime.",
    narrative:
      "A TypeScript web app for discovering TV series, films and anime — built for fast browsing and clean detail views.",
    stack: ["TypeScript", "Next.js", "React"],
    featured: true,
    order: 1,
    status: "live",
    repository: { owner: "nohint404", name: "PsyStream" },
    links: {
      source: "https://github.com/nohint404/PsyStream",
    },
  },
  {
    title: "nohint.dev",
    slug: "nohint-portfolio",
    summary: "Personal developer portfolio — this site.",
    narrative:
      "A minimal, dark portfolio built with Next.js and TypeScript. Focus on projects, performance and accessibility.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    featured: true,
    order: 2,
    status: "building",
    repository: { owner: "nohint404", name: "nohint-portfolio" },
    links: {
      source: "https://github.com/nohint404/nohint-portfolio",
      live: "https://nohint.dev",
    },
  },
  {
    title: "Orvex",
    slug: "orvex",
    summary: "Rust project — source available on GitHub.",
    narrative: "Exploration in Rust. Repository on GitHub.",
    stack: ["Rust"],
    featured: false,
    order: 3,
    status: "archived",
    repository: { owner: "nohint404", name: "Orvex" },
    links: {
      source: "https://github.com/nohint404/Orvex",
    },
  },
  {
    title: "Banana-Space",
    slug: "banana-space",
    summary: "Wolfram Language project — source on GitHub.",
    narrative: "Exploration in Wolfram Language. Repository on GitHub.",
    stack: ["Wolfram Language"],
    featured: false,
    order: 4,
    status: "archived",
    repository: { owner: "nohint404", name: "Banana-Space" },
    links: {
      source: "https://github.com/nohint404/Banana-Space",
    },
  },
  {
    title: "VSCode-Debloter",
    slug: "vscode-debloter",
    summary: "Python tool for a cleaner VS Code setup.",
    narrative: "A Python utility to streamline Visual Studio Code. Source on GitHub.",
    stack: ["Python"],
    featured: false,
    order: 5,
    status: "archived",
    repository: { owner: "nohint404", name: "VSCode-Debloter" },
    links: {
      source: "https://github.com/nohint404/VSCode-Debloter",
    },
  },
  {
    title: "cdn-frontend",
    slug: "cdn-frontend",
    summary: "Frontend for a CDN — TypeScript.",
    narrative: "A TypeScript frontend for CDN workflows, deployed on Vercel.",
    stack: ["TypeScript", "React"],
    featured: false,
    order: 6,
    status: "live",
    repository: { owner: "nohint404", name: "cdn-frontend" },
    links: {
      source: "https://github.com/nohint404/cdn-frontend",
      live: "https://cdn-frontend-nu.vercel.app",
    },
  },
];

export function orderProjects(projects: readonly Project[]): Project[] {
  return [...projects].sort(
    (left, right) => Number(right.featured) - Number(left.featured) || left.order - right.order,
  );
}

export async function getPortfolio(): Promise<Portfolio> {
  const projects = await Promise.all(
    orderProjects(curatedProjects).map(async (project) => {
      const result = await getRepositoryMetrics(project.repository.owner, project.repository.name);
      return { ...project, metrics: result.ok ? result.data : result.fallback };
    }),
  );

  return {
    projects,
    experiments: [],
    capabilities: [
      { name: "Languages", description: "TypeScript · JavaScript · Rust · Python · Wolfram · Lua · CSS" },
      { name: "Frontend", description: "Next.js · React · Tailwind CSS" },
      { name: "Backend & systems", description: "Node.js · Rust tooling · Python scripts" },
      { name: "Tooling", description: "Git · GitHub · Vercel · VS Code" },
    ],
    socialLinks: [
      {
        platform: "GitHub",
        href: "https://github.com/nohint404",
        label: "View nohint404 on GitHub",
      },
    ],
  };
}
