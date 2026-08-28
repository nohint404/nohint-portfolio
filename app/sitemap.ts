import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://nohint.dev", changeFrequency: "monthly", priority: 1 },
    { url: "https://nohint.dev/labs", changeFrequency: "monthly", priority: 0.6 },
  ];
}
