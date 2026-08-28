import { ProjectFeature } from "@/components/project-feature";
import { SignalPanel } from "@/components/signal-panel";
import { getPortfolio } from "@/lib/portfolio/data";
import Link from "next/link";

export default async function HomePage() {
  const portfolio = await getPortfolio();

  return (
    <main id="main-content">
      <section aria-labelledby="hero-title" className="site-frame py-16 sm:py-20 lg:py-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="pb-2">
            <p className="instrument-label flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-signal" />
              Public engineering / build log 001
            </p>
            <h1
              id="hero-title"
              className="balanced-heading mt-7 max-w-3xl font-display text-[clamp(3.5rem,11vw,7.75rem)] leading-[0.83] font-semibold tracking-[-0.045em]"
            >
              Engineering,
              <br />
              <span className="text-signal">no hints.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              A public engineering record built around inspectable source, deliberate systems,
              and evidence that survives the interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
              <a href="#work" className="link-line text-sm font-semibold">
                Inspect selected work <span aria-hidden="true">↓</span>
              </a>
              <a
                href="https://github.com/nohint404"
                target="_blank"
                rel="noreferrer"
                className="link-line text-sm text-muted-foreground"
              >
                GitHub profile <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <SignalPanel />
        </div>
      </section>

      <section id="work" aria-labelledby="work-title" className="section-rule scroll-mt-8 py-16 sm:py-20 lg:py-28">
        <div className="site-frame">
          <div className="mb-10 grid gap-4 sm:mb-14 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="instrument-label">Selected work / verified</p>
              <h2 id="work-title" className="balanced-heading mt-4 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                One build, fully exposed.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-7 text-muted-foreground lg:justify-self-end">
              Featured work receives space for the decisions, boundaries, and live repository
              signal that make it credible. No invented case studies.
            </p>
          </div>
          <div className="grid gap-6">
            {portfolio.projects.map((project) => (
              <ProjectFeature key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" aria-labelledby="about-title" className="section-rule py-16 sm:py-20 lg:py-28">
        <div className="site-frame grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="instrument-label">Operating principle</p>
            <h2 id="about-title" className="balanced-heading mt-4 max-w-sm text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Evidence over claims.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {[
              ["01", "Typed boundaries", "External data is normalized before it reaches the interface."],
              ["02", "Graceful failure", "The portfolio remains complete when GitHub does not respond."],
              ["03", "Release gates", "Tests, browser checks, and production review precede deployment."],
            ].map(([index, title, description]) => (
              <article key={index} className="bg-card p-6 sm:p-7">
                <p className="instrument-label text-signal">{index}</p>
                <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="next-title" className="section-rule scroll-mt-8 py-16 sm:py-20 lg:py-24">
        <div className="site-frame flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="instrument-label">Contact / public channel</p>
            <h2 id="next-title" className="balanced-heading mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Start with the work. Continue on GitHub.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Project context and contact stay on the same public, inspectable engineering record.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/labs" className="link-line shrink-0 text-sm text-muted-foreground">
              Open Labs <span aria-hidden="true">→</span>
            </Link>
            <a
              href="https://github.com/nohint404"
              target="_blank"
              rel="noreferrer"
              className="link-line shrink-0 text-sm font-semibold"
            >
              Contact on GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
