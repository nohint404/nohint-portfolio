import type { Copy } from "@/lib/i18n";

export function SiteFooter({ content }: { content: Copy }) {
  return (
    <footer className="site-footer">
      <div className="site-frame site-footer__inner">
        <p>{content.footer}</p>
        <a
          href="https://github.com/nohint404/nohint-portfolio"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Inspect source <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
