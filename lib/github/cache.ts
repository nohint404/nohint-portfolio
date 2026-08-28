import "server-only";

import { unstable_cache } from "next/cache";
import { fetchRepository } from "./client";

export const getRepositoryMetrics = unstable_cache(
  async (owner: string, name: string) =>
    fetchRepository({ owner, name, token: process.env.GITHUB_TOKEN }),
  ["github-repository-metrics"],
  { revalidate: 3600, tags: ["github:repos"] },
);
