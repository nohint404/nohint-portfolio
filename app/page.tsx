import Image from "next/image";
import Link from "next/link";
import { getPortfolio } from "@/lib/portfolio/data";
import { HeroProduct } from "@/components/hero/HeroProduct";
import { WorkSection } from "@/components/work/WorkSection";
import { LangCarousel } from "@/components/stack/LangCarousel";
import { Reveal } from "@/components/ui/Reveal";

export default async function HomePage() {
  const portfolio = await getPortfolio();
  const featured = portfolio.projects.filter((p) => p.featured);
  const rest = portfolio.projects.filter((p) => !p.featured);

  return (
    <main id="main-content">
      <HeroProduct />

      <WorkSection featured={featured} rest={rest} />

      {/* STACK — geometric + carousel */}
      <section aria-labelledby="stack-title" className="border-t border-border/60">
        <Reveal className="site-frame py-12 sm:py-16">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-5">
              <h2 id="stack-title" className="text-[22px] font-semibold tracking-[-0.02em]">
                Stack
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Languages and tools I use — marquee below.</p>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 grid gap-4 sm:grid-cols-2">
              {portfolio.capabilities.map((c, i) => (
                <div
                  key={c.name}
                  className="bg-card p-5 ring-1 ring-border"
                  style={{ borderRadius: "2px", transform: `translateX(${i % 2 === 0 ? "4px" : "-4px"})` }}
                >
                  <h3 className="text-sm font-semibold">{c.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <LangCarousel />
          </div>
        </Reveal>
      </section>

      {/* ABOUT — geometric staccato */}
      <section id="about" aria-labelledby="about-title" className="border-t border-border/60">
        <Reveal className="site-frame grid gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:gap-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="relative size-[96px] overflow-hidden bg-card ring-1 ring-border sm:size-[120px]" style={{ borderRadius: "2px", clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)" }}>
              <Image src="/avatar.jpg" alt="nohint404" width={120} height={120} className="size-full object-cover" unoptimized />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 max-w-2xl">
            <h2 id="about-title" className="text-[22px] font-semibold tracking-[-0.02em]">
              About
            </h2>
            <p className="mt-3 text-[16px] leading-7 text-muted-foreground">
              I&apos;m <span translate="no">nohint404</span> — a developer focused on the web, with interests in systems and tooling. I enjoy
              interfaces that feel calm and fast, exploring languages from TypeScript to Rust.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              This site is intentionally small: real projects, real source, no invented clients or metrics.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CONTACT — geometric */}
      <section id="contact" aria-labelledby="contact-title" className="border-t border-border/60">
        <Reveal className="site-frame grid grid-cols-12 gap-6 py-12 sm:py-16">
          <div className="col-span-12 lg:col-span-6">
            <h2 id="contact-title" className="text-[22px] font-semibold tracking-[-0.02em]">
              Contact
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Fastest way is GitHub — open an issue or follow along.</p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-wrap gap-3 lg:justify-end">
            <a
              href="https://github.com/nohint404"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center bg-primary px-6 text-sm font-medium text-primary-foreground"
              style={{ borderRadius: "2px" }}
            >
              GitHub — nohint404 <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            <Link
              href="/labs"
              className="inline-flex min-h-11 items-center justify-center border border-border bg-card px-6 text-sm font-medium"
              style={{ borderRadius: "2px" }}
            >
              Labs
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
