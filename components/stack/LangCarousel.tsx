"use client";

import Image from "next/image";

const languages = [
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "Rust", icon: "/icons/rust.svg" },
  { name: "Python", icon: "/icons/python.svg" },
  { name: "GitHub", icon: "/icons/github.svg" },
  { name: "Wolfram", icon: "/icons/wolfram.svg" },
  { name: "Lua", icon: "/icons/lua.svg" },
  { name: "CSS", icon: "/icons/css.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  { name: "React", icon: "/icons/react.svg" },
];

export function LangCarousel() {
  const loop = [...languages, ...languages];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card" style={{ borderRadius: "2px" }}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card to-transparent" />
      <div className="flex w-max animate-[marquee_22s_linear_infinite] hover:[animation-play-state:paused]">
        {loop.map((lang, i) => (
          <div
            key={`${lang.name}-${i}`}
            className="flex shrink-0 items-center gap-3 border-r border-border px-6 py-4"
          >
            <span className="relative grid size-8 place-items-center overflow-hidden bg-secondary ring-1 ring-border" style={{ borderRadius: "2px" }}>
              <Image src={lang.icon} alt="" width={32} height={32} className="size-8 object-cover" unoptimized />
            </span>
            <span className="whitespace-nowrap text-sm font-medium tracking-[-0.01em]">{lang.name}</span>
            <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">·</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
