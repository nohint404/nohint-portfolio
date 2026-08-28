import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="site-frame py-16 sm:py-20 lg:py-28">
      <section aria-labelledby="not-found-title" className="grid min-h-[30rem] items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="instrument-label">Route signal / missing</p>
          <h1
            id="not-found-title"
            className="balanced-heading mt-5 font-display text-[clamp(6rem,23vw,15rem)] leading-[0.72] font-semibold tracking-[-0.055em] text-signal"
          >
            404
          </h1>
          <p className="mt-8 text-2xl font-semibold tracking-[-0.025em]">No hint. No route either.</p>
        </div>
        <div className="border-l border-border pl-6 sm:pl-8">
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            The requested path is not part of this build. Resume from the project record or use
            the command palette with <kbd className="font-mono text-foreground">⌘ K</kbd>.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/" className="link-line text-sm font-semibold">
              Return home <span aria-hidden="true">←</span>
            </Link>
            <Link href="/#work" className="link-line text-sm text-muted-foreground">
              Selected work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
