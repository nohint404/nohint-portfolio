import { z } from "zod";
import type { RepositoryMetrics } from "@/lib/portfolio/types";
import type { GitHubFailureReason, GitHubResult } from "./types";

const repositorySchema = z.object({
  stargazers_count: z.number().int().nonnegative(),
  forks_count: z.number().int().nonnegative(),
  language: z.string().nullable(),
  updated_at: z.iso.datetime(),
  description: z.string().nullable(),
  html_url: z.url(),
});

export function unavailableRepositoryMetrics(): RepositoryMetrics {
  return {
    status: "unavailable",
    stars: null,
    forks: null,
    primaryLanguage: null,
    updatedAt: null,
    description: null,
    repositoryUrl: null,
  };
}

export function githubFailure(
  reason: GitHubFailureReason,
  retryAfter?: number,
): GitHubResult<RepositoryMetrics> {
  return {
    ok: false,
    reason,
    fallback: unavailableRepositoryMetrics(),
    ...(retryAfter === undefined ? {} : { retryAfter }),
  };
}

export function normalizeRepository(payload: unknown): GitHubResult<RepositoryMetrics> {
  const parsed = repositorySchema.safeParse(payload);

  if (!parsed.success) return githubFailure("invalid-response");

  return {
    ok: true,
    data: {
      status: "available",
      stars: parsed.data.stargazers_count,
      forks: parsed.data.forks_count,
      primaryLanguage: parsed.data.language,
      updatedAt: parsed.data.updated_at,
      description: parsed.data.description,
      repositoryUrl: parsed.data.html_url,
    },
  };
}
