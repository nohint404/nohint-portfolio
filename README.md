# nohint404

A source-led developer portfolio. Astro renders the pages; Svelte hydrates only the command palette immediately and the implementation map when visible. Native cross-document view transitions progressively enhance ordinary links. No client router, API tokens, analytics, remote fonts or contact backend.

## Run with Bun

```sh
bun install
bun run dev
bun run check
bun run check:svelte
bun run test
bun run build
bun run test:static
bun run preview --host 127.0.0.1
```

TypeScript is pinned to `~6`: the installed Astro/Svelte checkers do not yet support TypeScript 7's missing programmatic API. No lint tool is configured; Astro/Svelte diagnostics and focused tests are the current checks.

## Before publishing

1. Set the **approved public email** in `src/data/profile.ts`. It is deliberately absent. This enables the real mailto CTA and the command palette's copy-email action. The present GitHub link is a public profile, **not a direct contact channel**. Test email launch, successful clipboard feedback and blocked-clipboard fallback after configuring it.
2. Set `SITE_URL` to the actual production HTTP(S) origin during the build. It must have no credentials, non-root path, query or fragment. Canonical, absolute Open Graph image URLs, sitemap and robots sitemap reference are emitted only with this configuration. No production address is guessed. Deployment under a path prefix is not supported by the root-relative navigation.
3. Re-run all checks and browser smoke tests on the actual host. Confirm its 404 handling, headers, canonical and sitemap. This repository has not been published or deployed.

## Content

Edit `src/data/projects.ts` to change selection/order, copy and source citations. Only `vs-notrack` and the earlier `Portfolio` are presented. Citations are pinned to inspected public commits. `docs/content-evidence.md` records selection, exclusions and claim limitations; `docs/research.md` records framework sources; `docs/design.md` records the visual plan. Never promote inherited fork code or unsupported old portfolio claims into owned work.

The architecture map describes code; it does not run shell commands. Its `?mode=strict` state is linkable. Public source is curated at build time, not fetched per visitor. Revalidate descriptions and links when updating source snapshots.

## Interaction

Cmd/Ctrl K opens the launcher (does not intercept another editable field). Type fuzzy page/project names or aliases `ls`, `whoami`, `help`, `clear`. Arrow keys select, Enter executes, Tab completes a nonempty query, Escape closes and returns focus. Ordinary links and native mobile navigation remain the primary path. Intro is a nonblocking, first-session 360ms reveal; reduced-motion disables it and view transitions.

## Assets and performance

Instrument Sans is self-hosted from Fontsource (OFL license included in its package). Original social PNGs and favicon contain only typography/shapes; no third-party screenshots or unverified portraits/audio. Social images are generated design assets, not project screenshots. Browser validation and remaining limits are recorded in `docs/validation.md`.
