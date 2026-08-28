import { describe, expect, it } from "vitest";
import { normalizeRepository } from "./normalize";

describe("normalizeRepository", () => {
  it("turns a valid GitHub repository payload into RepositoryMetrics", () => {
    const result = normalizeRepository({
      stargazers_count: 7,
      forks_count: 2,
      language: "TypeScript",
      updated_at: "2026-08-28T12:00:00Z",
      description: "A verified repository",
      html_url: "https://github.com/nohint404/nohint-portfolio",
    });

    expect(result).toEqual({
      ok: true,
      data: {
        status: "available",
        stars: 7,
        forks: 2,
        primaryLanguage: "TypeScript",
        updatedAt: "2026-08-28T12:00:00Z",
        description: "A verified repository",
        repositoryUrl: "https://github.com/nohint404/nohint-portfolio",
      },
    });
  });

  it("rejects malformed payloads without inventing metrics", () => {
    const result = normalizeRepository({ stargazers_count: "many" });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("invalid-response");
      expect(result.fallback.stars).toBeNull();
      expect(result.fallback.status).toBe("unavailable");
    }
  });
});
