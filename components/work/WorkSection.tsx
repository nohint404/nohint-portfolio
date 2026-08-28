"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/portfolio/types";
import { container, item } from "@/lib/motion/variants";

export function WorkSection({ featured, rest }: { featured: Project[]; rest: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-border/60">
      <div className="site-frame py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h2
            id="work-title"
            className="text-[28px] font-semibold tracking-[-0.03em] sm:text-[32px]"
            style={{ fontFamily: "var(--type-display), var(--type-sans), sans-serif" }}
          >
            Selected work
          </h2>
          <p className="mt-3 text-[16px] leading-7 text-muted-foreground">
            Projects I&apos;ve shipped — web apps and experiments. Every tile links to its source.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6">
          {featured.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-[24px] bg-card ring-1 ring-border"
            >
              <div className={`grid ${idx === 1 ? "lg:grid-cols-[1.2fr_0.9fr]" : "lg:grid-cols-[1.05fr_1.25fr]"}`}>
                {idx === 1 ? (
                  <>
                    <div className="relative bg-[#0A0A0C] p-6 sm:p-8">
                      <div className="overflow-hidden rounded-2xl bg-[#111113] ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.01]">
                        <div className="aspect-[4/3] p-6">
                          <p className="font-mono text-xs tracking-wide text-muted-foreground">nohint.dev</p>
                          <p className="mt-2 text-3xl font-semibold tracking-[-0.03em]">nohint404</p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">Personal developer portfolio — this site.</p>
                          <div className="mt-6 grid grid-cols-3 gap-2">
                            <span className="h-16 rounded-xl bg-white text-xs font-medium leading-[4rem] text-black text-center">Work</span>
                            <span className="h-16 rounded-xl bg-white/5 ring-1 ring-white/10" />
                            <span className="h-16 rounded-xl bg-white/5 ring-1 ring-white/10" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 sm:p-10 lg:p-12">
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">Featured · 0{idx + 1}</p>
                      <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.03em]" translate="no">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{project.summary}</p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.narrative}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((t) => (
                          <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-8 flex gap-3">
                        <a
                          href={project.links.source}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
                        >
                          GitHub
                        </a>
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-medium ring-1 ring-border"
                          >
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-8 sm:p-10 lg:p-12">
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">Featured · 0{idx + 1}</p>
                      <h3 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.03em] sm:text-[36px]" translate="no">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{project.summary}</p>
                      <p className="mt-4 text-[14px] leading-6 text-muted-foreground/90">{project.narrative}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((t) => (
                          <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <a
                          href={project.links.source}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
                        >
                          GitHub <span aria-hidden="true" className="ml-1">↗</span>
                        </a>
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-5 text-sm font-medium ring-1 ring-border"
                          >
                            Live demo
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="relative bg-[#0A0A0C] p-4 sm:p-6 lg:p-8">
                      <div className="overflow-hidden rounded-2xl bg-[#141418] ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.01]">
                        <div className="flex h-8 items-center gap-1.5 border-b border-white/5 px-3">
                          <span className="size-3 rounded-full bg-white/10" />
                          <span className="size-3 rounded-full bg-white/10" />
                          <span className="size-3 rounded-full bg-white/10" />
                          <span className="ml-2 text-xs text-muted-foreground">psystream</span>
                        </div>
                        <div className="aspect-[16/10] bg-gradient-to-br from-[#1A1A24] via-[#12121A] to-[#0B0B0F] p-5">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex gap-3">
                              <span className="h-20 w-14 rounded-lg bg-white/10" />
                              <span className="h-20 w-14 rounded-lg bg-[#6d5cff]/20 ring-1 ring-[#6d5cff]/20" />
                              <span className="hidden h-20 w-14 rounded-lg bg-white/5 sm:block" />
                              <span className="hidden h-20 w-14 rounded-lg bg-white/5 lg:block" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Continue watching</p>
                              <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                                <div className="h-1.5 w-[38%] rounded-full bg-[#6d5cff]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {rest.map((project) => (
            <motion.a
              key={project.slug}
              href={project.links.source}
              target="_blank"
              rel="noreferrer"
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex flex-col rounded-2xl bg-card p-6 ring-1 ring-border transition-colors hover:bg-[#151517] hover:ring-white/10"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[15px] font-semibold tracking-[-0.015em]" translate="no">
                  {project.title}
                </h3>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border">
                  {project.stack[0]}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                Source <span aria-hidden="true">↗</span>
              </span>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/nohint404?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-6 text-sm font-medium ring-1 ring-border hover:bg-[#232326]"
          >
            View all repositories
          </a>
        </div>
      </div>
    </section>
  );
}
