import Image from "next/image";
import Link from "next/link";
import { CommandPalette } from "@/components/command-palette";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Labs", href: "/labs" },
  { label: "Contact", href: "/#contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-background/70 apple-blur supports-[backdrop-filter]:bg-background/60">
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[100] -translate-y-20 bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
        style={{ borderRadius: "2px" }}
      >
        Skip to content
      </a>
      <div className="site-frame flex h-[3.75rem] items-center justify-between gap-6">
        <Link
          href="/"
          translate="no"
          aria-label="nohint404 home"
          className="flex min-h-11 items-center gap-3 px-2"
          style={{ borderRadius: "2px" }}
        >
          <span className="relative size-7 overflow-hidden bg-card ring-1 ring-border" style={{ borderRadius: "2px" }}>
            <Image
              src="https://avatars.githubusercontent.com/u/238106931?v=4"
              alt=""
              width={28}
              height={28}
              className="size-7 object-cover"
              priority
              unoptimized
            />
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.015em]">nohint404</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary navigation" className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                style={{ borderRadius: "2px" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="ml-1">
            <CommandPalette />
          </div>
        </div>
      </div>
      <nav aria-label="Primary navigation mobile" className="flex items-center gap-1 border-t border-border px-2 py-2 sm:hidden">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex h-11 flex-1 items-center justify-center bg-secondary text-center text-sm font-medium text-muted-foreground"
            style={{ borderRadius: "2px" }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
