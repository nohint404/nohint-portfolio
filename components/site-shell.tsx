import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Copy, Locale } from "@/lib/i18n";

export function SiteShell({ children, locale, content }: { children: ReactNode; locale: Locale; content: Copy }) {
  return <div className="site-shell" lang={locale}>
    <SiteHeader locale={locale} content={content} />
    <div className="site-shell__content">{children}</div>
    <SiteFooter content={content} />
  </div>;
}
