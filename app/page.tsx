import { getPortfolio } from "@/lib/portfolio/data";
import Link from "next/link";

export default async function HomePage() {
  const portfolio = await getPortfolio();
  const featured = portfolio.projects.filter((p) => p.featured);
  const rest = portfolio.projects.filter((p) => !p.featured);

  return (
    <main id="main-content">
      <section aria-labelledby="hero-title" className="site-frame py-16 sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <h1
              id="hero-title"
              className="balanced-heading font-display text-[clamp(3rem,9vw,6rem)] leading-[0.9] font-semibold tracking-[-0.045em]"
            >
              <span translate="no" className="block">
                nohint404
              </span>
              <span className="mt-3 block max-w-xl text-lg font-normal leading-7 tracking-[-0.015em] text-muted-foreground sm:text-xl sm:leading-8">
                Software Developer
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Building for the web with TypeScript, React and Next.js — with a
              curiosity for Rust, Python and the tools around them. I like
              quiet, fast interfaces and code that&apos;s easy to read.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-signal-soft"
              >
                View projects
              </a>
              <a
                href="https://github.com/nohint404"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-medium transition-colors hover:border-signal/40 hover:bg-accent"
              >
                GitHub
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 border-t border-border pt-6 text-sm">
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">6</span> projects on GitHub
              </span>
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">TypeScript</span> · Rust · Python
              </span>
              <a
                href="https://github.com/nohint404"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
              >
                github.com/nohint404
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[4/3] bg-[radial-gradient(ellipse_at_top,_rgba(226,162,74,0.16),transparent_60%),linear-gradient(180deg,_rgba(255,255,255,0.04),transparent)] p-7 sm:p-8">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
                      Available for work
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
                      <span className="font-mono text-xs text-signal">Open</span>
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl" translate="no">
                      n<span className="text-signal">.</span>
                    </p>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                      Portfolio lives at{" "}
                      <span translate="no" className="text-foreground">
                        nohint.dev
                      </span>{" "}
                      — dark, fast, and fully responsive.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 font-mono text-[0.68rem] tracking-[0.08em] text-muted-foreground uppercase">
                    <span className="rounded-md border border-border bg-background px-2.5 py-1.5">Next.js 16</span>
                    <span className="rounded-md border border-border bg-background px-2.5 py-1.5">TypeScript</span>
                    <span className="rounded-md border border-border bg-background px-2.5 py-1.5">Vercel</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border bg-surface px-5 py-4 sm:px-6">
                <span className="text-sm font-medium">View selected work</span>
                <a href="#work" aria-label="Scroll to projects" className="inline-flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-[0.68rem] tracking-[0.1em] text-muted-foreground uppercase">
              Premium dark · fully responsive · accessible
            </p>
          </div>
        </div>
      </section>

      <section id="work" aria-labelledby="work-title" className="section-rule scroll-mt-8 py-16 sm:py-20">
        <div className="site-frame">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="work-title" className="balanced-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Selected work
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                A few things I&apos;ve built — from web apps to experiments in other languages.
              </p>
            </div>
            <a
              href="https://github.com/nohint404?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
            >
              All repositories <span aria-hidden="true" className="ml-1">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featured.map((project) => {
              const stars = project.metrics?.stars ?? null;
              const lang = project.metrics?.primaryLanguage ?? project.stack[0] ?? null;
              return (
                <article
                  key={project.slug}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-signal/25"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent),radial-gradient(ellipse_at_top_left,rgba(226,162,74,0.18),transparent_55%)]">
                    <div className="absolute inset-0 p-6 sm:p-7">
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
                            {project.stack[0]} · {project.status}
                          </span>
                          {stars !== null && (
                            <span className="font-mono text-xs text-muted-foreground">★ {stars}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl" translate="no">
                            {project.title}
                          </h3>
                          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{project.summary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-sm leading-6 text-muted-foreground">{project.narrative}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((t) => (
                        <li key={t} className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.7rem] tracking-[0.06em] text-muted-foreground">
                          {t}
                        </li>
                      ))}
                      {lang && !project.stack.includes(lang) && (
                        <li className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.7rem] tracking-[0.06em] text-muted-foreground">
                          {lang}
                        </li>
                      )}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <a
                        href={project.links.source}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center text-sm font-semibold hover:text-signal-soft"
                      >
                        GitHub <span aria-hidden="true" className="ml-1">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      {project.links.live && (
                        <a href={project.links.live} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                          Live <span aria-hidden="true" className="ml-1">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((project) => {
              const stars = project.metrics?.stars;
              return (
                <article
                  key={project.slug}
                  className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-signal/20 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold leading-tight tracking-[-0.015em]" translate="no">
                      {project.title}
                    </h3>
                    {typeof stars === "number" && <span className="shrink-0 font-mono text-xs text-muted-foreground">★ {stars}</span>}
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                  <p className="mt-3 text-xs font-mono tracking-[0.06em] text-muted-foreground uppercase">{project.stack.join(" · ")}</p>
                  <div className="mt-5 flex flex-wrap gap-4">
                    <a href={project.links.source} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm font-medium hover:text-signal-soft">
                      Source <span aria-hidden="true" className="ml-1">↗</span>
                    </a>
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground">
                        Live <span aria-hidden="true" className="ml-1">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="stack" aria-labelledby="stack-title" className="section-rule py-16 sm:py-20">
        <div className="site-frame">
          <div className="max-w-2xl">
            <h2 id="stack-title" className="balanced-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Stack
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">The tools I reach for most often.</p>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.capabilities.map((c) => (
              <div key={c.name} className="bg-card p-6 sm:p-7">
                <h3 className="text-sm font-semibold tracking-[-0.01em]">{c.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" aria-labelledby="about-title" className="section-rule py-16 sm:py-20">
        <div className="site-frame grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 id="about-title" className="balanced-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              About
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              I&apos;m <span translate="no">nohint404</span> — a developer who enjoys building clean, fast web experiences and exploring systems work in Rust and Python.
              I care about thoughtful interfaces, good performance, and code that teammates can read without comments.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              This site is intentionally small and honest: every project links to its source, every metric comes from GitHub when available, and
              everything else stays out until it&apos;s real.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="section-rule py-16 sm:py-20">
        <div className="site-frame">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="contact-title" className="balanced-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Contact
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                The fastest way to reach me is GitHub. Open an issue, a discussion, or just follow along.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/nohint404"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-signal-soft"
              >
                GitHub — nohint404 <span aria-hidden="true" className="ml-2">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link
                href="/labs"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-5 text-sm font-medium hover:border-signal/30"
              >
                Labs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
