"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "it" : "en";
  const target = pathname.replace(/^\/(en|it)(?=\/|$)/, `/${other}`);
  return <a className="locale-switcher" href={target} hrefLang={other} lang={other} aria-label={other === "en" ? "Switch to English" : "Passa all’italiano"}>{other.toUpperCase()}</a>;
}
