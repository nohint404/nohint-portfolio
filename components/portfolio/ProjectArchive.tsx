"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GithubMark } from "@/components/icons/GithubMark";
import { ScrollReveal } from "@/components/react-bits/ScrollReveal";
import type { Copy } from "@/lib/i18n";
import type { Project } from "@/lib/portfolio/types";

export function ProjectArchive({ projects, content }: { projects: readonly Project[]; content: Copy["work"] }) {
  const reduceMotion = useReducedMotion();
  const featured = projects.filter((project) => project.featured);
  const archive = projects.filter((project) => !project.featured);
  return <section id="work" className="archive-section site-frame" aria-labelledby="work-title">
    <div className="archive-section__intro">
      <div className="section-label"><span>01</span><span>{content.repository}</span></div>
      <h2 id="work-title">{content.title}</h2>
      <div className="archive-section__intro-bottom"><ScrollReveal text={content.intro} className="archive-section__copy" /><a className="text-link" href="https://github.com/nohint404?tab=repositories" target="_blank" rel="noreferrer">{content.all}<span aria-hidden="true">↗</span></a></div>
    </div>
    <div className="featured-records">
      {featured.map((project) => <motion.article key={project.slug} whileHover={reduceMotion ? undefined : { y: -7 }} transition={{ type: "spring", bounce: 0.16, duration: 0.4 }} className="featured-record">
        <div className="featured-record__visual" aria-hidden="true"><span>{project.repository.owner}</span><strong>{project.repository.name}</strong><i /><i /><i /></div>
        <div className="featured-record__body">
          <div className="featured-record__meta"><span className={`status-pill status-pill--${project.status}`}>{project.status}</span><span>{project.repository.owner}/{project.repository.name}</span></div>
          <h3 translate="no">{project.title}</h3>
          <p>{project.summary}</p>
          <p className="featured-record__narrative">{project.narrative}</p>
          <ul aria-label={`${project.title} technology stack`}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="featured-record__links"><a className="button-ink" href={project.links.source} target="_blank" rel="noreferrer"><GithubMark className="size-4" /><span>{content.source}</span><span className="button-ink__glyph" aria-hidden="true">↗</span></a>{project.links.live && <a className="text-link" href={project.links.live} target="_blank" rel="noreferrer">{content.live}<span aria-hidden="true">↗</span></a>}</div>
        </div>
      </motion.article>)}
    </div>
    <div className="archive-records">
      {archive.map((project, index) => <motion.a key={project.slug} href={project.links.source} target="_blank" rel="noreferrer" initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ delay: index * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="archive-record">
        <span className="archive-record__number" aria-hidden="true">0{index + 2}</span><span className="archive-record__name" translate="no">{project.title}</span><span className="archive-record__summary">{project.summary}</span><span className="archive-record__stack">{project.stack.join(" · ")}</span><span className="archive-record__glyph" aria-hidden="true">↗</span>
      </motion.a>)}
    </div>
  </section>;
}
