export function SignalPanel() {
  return (
    <figure className="signal-surface min-h-[22rem] overflow-hidden rounded-lg p-5 sm:min-h-[26rem] sm:p-7">
      <figcaption className="flex items-center justify-between gap-4">
        <span className="instrument-label">Build signal / live trace</span>
        <span className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-signal uppercase">
          <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
          Active
        </span>
      </figcaption>

      <svg
        viewBox="0 0 640 260"
        aria-hidden="true"
        className="absolute top-20 left-0 w-[150%] max-w-none -translate-x-[12%] sm:top-24"
        fill="none"
      >
        <path
          d="M0 157H92L113 156L128 80L148 218L173 126L190 157H268L289 156L305 116L322 176L342 145L359 157H434L459 157L476 46L498 228L521 112L543 157H640"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="text-signal"
        />
        <path
          d="M0 157H640"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
          className="text-foreground/15"
        />
      </svg>

      <div className="absolute right-5 bottom-5 left-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:right-7 sm:bottom-7 sm:left-7">
        {[
          ["01", "SOURCE", "typed"],
          ["02", "TESTS", "passing"],
          ["03", "ACCESS", "keyboard"],
          ["04", "DEPLOY", "gated"],
        ].map(([index, label, value]) => (
          <div key={index} className="bg-card/95 p-4">
            <p className="instrument-label text-subtle">{index} / {label}</p>
            <p className="mt-2 font-mono text-xs text-foreground">{value}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
