import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://nohint.dev/en", changeFrequency: "monthly", priority: 1, alternates: { languages: { en: "https://nohint.dev/en", it: "https://nohint.dev/it" } } },
    { url: "https://nohint.dev/it", changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: "https://nohint.dev/en", it: "https://nohint.dev/it" } } },
    { url: "https://nohint.dev/en/labs", changeFrequency: "monthly", priority: 0.6, alternates: { languages: { en: "https://nohint.dev/en/labs", it: "https://nohint.dev/it/labs" } } },
    { url: "https://nohint.dev/it/labs", changeFrequency: "monthly", priority: 0.5, alternates: { languages: { en: "https://nohint.dev/en/labs", it: "https://nohint.dev/it/labs" } } },
  ];
}
