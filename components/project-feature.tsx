import type { Project } from "@/lib/portfolio/types";

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const numberFormatter = new Intl.NumberFormat("en", { notation: "compact" });

function formatUpdatedAt(value: string | null) {
  if (!value) return null;
  return dateFormatter.format(new Date(value));
}

export function ProjectFeature({ project }: { project: Project }) {
  const metrics = project.metrics;
  const updatedAt = formatUpdatedAt(metrics?.updatedAt ?? null);
  const stars = metrics?.stars === null || metrics?.stars === undefined
    ? "—"
    : numberFormatter.format(metrics.stars);

  return (
    <article className="grid gap-0 overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[0.82fr_1.18fr]">
      <div className="signal-surface flex min-h-72 flex-col justify-between border-b border-border p-6 sm:p-8 lg:min-h-[34rem] lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-4">
          <span className="instrument-label">Featured / 001</span>
          <span className="instrument-label text-signal">{project.status}</span>
        </div>
        <div aria-hidden="true" className="relative my-12 h-24">
          <div className="absolute top-1/2 right-0 left-0 h-px bg-foreground/15" />
          <div className="absolute top-1/2 left-[18%] h-px w-[44%] bg-signal" />
          <div className="absolute top-[calc(50%-3px)] left-[62%] size-[7px] rotate-45 bg-signal" />
        </div>
        <div>
          <p translate="no" className="font-display text-5xl leading-none font-semibold tracking-[-0.035em] sm:text-6xl">
            nohint.dev
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            The portfolio is part of the evidence, not a wrapper around it.
          </p>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-8 lg:p-12">
        <p className="instrument-label">Production system</p>
        <h3 className="balanced-heading mt-5 max-w-xl text-3xl leading-tight font-semibold tracking-[-0.025em] sm:text-4xl">
          {project.summary}
        </h3>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
          {project.narrative}
        </p>

        <ul aria-label="Technology stack" className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <li
              key={technology}
              className="rounded-sm border border-border px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground"
            >
              {technology}
            </li>
          ))}
        </ul>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border [font-variant-numeric:tabular-nums] sm:grid-cols-4">
          <div className="bg-card p-3">
            <dt className="instrument-label">Signal</dt>
            <dd className="mt-2 text-sm">{metrics?.status === "available" ? "Live" : "Fallback"}</dd>
          </div>
          <div className="bg-card p-3">
            <dt className="instrument-label">Language</dt>
            <dd className="mt-2 text-sm">{metrics?.primaryLanguage ?? "Unavailable"}</dd>
          </div>
          <div className="bg-card p-3">
            <dt className="instrument-label">Stars</dt>
            <dd className="mt-2 text-sm">{stars}</dd>
          </div>
          <div className="bg-card p-3">
            <dt className="instrument-label">Updated</dt>
            <dd className="mt-2 text-sm">{updatedAt ?? "Unavailable"}</dd>
          </div>
        </dl>

        {metrics?.status === "unavailable" && (
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Live repository telemetry is unavailable. Project content remains intact.
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-10">
          <a className="link-line text-sm font-medium" href={project.links.source} target="_blank" rel="noreferrer">
            Inspect source <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {project.links.live && (
            <a className="link-line text-sm text-muted-foreground" href={project.links.live}>
              Open production <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
