import "server-only";

import type { RepositoryMetrics } from "@/lib/portfolio/types";
import { githubFailure, normalizeRepository } from "./normalize";
import type { GitHubResult } from "./types";

type FetchRepositoryInput = {
  owner: string;
  name: string;
  token: string | undefined;
  fetchImpl?: typeof fetch;
};

function retryAfterSeconds(response: Response): number | undefined {
  const value = response.headers.get("retry-after");
  if (!value) return undefined;
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : undefined;
}

export async function fetchRepository({
  owner,
  name,
  token,
  fetchImpl = fetch,
}: FetchRepositoryInput): Promise<GitHubResult<RepositoryMetrics>> {
  if (!token) return githubFailure("missing-token");

  let response: Response;
  try {
    response = await fetchImpl(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "nohint.dev",
        },
      },
    );
  } catch {
    return githubFailure("network");
  }

  if (response.status === 403 || response.status === 429) {
    return githubFailure("rate-limited", retryAfterSeconds(response));
  }
  if (response.status === 404) return githubFailure("not-found");
  if (!response.ok) return githubFailure("upstream");

  try {
    return normalizeRepository(await response.json());
  } catch {
    return githubFailure("invalid-response");
  }
}
