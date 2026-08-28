"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mark } from "@/components/icons/Mark";
import { GithubMark } from "@/components/icons/GithubMark";

const nav = [
  { n: "01", label: "Work", href: "/#work" },
  { n: "02", label: "Stack", href: "/#stack" },
  { n: "03", label: "About", href: "/#about" },
  { n: "04", label: "Contact", href: "/#contact" },
] as const;

export function VanHoltzSidebar() {
  const [open, setOpen] = useState(true);

  return (
    <motion.aside
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:flex-col lg:justify-between lg:border-r lg:border-border lg:py-8 ${open ? "lg:w-[240px] lg:px-6" : "lg:w-[64px] lg:px-3"}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-3">
            <Mark className="size-8 shrink-0 text-foreground" />
            <AnimatePresence>
              {open && (
                <motion.span
                  initial={{ x: -8 }}
                  animate={{ x: 0 }}
                  exit={{ x: -8 }}
                  className="text-sm font-semibold tracking-[-0.015em]"
                  translate="no"
                >
                  nohint404
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            type="button"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center bg-secondary ring-1 ring-border hover:bg-[#232326]"
            style={{ borderRadius: "2px" }}
          >
            <motion.span
              animate={{ rotate: open ? 0 : 180 }}
              className="text-muted-foreground"
              aria-hidden="true"
            >
              ‹
            </motion.span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mt-6 space-y-1 text-xs leading-5 text-muted-foreground">
                <p>Studio of nohint404</p>
                <p>Software Developer</p>
              </div>
              <div className="mt-4 space-y-1 text-xs leading-5 text-muted-foreground">
                <p>Remote</p>
                <a href="https://github.com/nohint404" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <GithubMark className="size-3.5" />
                  github.com/nohint404
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav aria-label="Primary" className="mt-10 space-y-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex min-h-11 items-center gap-3 py-2 text-sm hover:text-foreground ${open ? "" : "justify-center"}`}
              title={item.label}
            >
              <span className="font-mono text-[11px] text-muted-foreground">{item.n}</span>
              {open && <span className="font-medium tracking-[-0.01em]">{item.label}</span>}
            </a>
          ))}
          <a href="/labs" className={`flex min-h-11 items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground ${open ? "" : "justify-center"}`} title="Labs">
            <span className="font-mono text-[11px]">05</span>
            {open && <span>Labs</span>}
          </a>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="relative size-9 overflow-hidden bg-card ring-1 ring-border" style={{ borderRadius: "2px" }}>
                <Image src="/avatar.jpg" alt="" width={36} height={36} className="size-9 object-cover" unoptimized />
              </span>
              <div>
                <p className="text-xs font-medium leading-none">nohint404</p>
                <p className="text-[11px] text-muted-foreground">Available</p>
              </div>
            </div>
            <p className="text-[11px] leading-4 text-muted-foreground">
              Refined web experiences — animated, responsive, interactive.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
