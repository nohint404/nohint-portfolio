import "server-only";

import { getRepositoryMetrics } from "@/lib/github/cache";
import type { Portfolio, Project } from "./types";

const curatedProjects: readonly Project[] = [
  {
    title: "nohint.dev",
    slug: "nohint-portfolio",
    summary: "The production system behind this portfolio.",
    narrative:
      "A Next.js portfolio built around server-rendered GitHub data, strict typed boundaries, accessible navigation, and a preview-to-production release gate.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    featured: true,
    order: 1,
    status: "building",
    repository: { owner: "nohint404", name: "nohint-portfolio" },
    links: {
      source: "https://github.com/nohint404/nohint-portfolio",
      live: "https://nohint.dev",
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
    capabilities: [],
    socialLinks: [
      {
        platform: "GitHub",
        href: "https://github.com/nohint404",
        label: "View nohint404 on GitHub",
      },
    ],
  };
}
