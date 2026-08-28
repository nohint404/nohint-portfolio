"use client";

const languages = [
  { name: "TypeScript", short: "TS" },
  { name: "JavaScript", short: "JS" },
  { name: "Rust", short: "RS" },
  { name: "Python", short: "PY" },
  { name: "Wolfram", short: "WL" },
  { name: "Lua", short: "LU" },
  { name: "CSS", short: "CSS" },
  { name: "Next.js", short: "NX" },
  { name: "React", short: "RCT" },
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
            <span className="grid size-8 place-items-center bg-secondary font-mono text-[11px] font-semibold tracking-wide text-foreground ring-1 ring-border" style={{ borderRadius: "2px" }}>
              {lang.short}
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
