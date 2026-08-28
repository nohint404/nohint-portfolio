"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="site-frame pb-6 pt-10 sm:pb-10 sm:pt-14">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
        className="mx-auto max-w-[980px] text-center"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
          className="text-[12px] font-semibold tracking-[0.14em] text-[#a1a1a6] uppercase"
        >
          nohint404 — Software Developer
        </motion.p>
        <motion.h1
          id="hero-title"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
          className="mx-auto mt-4 max-w-[720px] text-[40px] font-semibold leading-[0.9] tracking-[-0.04em] sm:text-[56px] lg:text-[64px]"
          style={{ fontFamily: "var(--type-display), var(--type-sans), sans-serif" }}
        >
          <span translate="no">nohint404</span>
          <span className="block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Portfolio built like a product.</span>
        </motion.h1>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
          className="mx-auto mt-5 max-w-[640px] text-[17px] leading-7 text-muted-foreground sm:text-[19px] sm:leading-8"
        >
          Fast, quiet web experiences in TypeScript and Next.js — with curiosity for Rust and systems work. Every project links to its source.
        </motion.p>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="inline-flex min-h-11 items-center justify-center bg-primary px-7 text-[15px] font-medium text-primary-foreground transition-all hover:bg-white active:scale-[0.98]"
            style={{ borderRadius: "2px" }}
          >
            View work
          </a>
          <a
            href="https://github.com/nohint404"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center border border-border bg-secondary px-7 text-[15px] font-medium hover:bg-[#232326]"
            style={{ borderRadius: "2px" }}
          >
            GitHub
          </a>
        </motion.div>
      </motion.div>

      <motion.div style={{ scale, y, opacity }} className="mx-auto mt-10 max-w-[980px] sm:mt-14">
        <div
          className="relative overflow-hidden bg-[#0F0F12] p-2 sm:p-3 shadow-[0_24px_80px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
          style={{ borderRadius: "2px", clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" }}
        >
          <div className="overflow-hidden bg-[#080808] ring-1 ring-white/10" style={{ borderRadius: "2px" }}>
            <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4">
              <span className="size-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
              <span className="size-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
              <span className="size-3 rounded-full bg-[#28C840]" aria-hidden="true" />
              <span className="ml-3 hidden text-[12px] font-medium tracking-wide text-muted-foreground sm:block">nohint.dev — nohint404</span>
              <span className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="hidden sm:inline">⌘K</span>
                <span className="size-1.5 rounded-full bg-white/20" aria-hidden="true" />
              </span>
            </div>
            <div className="grid gap-3 bg-[#080808] p-3 sm:grid-cols-[1.15fr_0.85fr] sm:gap-3 sm:p-4">
              <div className="relative overflow-hidden bg-[#111113] p-4 ring-1 ring-white/5 sm:p-5" style={{ borderRadius: "2px" }}>
                <p className="text-xs font-medium tracking-wide text-muted-foreground">Selected work</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <span className="aspect-[3/4] bg-white" style={{ borderRadius: "2px" }} />
                  <span className="aspect-[3/4] bg-white/10 ring-1 ring-white/10" style={{ borderRadius: "2px" }} />
                  <span className="aspect-[3/4] bg-white/5 ring-1 ring-white/10 hidden sm:block" style={{ borderRadius: "2px" }} />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-2 w-16 bg-white" style={{ borderRadius: "1px" }} />
                  <span className="h-2 w-8 bg-white/15" style={{ borderRadius: "1px" }} />
                </div>
              </div>
              <div className="hidden flex-col justify-between bg-[#111113] p-4 ring-1 ring-white/5 sm:flex sm:p-5" style={{ borderRadius: "2px" }}>
                <div className="flex items-center gap-3">
                  <span className="relative size-9 overflow-hidden bg-white/10 ring-1 ring-white/10" style={{ borderRadius: "2px" }}>
                    <Image src="/avatar.jpg" alt="" width={36} height={36} className="size-9 object-cover" unoptimized />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-none">nohint404</p>
                    <p className="mt-1 text-xs text-muted-foreground">Available for work</p>
                  </div>
                </div>
                <div className="bg-[#0F0F12] p-3 ring-1 ring-white/5" style={{ borderRadius: "2px" }}>
                  <p className="text-xs leading-5 text-muted-foreground">
                    Portfolio lives at <span className="text-foreground">nohint.dev</span> — dark, fast, accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">Presented like a product — typography, whitespace and imagery do the work.</p>
      </motion.div>
    </section>
  );
}
