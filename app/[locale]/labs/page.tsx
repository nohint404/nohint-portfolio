import type { Metadata } from "next";
import Link from "next/link";
import { copy, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "it" ? "Lab" : "Labs" };
}

export default async function LabsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: incoming } = await params;
  const locale = isLocale(incoming) ? incoming : "en";
  const content = copy[locale].labs;
  return <main id="main-content" className="labs-page site-frame"><section aria-labelledby="labs-title"><p className="folio-caption">nohint.dev / shelf</p><h1 id="labs-title">{content.title}</h1><div className="labs-page__empty"><h2>{content.label}</h2><p>{content.body}</p><Link href={`/${locale}/#work`} className="text-link">{content.back}<span aria-hidden="true">↖</span></Link></div></section></main>;
}
