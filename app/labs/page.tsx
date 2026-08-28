import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Labs",
  description: "Experiments and field notes from nohint404.",
  alternates: { canonical: "/labs" },
};

export default function LabsPage() {
  return (
    <main id="main-content" className="site-frame py-16 sm:py-20 lg:py-28">
      <section aria-labelledby="labs-title" className="grid min-h-[30rem] items-end gap-12 lg:grid-cols-2">
        <div>
          <p className="instrument-label">Labs / queue 000</p>
          <h1
            id="labs-title"
            className="balanced-heading mt-5 font-display text-[clamp(4rem,13vw,9rem)] leading-[0.82] font-semibold tracking-[-0.045em]"
          >
            Quiet
            <br />
            <span className="text-signal">for now.</span>
          </h1>
        </div>
        <div className="signal-surface rounded-lg p-7 sm:p-9">
          <p className="instrument-label text-signal">No experiments published</p>
          <p className="mt-8 max-w-md text-lg leading-8 text-muted-foreground">
            This queue stays empty until an experiment has source, context, and something useful
            to teach. No placeholder projects.
          </p>
          <Link href="/#work" className="link-line mt-8 text-sm font-semibold">
            Return to selected work <span aria-hidden="true">←</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
