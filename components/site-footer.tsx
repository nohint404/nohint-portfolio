export function SiteFooter() {
  return (
    <footer className="section-rule py-8">
      <div className="site-frame flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>nohint404 · Engineering without the guesswork.</p>
        <a
          href="https://github.com/nohint404/nohint-portfolio"
          target="_blank"
          rel="noreferrer"
          className="link-line font-mono text-xs tracking-[0.08em] uppercase"
        >
          Inspect source <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
