import Image from "next/image";
import Link from "next/link";
import { getPortfolio } from "@/lib/portfolio/data";
import { HeroProduct } from "@/components/hero/HeroProduct";
import { WorkSection } from "@/components/work/WorkSection";

export default async function HomePage() {
  const portfolio = await getPortfolio();
  const featured = portfolio.projects.filter((p) => p.featured);
  const rest = portfolio.projects.filter((p) => !p.featured);

  return (
    <main id="main-content">
      <HeroProduct />

      <WorkSection featured={featured} rest={rest} />

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
