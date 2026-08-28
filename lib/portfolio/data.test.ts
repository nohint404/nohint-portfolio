import { describe, expect, it } from "vitest";
import { orderProjects } from "./data";
import type { Project } from "./types";

const project = (slug: string, featured: boolean, order: number): Project => ({
  title: slug,
  slug,
  summary: `${slug} summary`,
  narrative: `${slug} narrative`,
  stack: [],
  featured,
  order,
  status: "building",
  repository: { owner: "nohint404", name: slug },
  links: { source: `https://github.com/nohint404/${slug}` },
});

describe("orderProjects", () => {
  it("puts featured work first and preserves editorial order within each group", () => {
    const result = orderProjects([
      project("regular", false, 1),
      project("featured-later", true, 2),
      project("featured-first", true, 1),
    ]);

    expect(result.map(({ slug }) => slug)).toEqual([
      "featured-first",
      "featured-later",
      "regular",
    ]);
  });
});
