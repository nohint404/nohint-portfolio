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
      <h2 id="work-title">{content.title}</h2>
      <ScrollReveal text={content.intro} className="archive-section__copy" />
      <a className="text-link" href="https://github.com/nohint404?tab=repositories" target="_blank" rel="noreferrer">{content.all}<span aria-hidden="true">↗</span></a>
    </div>
    <div className="featured-records">
      {featured.map((project) => <article key={project.slug} className="featured-record">
        <div className="featured-record__index" aria-hidden="true">{project.repository.owner}/{project.repository.name}</div>
        <div className="featured-record__body">
          <h3 translate="no">{project.title}</h3>
          <p>{project.summary}</p>
          <p className="featured-record__narrative">{project.narrative}</p>
          <ul aria-label={`${project.title} technology stack`}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="featured-record__links"><a className="button-ink" href={project.links.source} target="_blank" rel="noreferrer"><GithubMark className="size-4" />{content.source}<span aria-hidden="true">↗</span></a>{project.links.live && <a className="text-link" href={project.links.live} target="_blank" rel="noreferrer">{content.live}<span aria-hidden="true">↗</span></a>}</div>
        </div>
      </article>)}
    </div>
    <div className="archive-records">
      {archive.map((project, index) => <motion.a key={project.slug} href={project.links.source} target="_blank" rel="noreferrer" initial={reduceMotion ? false : { y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.045, duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="archive-record">
        <span className="archive-record__name" translate="no">{project.title}</span><span className="archive-record__summary">{project.summary}</span><span className="archive-record__stack">{project.stack.join(" · ")}</span><span aria-hidden="true">↗</span>
      </motion.a>)}
    </div>
  </section>;
}
