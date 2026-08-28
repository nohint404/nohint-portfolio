import Image from "next/image";
import type { Metadata } from "next";
import { HeroSpecimen } from "@/components/hero/HeroSpecimen";
import { ProjectArchive } from "@/components/portfolio/ProjectArchive";
import { ScrollReveal } from "@/components/react-bits/ScrollReveal";
import { copy, isLocale } from "@/lib/i18n";
import { getPortfolio } from "@/lib/portfolio/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "it" ? "nohint404 — Sviluppatore software" : "nohint404 — Software Developer" };
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: incoming } = await params;
  const locale = isLocale(incoming) ? incoming : "en";
  const content = copy[locale];
  const portfolio = await getPortfolio(locale);
  return <main id="main-content">
    <HeroSpecimen content={content.hero} />
    <ProjectArchive projects={portfolio.projects} content={content.work} />
    <section id="stack" className="alphabet-section site-frame" aria-labelledby="stack-title">
      <div><h2 id="stack-title">{content.stack.title}</h2><ScrollReveal text={content.stack.body} className="alphabet-section__copy" /></div>
      <dl>{portfolio.capabilities.map((capability) => <div key={capability.name}><dt>{capability.name}</dt><dd>{capability.description}</dd></div>)}</dl>
    </section>
    <section id="about" className="profile-section site-frame" aria-labelledby="about-title">
      <div className="profile-section__portrait"><Image src="/avatar.jpg" alt="nohint404" width={144} height={144} unoptimized /></div>
      <div><h2 id="about-title">{content.about.title}</h2><p className="profile-section__body">{content.about.body}</p><p className="profile-section__note">{content.about.note}</p></div>
    </section>
    <section id="contact" className="contact-section site-frame" aria-labelledby="contact-title"><div><h2 id="contact-title">{content.contact.title}</h2><p>{content.contact.body}</p></div><a className="button-ink" href="https://github.com/nohint404" target="_blank" rel="noreferrer">{content.contact.github}<span aria-hidden="true">↗</span></a></section>
  </main>;
}
