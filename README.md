# nohint-portfolio

A light, interactive workbench for nohint404’s developer tooling and web interfaces. Astro static routes, Svelte islands, TypeScript and Bun. AGPL-3.0; see LICENSE.

## Run

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bun run check:svelte
bun test
bun run build
bun run test:static
bun run preview
```

CI runs these checks with the pinned Bun version. Vercel uses the static `dist` output. Set `SITE_URL` to the final HTTP(S) origin for canonical URLs, sitemap and absolute social metadata; no domain is inferred from the contact email. Vercel Web Analytics is included.

## Source map

- `src/components/scenes/`: editorial hero, project worlds, LAB, about/stack and contact.
- `src/data/projects.ts`, `monolith.ts`, `profile.ts`: actual projects, attribution and owner-approved contacts.
- `src/pages/work/[slug].astro`: three prerendered case studies, including `/work/portfolio/` for this site.
- `src/lib/motion/`: finite interruptible spring and pointer behavior. Native CSS/WAAPI for other motion, no animation dependency.
- `src/lib/terminal.ts`: safe bounded text commands. It never executes a shell, reads files or requests a server.
- `DESIGN.md`: built design system. `docs/redesign-direction.md`: prebuild contract. `docs/redesign-research.md`: primary-source motion research.

Project visuals are source diagrams, not screenshots. `public/share.png` is original typographic artwork; provenance is recorded beside it. Email: contact@nohint.dev. Discord username: nohint404. GitHub remains first in the contact stack.
