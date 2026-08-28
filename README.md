# nohint404 — nohint.dev

The production portfolio for `nohint404`: a dark, engineering-first record of verified work with inspectable source and graceful failure boundaries.

Production target: [nohint.dev](https://nohint.dev)

## What is implemented

- A project-led home page with one featured, verified repository
- A keyboard- and touch-accessible command palette (`⌘/Ctrl + K`)
- An honest Labs empty state and a branded, useful 404 page
- Server-only GitHub repository metadata with schema validation and hourly caching
- Explicit missing-token, rate-limit, malformed-response, upstream, and network fallbacks
- Vercel Web Analytics and Speed Insights as separate observability layers
- Canonical metadata, Open Graph image, sitemap, robots rules, manifest, and structured data
- Strict TypeScript, Vitest behavior tests, Playwright browser tests, and GitHub Actions gates

## Stack

- Next.js 16.3.3 App Router and React 19.2.8
- TypeScript 6 in strict mode
- Tailwind CSS 4.3.3
- Base UI-backed shadcn primitives for the dialog and command palette
- Self-hosted Barlow Condensed, Geist, and Geist Mono via `next/font/local` and pinned Fontsource assets
- Vercel Analytics, Speed Insights, and deployment

Server Components are the default. GitHub transport, validation, normalization, and caching live outside UI components in `lib/github`; curated portfolio facts live in `lib/portfolio` and remain usable when live metadata is unavailable.

## Development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Run the local quality gates:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e --project=chromium
```

`pnpm build` uses Next.js's supported webpack production path. This keeps local and CI builds deterministic in restricted environments where Turbopack's CSS worker cannot bind its internal port.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | No | Server-only GitHub repository metadata. Without it, the verified curated project content renders with an explicit telemetry fallback. |

Never expose the token through a `NEXT_PUBLIC_*` variable. Privileged GitHub traffic analytics are not shown publicly.

## Project structure

```text
app/                  Routes, metadata, and global design tokens
components/           Site sections and replated UI primitives
lib/github/           Server-only GitHub transport, schema, cache, and tests
lib/portfolio/        Curated domain data, types, ordering, and tests
tests/e2e/            Cross-route and interaction browser tests
.github/workflows/    CI quality and Chromium smoke gates
```

## Accessibility and performance

The interface uses semantic landmarks and headings, a skip link, visible focus, 44px touch targets, reduced-motion handling, native links, and a focus-managed dialog. JavaScript is limited to the command palette and Vercel observability; project data is rendered on the server.

## Deployment

Vercel is the production target. The intended flow is feature branch to Preview, validated Preview to `main`, and `main` to Production with `https://nohint.dev` as canonical. Deployment URLs are documented here only after they are verified.

## License

[AGPL-3.0-only](LICENSE)
