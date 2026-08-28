"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CommandPalette } from "@/components/command-palette";
import { LocaleSwitcher } from "@/components/locale-switcher";
import type { Copy, Locale } from "@/lib/i18n";

export function SiteHeader({ locale, content }: { locale: Locale; content: Copy }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const links = [
    { label: content.nav.work, href: `/${locale}/#work` },
    { label: content.nav.stack, href: `/${locale}/#stack` },
    { label: content.nav.about, href: `/${locale}/#about` },
    { label: content.nav.labs, href: `/${locale}/labs` },
  ];
  return (
    <header className="site-header">
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>
      <div className="site-header__island">
        <Link
          href={`/${locale}`}
          translate="no"
          aria-label="nohint404 home"
          className="site-wordmark"
        >
          nohint404<span aria-hidden="true">.</span>
        </Link>
        <nav aria-label="Primary navigation" className="site-header__nav">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="site-header__link"
              >
                {link.label}
              </a>
            ))}
        </nav>
        <div className="site-header__tools"><LocaleSwitcher locale={locale} /><CommandPalette locale={locale} content={content.command} /><button type="button" className="menu-button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((value) => !value)}>{open ? content.nav.close : content.nav.menu}</button></div>
      </div>
      <AnimatePresence>
        {open && <motion.div id="site-menu" initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0 round 1.5rem)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 1.5rem)" }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0 round 1.5rem)" }} transition={{ type: "spring", bounce: 0, duration: 0.42 }} className="menu-sheet">
          <nav aria-label="Expanded navigation">{links.map((link, index) => <motion.a key={link.href} href={link.href} onClick={() => setOpen(false)} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + index * 0.05, duration: 0.38 }} className="menu-sheet__link">{link.label}<span aria-hidden="true">↘</span></motion.a>)}</nav>
        </motion.div>}
      </AnimatePresence>
    </header>
  );
}
