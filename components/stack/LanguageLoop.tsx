"use client";

import { LogoLoop } from "@/components/react-bits/LogoLoop";
import type { Locale } from "@/lib/i18n";

const languages = ["TypeScript", "JavaScript", "Rust", "Python", "Wolfram", "Lua", "CSS"];

export function LanguageLoop({ locale }: { locale: Locale }) {
  return <LogoLoop
    ariaLabel={locale === "it" ? "Linguaggi e tecnologie" : "Languages and technologies"}
    logos={languages.map((language) => ({ label: language, node: <span className="language-loop__item"><i aria-hidden="true" />{language}</span> }))}
    speed={24}
    gap={30}
    className="language-loop"
  />;
}
