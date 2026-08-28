"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { VariableProximity } from "@/components/react-bits/VariableProximity";
import type { Copy } from "@/lib/i18n";

export function HeroSpecimen({ content }: { content: Copy["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return <section ref={ref} className="hero-specimen site-frame" aria-labelledby="hero-title">
    <div className="hero-specimen__rule" aria-hidden="true" />
    <motion.p initial={reduceMotion ? false : { y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="folio-caption">nohint.dev / personal archive</motion.p>
    <h1 id="hero-title" className="hero-specimen__title" translate="no">
      <VariableProximity label={content.title} containerRef={ref} disabled={Boolean(reduceMotion)} fromFontVariationSettings="'wght' 470" toFontVariationSettings="'wght' 760" className="hero-specimen__word" />
    </h1>
    <div className="hero-specimen__bottom">
      <p className="hero-specimen__line">{content.line}</p>
      <p className="hero-specimen__copy">{content.body}</p>
      <div className="hero-specimen__actions">
        <a className="button-ink" href="#work">{content.work}<span aria-hidden="true">↘</span></a>
        <a className="text-link" href="https://github.com/nohint404" target="_blank" rel="noreferrer">{content.github}<span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <p className="hero-specimen__alphabet" aria-label={content.specimen}>{content.specimen}</p>
  </section>;
}
