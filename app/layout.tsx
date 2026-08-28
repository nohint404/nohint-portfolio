import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const display = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2",
      weight: "600",
    },
  ],
  variable: "--type-display",
  display: "swap",
  fallback: ["sans-serif"],
});

const sans = localFont({
  src: "../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--type-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const mono = localFont({
  src: "../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  variable: "--type-mono",
  display: "swap",
  fallback: ["SFMono-Regular", "Consolas", "monospace"],
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "nohint404",
  url: "https://nohint.dev",
  description: "Personal developer portfolio of nohint404 — Software Developer.",
  sameAs: ["https://github.com/nohint404"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nohint.dev"),
  title: { default: "nohint404 — Software Developer", template: "%s — nohint404" },
  description: "Personal portfolio of nohint404 — Software Developer. Projects, stack and contact.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://nohint.dev",
    siteName: "nohint404",
    title: "nohint404 — Software Developer",
    description: "Personal portfolio of nohint404 — projects, stack and contact.",
  },
  twitter: {
    card: "summary_large_image",
    title: "nohint404 — Software Developer",
    description: "Personal portfolio of nohint404 — projects, stack and contact.",
  },
  authors: [{ name: "nohint404", url: "https://github.com/nohint404" }],
  category: "technology",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} font-sans`}>
      <body>
        <template
          data-design-contract="typographic-specimen-01"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: an inspectable developer archive typesets real work as a living specimen, refusing the dashboard portfolio. OWN-WORLD: warm paper, carbon ink, cobalt registration marks, Barlow Condensed and Geist, fine rules and type-scale contrast. STORY: visitors encounter nohint404 through work they can open, inspect and verify. FIRST VIEWPORT: oversized responsive nohint404 lettering fills a paper field; project and GitHub actions sit below its baseline. FORM: typographic specimen, Experience mode, typographic-specimen-01. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance -->",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
