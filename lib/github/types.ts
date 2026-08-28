import type { RepositoryMetrics } from "@/lib/portfolio/types";

export type GitHubFailureReason =
  | "missing-token"
  | "rate-limited"
  | "not-found"
  | "upstream"
  | "invalid-response"
  | "network";

export type GitHubResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      reason: GitHubFailureReason;
      fallback: RepositoryMetrics;
      retryAfter?: number;
    };
