import Image from "next/image";
import Link from "next/link";
import { getPortfolio } from "@/lib/portfolio/data";

export default async function HomePage() {
  const portfolio = await getPortfolio();
  const featured = portfolio.projects.filter((p) => p.featured);
  const rest = portfolio.projects.filter((p) => !p.featured);

  return (
    <main id="main-content">
      {/* HERO — Apple-quality, calm, project visuals as hero */}
      <section aria-labelledby="hero-title" className="site-frame pb-10 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
          <div className="max-w-[36rem]">
            <h1
              id="hero-title"
              className="text-[42px] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-[56px] lg:text-[64px]"
              style={{ fontFamily: "var(--type-display), var(--type-sans), sans-serif" }}
            >
              <span translate="no" className="block">
                nohint404
              </span>
              <span className="mt-2 block text-[22px] font-medium leading-none tracking-[-0.02em] text-muted-foreground sm:text-[26px]">
                Developer
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-7 text-muted-foreground sm:text-[18px] sm:leading-8">
              I build fast, quiet web experiences with TypeScript and Next.js, and explore systems work in Rust and
              Python. This is my personal site — projects, stack and ways to reach me.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-all hover:bg-white active:scale-[0.98]"
              >
                View projects
              </a>
              <a
                href="https://github.com/nohint404"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-6 text-[15px] font-medium text-foreground ring-1 ring-border transition-colors hover:bg-[#232326]"
              >
                GitHub
                <span aria-hidden="true" className="ml-2 text-muted-foreground">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* Hero visual — layered real project windows, Apple product style */}
          <div className="relative lg:h-[520px]">
            <div className="relative mx-auto max-w-[560px] lg:absolute lg:inset-0">
              {/* Back card — nohint.dev */}
              <div className="absolute right-6 top-6 hidden w-[62%] overflow-hidden rounded-2xl bg-[#141416] shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:block lg:right-0 lg:top-10 lg:w-[64%]">
                <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.06] px-3">
                  <span className="size-3 rounded-full bg-white/12" />
                  <span className="size-3 rounded-full bg-white/12" />
                  <span className="size-3 rounded-full bg-white/12" />
                  <span className="ml-3 text-[11px] tracking-wide text-muted-foreground">nohint.dev</span>
                </div>
                <div className="p-5">
                  <p className="text-sm font-medium tracking-tight">nohint404</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Personal portfolio — dark, fast, accessible.</p>
                  <div className="mt-4 flex gap-1.5">
                    <span className="h-1.5 w-8 rounded-full bg-white" />
                    <span className="h-1.5 w-12 rounded-full bg-white/15" />
                    <span className="h-1.5 w-6 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>

              {/* Front card — PsyStream */}
              <div className="relative overflow-hidden rounded-[20px] bg-[#0F0F12] shadow-[0_24px_80px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
                <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.02] px-4">
                  <span className="size-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
                  <span className="size-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
                  <span className="size-3 rounded-full bg-[#28C840]" aria-hidden="true" />
                  <span className="ml-3 text-[11px] font-medium tracking-wide text-muted-foreground">PsyStream</span>
                  <span className="ml-auto hidden text-[11px] text-muted-foreground sm:block">PsyStream — Streaming</span>
                </div>
                <div className="relative aspect-[16/9.5] bg-[#0B0B0D] p-4 sm:p-5">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-3">
                      <span className="relative size-9 overflow-hidden rounded-xl bg-[#6d5cff] shadow-[0_0_20px_rgba(109,92,255,0.35)]">
                        <Image src="/projects/psystream.png" alt="" width={36} height={36} className="size-9 object-cover opacity-90" unoptimized />
                      </span>
                      <div>
                        <p className="text-sm font-semibold leading-none">PsyStream</p>
                        <p className="mt-1 text-xs text-muted-foreground">TV · Film · Anime</p>
                      </div>
                      <span className="ml-auto hidden rounded-full bg-white px-3 py-1 text-xs font-medium text-black sm:inline-flex">
                        Explore
                      </span>
                    </div>

                    <div className="mt-4 flex-1 rounded-xl bg-[#15151A] p-3 ring-1 ring-white/5">
                      <div className="flex gap-2">
                        <span className="h-6 flex-1 rounded-full bg-white text-[11px] font-medium leading-6 text-black/60 pl-3">Search series…</span>
                        <span className="hidden size-6 place-items-center rounded-full bg-white/10 text-white/60 sm:grid">⌕</span>
                      </div>
                      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
                        {[
                          "from-[#6d5cff]/30 to-[#6d5cff]/5",
                          "from-[#a78bfa]/25 to-transparent",
                          "from-white/10 to-white/5",
                          "from-[#6d5cff]/20 to-[#a78bfa]/10",
                        ].map((g, i) => (
                          <div
                            key={i}
                            className={`aspect-[2/3] rounded-lg bg-gradient-to-b ${g} ring-1 ring-white/5`}
                          />
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="h-1 w-12 rounded-full bg-white/15" />
                        <span className="h-1 w-8 rounded-full bg-white/10" />
                        <span className="ml-auto hidden text-muted-foreground sm:block">Apple TV polish · Netflix discovery</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex h-6 items-center rounded-full bg-white px-3 text-xs font-medium text-black">Play</span>
                      <span className="inline-flex h-6 items-center rounded-full bg-white/10 px-3 text-xs font-medium text-white/80">
                        Details
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">TypeScript · Astro</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 hidden text-center text-xs text-muted-foreground sm:block">
                Real project UI — PsyStream preview
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS — Apple product style: large moments, breathing room */}
      <section id="work" aria-labelledby="work-title" className="border-t border-border/60">
        <div className="site-frame py-14 sm:py-20">
          <div className="max-w-2xl">
            <h2
              id="work-title"
              className="text-[28px] font-semibold tracking-[-0.03em] sm:text-[32px]"
              style={{ fontFamily: "var(--type-display), var(--type-sans), sans-serif" }}
            >
              Selected work
            </h2>
            <p className="mt-3 text-[16px] leading-7 text-muted-foreground">
              Projects I&apos;ve shipped — web apps and experiments. Every tile links to its source.
            </p>
          </div>

          {/* Featured 1 — PsyStream large cinematic */}
          {featured[0] && (
            <article className="mt-10 overflow-hidden rounded-[24px] bg-card ring-1 ring-border">
              <div className="grid lg:grid-cols-[1.05fr_1.25fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground">Featured · 01</p>
                  <h3 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.03em] sm:text-[36px]" translate="no">
                    {featured[0].title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{featured[0].summary}</p>
                  <p className="mt-4 text-[14px] leading-6 text-muted-foreground/90">{featured[0].narrative}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured[0].stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={featured[0].links.source}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
                    >
                      GitHub <span aria-hidden="true" className="ml-1">↗</span>
                    </a>
                    {featured[0].links.live && (
                      <a
                        href={featured[0].links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-medium ring-1 ring-border"
                      >
                        Live demo
                      </a>
                    )}
                  </div>
                </div>
                <div className="relative bg-[#0A0A0C] p-4 sm:p-6 lg:p-8">
                  <div className="overflow-hidden rounded-2xl bg-[#141418] ring-1 ring-white/10">
                    <div className="flex h-8 items-center gap-1.5 border-b border-white/5 px-3">
                      <span className="size-3 rounded-full bg-white/10" />
                      <span className="size-3 rounded-full bg-white/10" />
                      <span className="size-3 rounded-full bg-white/10" />
                      <span className="ml-2 text-xs text-muted-foreground">psystream</span>
                    </div>
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#1A1A24] via-[#12121A] to-[#0B0B0F] p-5">
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex gap-3">
                          <span className="h-20 w-14 rounded-lg bg-white/10" />
                          <span className="h-20 w-14 rounded-lg bg-[#6d5cff]/20 ring-1 ring-[#6d5cff]/20" />
                          <span className="hidden h-20 w-14 rounded-lg bg-white/5 sm:block" />
                          <span className="hidden h-20 w-14 rounded-lg bg-white/5 lg:block" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Continue watching</p>
                          <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                            <div className="h-1.5 w-[38%] rounded-full bg-[#6d5cff]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Featured 2 — nohint.dev split */}
          {featured[1] && (
            <article className="mt-6 grid overflow-hidden rounded-[24px] bg-card ring-1 ring-border lg:grid-cols-[1.2fr_0.9fr]">
              <div className="relative bg-[#0A0A0C] p-6 sm:p-8">
                <div className="overflow-hidden rounded-2xl bg-[#111113] ring-1 ring-white/10">
                  <div className="aspect-[4/3] p-6">
                    <p className="font-mono text-xs tracking-wide text-muted-foreground">nohint.dev</p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.03em]">nohint404</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Personal developer portfolio — this site.</p>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <span className="h-16 rounded-xl bg-white text-xs font-medium leading-[4rem] text-black text-center">Work</span>
                      <span className="h-16 rounded-xl bg-white/5 ring-1 ring-white/10" />
                      <span className="h-16 rounded-xl bg-white/5 ring-1 ring-white/10" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="text-xs font-medium tracking-wide text-muted-foreground">Featured · 02</p>
                <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.03em]" translate="no">
                  {featured[1].title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{featured[1].summary}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{featured[1].narrative}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featured[1].stack.map((t) => (
                    <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  <a
                    href={featured[1].links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
                  >
                    GitHub
                  </a>
                  <a href={featured[1].links.live} className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-medium ring-1 ring-border">
                    Live
                  </a>
                </div>
              </div>
            </article>
          )}

          {/* Rest — calm grid, not card hell */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((project) => (
              <a
                key={project.slug}
                href={project.links.source}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col rounded-2xl bg-card p-6 ring-1 ring-border transition-all hover:bg-[#151517] hover:ring-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold tracking-[-0.015em]" translate="no">
                    {project.title}
                  </h3>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border">
                    {project.stack[0]}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  Source <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://github.com/nohint404?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-6 text-sm font-medium ring-1 ring-border hover:bg-[#232326]"
            >
              View all repositories
            </a>
          </div>
        </div>
      </section>

      {/* STACK — Apple-like grouped typography */}
      <section aria-labelledby="stack-title" className="border-t border-border/60">
        <div className="site-frame py-12 sm:py-16">
          <h2 id="stack-title" className="text-[22px] font-semibold tracking-[-0.02em]">
            Stack
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.capabilities.map((c) => (
              <div key={c.name}>
                <h3 className="text-sm font-semibold">{c.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — with real avatar */}
      <section id="about" aria-labelledby="about-title" className="border-t border-border/60">
        <div className="site-frame grid gap-10 py-12 sm:py-16 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="relative size-[92px] overflow-hidden rounded-[22px] bg-card ring-1 ring-border sm:size-[112px]">
            <Image
              src="/avatar.jpg"
              alt="nohint404"
              width={112}
              height={112}
              className="size-full object-cover"
              unoptimized
            />
          </div>
          <div className="max-w-2xl">
            <h2 id="about-title" className="text-[22px] font-semibold tracking-[-0.02em]">
              About
            </h2>
            <p className="mt-3 text-[16px] leading-7 text-muted-foreground">
              I&apos;m <span translate="no">nohint404</span> — a developer focused on the web, with interests in systems and tooling.
              I enjoy building interfaces that feel calm and fast, and exploring languages from TypeScript to Rust.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              This site is intentionally small: real projects, real source, no invented clients or metrics.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT — simple */}
      <section id="contact" aria-labelledby="contact-title" className="border-t border-border/60">
        <div className="site-frame flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
          <div>
            <h2 id="contact-title" className="text-[22px] font-semibold tracking-[-0.02em]">
              Contact
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Fastest way is GitHub — open an issue or follow along.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/nohint404"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
            >
              GitHub — nohint404 <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            <Link
              href="/labs"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-6 text-sm font-medium ring-1 ring-border"
            >
              Labs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
