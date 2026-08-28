import Image from "next/image";
import Link from "next/link";
import { Mark } from "@/components/icons/Mark";
import { GithubMark } from "@/components/icons/GithubMark";

const nav = [
  { n: "01", label: "Work", href: "/#work" },
  { n: "02", label: "Stack", href: "/#stack" },
  { n: "03", label: "About", href: "/#about" },
  { n: "04", label: "Contact", href: "/#contact" },
] as const;

export function VanHoltzSidebar() {
  return (
    <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-[220px] lg:shrink-0 lg:flex-col lg:justify-between lg:border-r lg:border-border lg:px-6 lg:py-8">
      <div>
        <Link href="/" className="flex items-center gap-3">
          <Mark className="size-8 text-foreground" />
          <span className="text-sm font-semibold tracking-[-0.015em]" translate="no">
            nohint404
          </span>
        </Link>
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

        <nav aria-label="Primary" className="mt-10 space-y-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-baseline gap-3 py-1 text-sm hover:text-foreground"
            >
              <span className="font-mono text-[11px] text-muted-foreground">{item.n}</span>
              <span className="font-medium tracking-[-0.01em]">{item.label}</span>
            </a>
          ))}
          <a href="/labs" className="flex items-baseline gap-3 py-1 text-sm text-muted-foreground hover:text-foreground">
            <span className="font-mono text-[11px]">05</span>
            <span>Labs</span>
          </a>
        </nav>
      </div>

      <div className="space-y-4">
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
          Refined web experiences — animated, responsive, interactive. Focus on design integrity and performance.
        </p>
      </div>
    </aside>
  );
}
