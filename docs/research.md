# Research: Astro/Svelte portfolio implementation constraints

## Summary
Use prerendered Astro pages with Svelte 5 islands, curated verified project data, and Bun-only dependency/build workflows. Current Astro documentation explicitly distinguishes native cross-document transitions from its optional ClientRouter: defaulting to a native multi-page site best matches this brief unless persistent shared UI justifies router lifecycle complexity. Do not invent a deployment domain to complete SEO metadata.

## Findings

1. **Claim:** Current `@astrojs/svelte` supports Svelte 5; older Svelte 3/4 require integration version 5. Register `svelte()` in `astro.config.mjs`; manual installation also needs `svelte.config.js` with `vitePreprocess` imported from `@astrojs/svelte`. **Sources:** [Svelte integration](https://docs.astro.build/en/guides/integrations-guide/svelte/), [Bun recipe](https://docs.astro.build/en/recipes/bun/). **Support:** direct evidence. **Confidence:** high.
   - Minimal manual setup, after creating package.json: `bun add astro @astrojs/svelte svelte`; `bun add -d typescript @astrojs/check svelte-check`; `bun install`.
   - Define scripts `dev: astro dev`, `check: astro check`, `check:svelte: svelte-check --tsconfig ./tsconfig.json`, `build: astro build`, `preview: astro preview`.
   - Run `bun run check`, `bun run check:svelte`, `bun run build`, `bun run preview --host 127.0.0.1`.
   - The official Bun recipe also supports `bun create astro` and invoking `astro add` through Bun. Manual setup avoids unwanted starter content and non-Bun command examples in the integration guide. Commands above are implementation adaptation, not verbatim documentation. Validate resolved versions and peer compatibility during installation; no exact latest-version number was asserted.

2. **Claim:** `getStaticPaths()` emits prerendered dynamic routes from `{ params, props }` records. **Sources:** [Routing reference](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths). **Support:** direct evidence. **Confidence:** high.
   - Recommendation: `src/pages/work/[slug].astro` maps the verified project array to `{params:{slug: project.slug}, props:{project}}`. Keep descriptions, architecture notes, links, and source references in typed data, not duplicated templates. Static build requires no SSR adapter or visitor GitHub API request.
   - Astro build transpiles but does **not** type-check. `astro check` checks Astro/TypeScript; run Svelte checking separately. [TypeScript guide](https://docs.astro.build/en/guides/typescript/#type-checking).

3. **Claim:** Client directives control when framework JavaScript is loaded and hydrated. `client:load` is immediate; `client:idle` waits for idle (or document load fallback); `client:visible` uses IntersectionObserver. **Sources:** [Directives reference](https://docs.astro.build/en/reference/directives-reference/#client-directives). **Support:** direct evidence. **Confidence:** high.
   - Recommendation: static Astro for hero/copy/project detail; one small `client:load` navigation/palette island is justified by immediate keyboard access. Below-fold stack/project explorer: `client:visible` (optionally `rootMargin: "200px"`). Use idle only for genuinely deferrable controls. A hidden dialog must **not** use `client:visible` as its only activation mechanism.
   - Do not use `client:only` for indexable portfolio content: it skips server HTML. Avoid duplicating every project description inside hydrated props if the island needs only names/slugs/tags.

4. **Claim:** Native cross-document view transitions do not change MPA behavior or add JavaScript; `<ClientRouter />` intercepts navigation and introduces client-side lifecycle/state management. **Sources:** [Current View Transitions guide](https://docs.astro.build/en/guides/view-transitions/). **Support:** direct evidence. **Confidence:** high.
   - Recommendation/inference: prefer native `@view-transition { navigation: auto; }` progressive enhancement with normal links for this static-first brief. Add Astro ClientRouter only if actual shared-element persistence/navigation behavior needs it; Astro transition directives are not automatically equivalent to native CSS behavior.
   - If chosen: `import { ClientRouter } from 'astro:transitions'`, include in shared head; `fallback="swap"` skips fallback animation. `data-astro-reload` forces full navigation on a specific link. Both pages need ClientRouter for client routing.
   - Lifecycle order: `astro:before-preparation` → `astro:after-preparation` → `astro:before-swap` → `astro:after-swap` → `astro:page-load`.
   - Bundled scripts execute once, not once per navigation. Use a single registered `astro:page-load` handler to initialize current DOM (fires initially and on forward/back navigation). Clean up outgoing observers/listeners/timers before swap or in Svelte component cleanup; avoid stacking global shortcut handlers. Use `astro:after-swap` for prepaint state restoration when necessary. Test home → detail → back → palette/menu, not just initial load.

5. **Claim:** ClientRouter disables all its view transition animations, including fallback animations, when reduced motion is requested; its route announcer prefers page title, then first h1, then pathname. **Sources:** [View Transitions accessibility](https://docs.astro.build/en/guides/view-transitions/#accessibility). **Support:** direct evidence. **Confidence:** high.
   - This does **not** exempt custom intro, Svelte transitions, smooth scrolling or cursor effects from their own reduced-motion handling. Recommendation: no transform/typing intro under reduced motion; immediately visible content; native/CSS view-transition pseudo-elements disabled through a reduced-motion media rule. Provide unique page titles. Initial entrance must never gate contact/navigation, even if storage or JavaScript fails.

6. **Claim:** Sitemap integration needs the deployed HTTP(S) URL as Astro `site`; it includes prerendered dynamic routes. `Astro.site` is undefined when unconfigured. **Sources:** [Sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/), [Render context](https://docs.astro.build/en/reference/api-reference/#site). **Support:** direct evidence. **Confidence:** high.
   - Recommendation/inference: use an explicitly supplied build configuration such as `SITE_URL`, validated as an absolute HTTP(S) URL. Until supplied, omit canonical, absolute `og:url`/`og:image` and sitemap links rather than deriving localhost/example.com or guessing a GitHub Pages address. Keep page titles, descriptions, favicon and local preview artwork functional.
   - Configure `site` and `sitemap()` conditionally together; canonical when configured: `new URL(Astro.url.pathname, Astro.site)`. Generate robots.txt with a Sitemap line only when sitemap exists. Static robots can otherwise permit crawling without claiming a nonexistent sitemap.
   - Treat final production domain as a deployment prerequisite, not a reason to stop local implementation. Before release, verify generated canonical URLs, sitemap and social-image absolute URLs against the confirmed domain. No fabricated email or contact endpoint.

7. **Claim:** Fresh Web Interface Guidelines supply an actionable accessibility/UX review checklist. **Sources:** [Current raw guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). **Support:** direct evidence (recommendation source, not formal accessibility certification). **Confidence:** high.
   - Semantic links for navigation/buttons for actions; accessible names for icon buttons and inputs; decorative graphics hidden from AT; hierarchical headings, skip link, anchor scroll margins.
   - Visible `:focus-visible`, no focus hidden beneath sticky header. Dialog/palette: labeled input, Escape, focus containment/return, predictable arrows/Enter/Tab, polite copy/error announcements; no shortcut capture in other editable controls. Native `<dialog>` is an implementation recommendation, not a requirement of this source.
   - Reduced motion; interruptible opacity/transform animations; no `transition: all`; looping motion beyond five seconds needs stop/pause/hide control. Prefer no continuous decoration.
   - Images need dimensions/alt; below-fold lazy loading; high fetch priority only for critical above-fold image. Critical font preload plus swap. Avoid layout-read/write thrashing.
   - Preserve link middle-click/Cmd-click; deep-link meaningful filters using URL parameters; no scroll hijacking. Touch alternatives for all pointer effects, safe-area insets, contained modal overscroll, dark `color-scheme`, matching theme-color.
   - Handle long repo names and empty optional fields; fix overflow rather than concealing broken layout. Audit file:line findings after implementation and fetch guidelines anew for that review.

## Contradictions
- Fresh Vercel guidelines request Title Case for headings/buttons; supplied frontend-design skill requests sentence case and personal concise voice. Follow the user’s specific design/copy brief; record this intentional exception rather than mechanically applying Title Case.
- Several fresh guidelines use React-specific examples (`onChange`, `defaultValue`, `useState`, nuqs); translate the behavioral goals to Svelte/native platform APIs, do not add React libraries. React composition guidance is conceptual only for this Astro/Svelte stack.
- Astro’s current guide now emphasizes native MPA transitions as distinct from optional ClientRouter. Do not follow stale examples importing the old `ViewTransitions` component or imply ClientRouter is necessary for all transitions.

## Missing evidence
- Confirmed deployment URL and public contact method remain outside this platform lane. Scout owns public GitHub/content evidence.
- Exact installed tool/package versions, browser compatibility in the deployment target, successful commands, generated bundle size and accessibility behavior must be validated by Worker; this report is discovery, not test execution.
- Automated `source_check` returned `unclear` (0.30) for the combined Svelte/router/sitemap claim; it found term matches without decisive markers. This is a validation limitation, not contradictory evidence. Primary fetched documentation passages were inspected directly and explicitly state the claims above.

## Sources
- Kept: official Astro Bun, Svelte, routing, directives, TypeScript, transitions, sitemap and render-context documentation linked above — current authoritative implementation contracts.
- Kept: Vercel raw Web Interface Guidelines — user-required current review source.
- Rejected/deprioritized: v4.docs.astro.build transition/configuration pages — archived version; preview deployment docs surfaced by search — noncanonical; third-party Bun articles — unnecessary given official recipe.

## Next steps
Worker: preserve native multi-page behavior unless persistence warrants ClientRouter; wire domain-dependent SEO behind confirmed configuration; run Bun checks/build plus browser navigation, keyboard, reduced-motion and mobile tests. Re-fetch latest guidelines during the actual code review. Only the managed output artifact was written; no project files were edited.
