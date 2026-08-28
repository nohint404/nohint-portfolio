export type Availability = "available" | "unavailable";

export type RepositoryMetrics = {
  status: Availability;
  stars: number | null;
  forks: number | null;
  primaryLanguage: string | null;
  updatedAt: string | null;
  description: string | null;
  repositoryUrl: string | null;
};

export type Project = {
  title: string;
  slug: string;
  summary: string;
  narrative: string;
  stack: readonly string[];
  featured: boolean;
  order: number;
  status: "building" | "live" | "archived";
  repository: { owner: string; name: string };
  links: { source: string; live?: string };
  metrics?: RepositoryMetrics;
};

export type FeaturedProject = Project & {
  featured: true;
  highlight: string;
};

export type Experiment = {
  title: string;
  slug: string;
  summary: string;
  status: "idea" | "active" | "published" | "archived";
  href?: string;
};

export type TrafficMetrics = {
  views: number;
  uniqueVisitors: number;
  clones: number;
  uniqueCloners: number;
  capturedAt: string;
};

export type AnalyticsSnapshot = {
  period: string;
  status: Availability;
};

export type Capability = {
  name: string;
  description: string;
};

export type SocialLink = {
  platform: "GitHub" | "Website";
  href: string;
  label: string;
};

export type Portfolio = {
  projects: readonly Project[];
  experiments: readonly Experiment[];
  capabilities: readonly Capability[];
  socialLinks: readonly SocialLink[];
};
