import Image from "next/image";
import type { Metadata } from "next";
import { HeroSpecimen } from "@/components/hero/HeroSpecimen";
import { ProjectArchive } from "@/components/portfolio/ProjectArchive";
import { ScrollReveal } from "@/components/react-bits/ScrollReveal";
import { LanguageLoop } from "@/components/stack/LanguageLoop";
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
    <HeroSpecimen content={content.hero} locale={locale} />
    <ProjectArchive projects={portfolio.projects} content={content.work} />
    <section id="stack" className="alphabet-section site-frame" aria-labelledby="stack-title">
      <div className="alphabet-section__lead"><div className="section-label"><span>02</span><span>toolkit</span></div><h2 id="stack-title">{content.stack.title}</h2><ScrollReveal text={content.stack.body} className="alphabet-section__copy" /></div>
      <div className="alphabet-section__loop"><LanguageLoop locale={locale} /></div>
      <dl>{portfolio.capabilities.map((capability, index) => <div key={capability.name}><span aria-hidden="true">0{index + 1}</span><dt>{capability.name}</dt><dd>{capability.description}</dd></div>)}</dl>
    </section>
    <section id="about" className="profile-section site-frame" aria-labelledby="about-title">
      <div className="profile-section__portrait"><div><Image src="/avatar.jpg" alt="nohint404" width={144} height={144} priority unoptimized /></div><span>nohint404<br />/ profile</span></div>
      <div className="profile-section__copy"><div className="section-label"><span>03</span><span>profile</span></div><h2 id="about-title">{content.about.title}</h2><ScrollReveal text={content.about.body} className="profile-section__body" /><p className="profile-section__note">{content.about.note}</p></div>
    </section>
    <section id="contact" className="contact-section site-frame" aria-labelledby="contact-title"><div><div className="section-label"><span>04</span><span>contact</span></div><h2 id="contact-title">{content.contact.title}</h2><p>{content.contact.body}</p></div><a className="button-ink" href="https://github.com/nohint404" target="_blank" rel="noreferrer"><span>{content.contact.github}</span><span className="button-ink__glyph" aria-hidden="true">↗</span></a></section>
  </main>;
}
