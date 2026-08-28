import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import { copy, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const italian = locale === "it";
  return {
    title: { default: "nohint404 — Software Developer", template: "%s — nohint404" },
    description: italian ? "Portfolio personale di nohint404. Progetti, stack e codice sorgente." : "Personal portfolio of nohint404. Projects, stack and source code.",
    alternates: { canonical: `/${locale}`, languages: { en: "/en", it: "/it" } },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SiteShell locale={locale} content={copy[locale]}>{children}</SiteShell>;
}
