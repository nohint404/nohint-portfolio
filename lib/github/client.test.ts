import { describe, expect, it, vi } from "vitest";
import { fetchRepository } from "./client";

describe("fetchRepository", () => {
  it("uses the honest fallback without making a request when the token is missing", async () => {
    const fetchImpl = vi.fn<typeof fetch>();

    const result = await fetchRepository({
      owner: "nohint404",
      name: "nohint-portfolio",
      token: undefined,
      fetchImpl,
    });

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("missing-token");
  });

  it.each([
    [403, "rate-limited"],
    [429, "rate-limited"],
    [404, "not-found"],
    [503, "upstream"],
  ] as const)("classifies HTTP %i as %s", async (status, reason) => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status }));

    const result = await fetchRepository({
      owner: "nohint404",
      name: "nohint-portfolio",
      token: "test-token",
      fetchImpl,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe(reason);
  });

  it("falls back when GitHub returns malformed JSON", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response("not-json", { status: 200, headers: { "content-type": "application/json" } }),
    );

    const result = await fetchRepository({
      owner: "nohint404",
      name: "nohint-portfolio",
      token: "test-token",
      fetchImpl,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("invalid-response");
  });

  it("falls back when the GitHub request fails at the network boundary", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("network down"));

    const result = await fetchRepository({
      owner: "nohint404",
      name: "nohint-portfolio",
      token: "test-token",
      fetchImpl,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("network");
  });
});
