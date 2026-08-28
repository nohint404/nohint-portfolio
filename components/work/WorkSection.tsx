"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/portfolio/types";
import { GithubMark } from "@/components/icons/GithubMark";
import { TiltedCard } from "@/components/ui/TiltedCard";

const ease = [0.16, 1, 0.3, 1] as const;

export function WorkSection({ featured, rest }: { featured: Project[]; rest: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-border/60">
      <div className="site-frame py-14 sm:py-20">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: false, margin: "-80px", amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-12 gap-4"
        >
          <div className="col-span-12 lg:col-span-7">
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
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end justify-start lg:justify-end">
            <a
              href="https://github.com/nohint404?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-border bg-card px-6 text-sm font-medium hover:bg-secondary"
              style={{ borderRadius: "2px" }}
            >
              View all repositories
            </a>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-12 gap-5">
          {featured.map((project, idx) => (
            <TiltedCard
              key={project.slug}
              className={`col-span-12 overflow-hidden bg-card ring-1 ring-border ${idx === 0 ? "lg:col-span-8 lg:ml-0" : "lg:col-span-8 lg:col-start-5 lg:-mt-6"} grid ${idx === 0 ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}
              style={{ borderRadius: "2px", clipPath: idx === 0 ? "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)" : "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 8%)" } as React.CSSProperties}
            >
              <motion.div
                initial={{ y: 28 }}
                whileInView={{ y: 0 }}
                viewport={{ once: false, margin: "-60px", amount: 0.2 }}
                exit={{ y: -12 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease }}
                className="contents"
              >
              <div className={`p-7 sm:p-9 ${idx === 1 ? "order-2 lg:order-1" : ""}`}>
                <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">Featured · 0{idx + 1}</p>
                <h3 className="mt-3 text-[28px] font-semibold leading-none tracking-[-0.03em] sm:text-[32px]" translate="no">
                  {project.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-muted-foreground">{project.summary}</p>
                <p className="mt-3 text-[13px] leading-5 text-muted-foreground/80">{project.narrative}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span key={t} className="border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground" style={{ borderRadius: "2px" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex gap-3">
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 text-sm font-medium text-primary-foreground"
                    style={{ borderRadius: "2px" }}
                  >
                    <GithubMark className="size-4" />
                    GitHub
                  </a>
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center border border-border bg-card px-5 text-sm font-medium"
                      style={{ borderRadius: "2px" }}
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
              <div className={`relative bg-[#0A0A0C] p-4 sm:p-6 ${idx === 1 ? "order-1 lg:order-2" : ""}`}>
                <div className="h-full overflow-hidden bg-[#111113] ring-1 ring-white/10" style={{ borderRadius: "2px" }}>
                  <div className="flex h-7 items-center gap-1.5 border-b border-white/5 px-3">
                    <span className="size-2.5 bg-white/20" style={{ borderRadius: "1px" }} />
                    <span className="size-2.5 bg-white/20" style={{ borderRadius: "1px" }} />
                    <span className="size-2.5 bg-white/20" style={{ borderRadius: "1px" }} />
                    <span className="ml-2 font-mono text-[11px] tracking-wide text-muted-foreground">{project.slug}</span>
                  </div>
                  <div className="aspect-[4/3] p-5">
                    <div className="h-full rounded-[2px] bg-gradient-to-br from-white/[0.06] to-transparent p-4 ring-1 ring-white/5">
                      <div className="h-2 w-16 bg-white" style={{ borderRadius: "1px" }} />
                      <div className="mt-3 h-2 w-24 bg-white/10" style={{ borderRadius: "1px" }} />
                      <div className="mt-6 grid grid-cols-3 gap-2">
                        <span className="h-12 bg-white/10" style={{ borderRadius: "2px" }} />
                        <span className="h-12 bg-white/5 ring-1 ring-white/10" style={{ borderRadius: "2px" }} />
                        <span className="h-12 bg-white/5 ring-1 ring-white/10" style={{ borderRadius: "2px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            </TiltedCard>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-12 gap-4">
          {rest.map((project, i) => (
            <motion.a
              key={project.slug}
              href={project.links.source}
              target="_blank"
              rel="noreferrer"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: false, margin: "-40px", amount: 0.2 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              whileHover={{ y: -4 }}
              className={`group flex flex-col bg-card p-6 ring-1 ring-border hover:bg-[#151517] hover:ring-white/10 col-span-12 sm:col-span-6 ${i % 2 === 0 ? "lg:col-span-3 lg:ml-2" : "lg:col-span-3 lg:mr-2"} ${i === 2 ? "lg:col-start-3" : ""}`}
              style={{ borderRadius: "2px", clipPath: i % 2 === 0 ? "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)" : "polygon(4% 0, 100% 0, 100% 100%, 0 100%, 0 6%)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[14px] font-semibold tracking-[-0.015em]" translate="no">
                  {project.title}
                </h3>
                <span className="border border-border bg-secondary px-2 py-1 font-mono text-[11px] font-medium text-muted-foreground" style={{ borderRadius: "2px" }}>
                  {project.stack[0]}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                <GithubMark className="size-3.5" />
                Source
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
