import Link from "next/link";

export default function LocalizedNotFound() {
  return <main id="main-content" className="not-found-page site-frame"><p className="folio-caption">nohint.dev / missing record</p><h1>404</h1><p>This page is not part of the archive.</p><Link className="button-ink" href="/en">Return home <span aria-hidden="true">↖</span></Link></main>;
}
