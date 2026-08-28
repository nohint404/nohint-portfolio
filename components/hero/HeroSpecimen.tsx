"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { VariableProximity } from "@/components/react-bits/VariableProximity";
import { RotatingText } from "@/components/react-bits/RotatingText";
import { ScrollReveal } from "@/components/react-bits/ScrollReveal";
import type { Copy, Locale } from "@/lib/i18n";

export function HeroSpecimen({ content, locale }: { content: Copy["hero"]; locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return <section ref={ref} className="hero-specimen site-frame" aria-labelledby="hero-title">
    <div className="hero-specimen__grid" aria-hidden="true" />
    <motion.div initial={false} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="hero-specimen__halo" aria-hidden="true" />
    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="hero-specimen__topline">
      <p className="folio-caption">nohint.dev / personal archive</p>
      <p className="hero-specimen__signal"><span aria-hidden="true" />open source / online</p>
    </motion.div>
    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
      <h1 id="hero-title" className="hero-specimen__title" translate="no">
      <VariableProximity label={content.title} containerRef={ref} disabled={Boolean(reduceMotion)} fromFontVariationSettings="'wght' 470" toFontVariationSettings="'wght' 760" className="hero-specimen__word" />
      </h1>
      <p className="hero-specimen__title-echo">{locale === "it" ? "costruisco per / " : "built for / "}<RotatingText texts={locale === "it" ? ["il web", "i sistemi", "il tooling"] : ["the web", "systems", "tooling"]} auto={!reduceMotion} /></p>
    </motion.div>
    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="hero-specimen__bottom">
      <p className="hero-specimen__line">{content.line}</p>
      <ScrollReveal text={content.body} className="hero-specimen__copy" />
      <div className="hero-specimen__actions">
        <a className="button-ink" href="#work"><span>{content.work}</span><span className="button-ink__glyph" aria-hidden="true">↘</span></a>
        <a className="text-link" href="https://github.com/nohint404" target="_blank" rel="noreferrer">{content.github}<span aria-hidden="true">↗</span></a>
      </div>
    </motion.div>
    <p className="hero-specimen__alphabet" aria-label={content.specimen}>{content.specimen}</p>
  </section>;
}
