import Link from "next/link";
import { CommandPalette } from "@/components/command-palette";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Labs", href: "/labs" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-40 border-b border-border bg-background/95">
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="site-frame flex min-h-20 flex-wrap items-center justify-between gap-x-6 py-3 md:flex-nowrap md:py-0">
        <Link
          href="/"
          translate="no"
          aria-label="nohint404 home"
          className="flex min-h-11 items-center gap-2 font-mono text-xs tracking-[0.13em] uppercase"
        >
          <span aria-hidden="true" className="size-2 bg-signal" />
          nohint404
        </Link>

        <div className="md:order-3">
          <CommandPalette />
        </div>

        <nav
          aria-label="Primary navigation"
          className="order-3 flex w-full items-center justify-between border-t border-border pt-2 md:order-2 md:w-auto md:justify-start md:border-0 md:pt-0"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
