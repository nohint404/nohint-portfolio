# Implementation validation

## Build and static checks

- `bun install`: passed. Astro 7.3.1, Svelte 5.57.0, integration 9.0.1, TypeScript 6.0.3.
- `bun run check`: 13 files, zero errors/warnings/hints.
- `bun run check:svelte`: zero errors/warnings.
- `bun test`: one focused fuzzy-matching test, five assertions; empty, case-insensitive, ordered subsequence, missing match.
- `bun run build`: four HTML pages plus robots.txt, static output.
- `bun run test:static`: all four pages; 67 local links/assets/anchors; heading, description, skip target, unsupported-content and secret-signature assertions passed.
- No lint tool configured. No deployment performed. Directory was not a Git checkout and no repository was initialized; no index/staged files exist.
- All eight unique remote URLs (profile, repositories, pinned source files underlying eleven cited links) returned HTTP 200. Source scripts were read only, never executed.

Initial failures were resolved: latest TypeScript 7 lacked APIs needed by both checkers, so pinned supported ~6. Fontsource's package has no latin.css export, so use its actual index and preload Latin WOFF2. First preview navigation raced server readiness; subsequent local navigation worked.

## Browser evidence

Production preview: `http://127.0.0.1:4321/`, started with `bun run preview --host 127.0.0.1`. Parent process PID at handoff: 217837. Log/PID under `/tmp/portfolio-validation/`.

Actual Chromium testing via agent-browser (core loaded before use):

- Homepage screenshots at 1440×1000, 1280×800, 768×1024, 390×844 and 320×740. Document scroll width equals client width at each size. Both case studies and custom 404 also tested at 320px without horizontal overflow.
- Both case-study routes, home, unknown route and browser back exercised. Native project-link click works after scrolling the target into view. CLI click on offscreen targets initially failed silently; corrected by `scrollintoview`, not a site fix.
- Cmd/Ctrl K, fuzzy `vnt`, Tab completion to vs-notrack, Enter navigation, ArrowDown selection, Escape closure and trigger focus restoration verified. `whoami` resolves About; missing query shows actionable empty state. Shift+Tab moves from input to dialog close button, Tab returns. Native dialog supplies modal focus containment.
- Mobile details menu opens and closes after anchor navigation; About hash verified. Escape handler is implemented. Keyboard-focused controls share visible focus styling.
- Strict/Normal architecture selection and `?mode=strict` reload verified. Descriptive output matches pinned source and clearly disclaims runtime privacy guarantees.
- Reduced motion emulation: media query true, computed scroll behavior auto, zero active animations. Intro is session-scoped and never gates content.
- JavaScript disabled through the existing browser CDP session: hydrated=false; palette remains hidden; SSR content and native mobile menu available. Local anchor destinations separately covered by static assertions. Unhydrated architecture controls are disabled with a readable fallback, added after this audit. Full screen-reader and no-JS traversal of every route were not performed.
- Final clean browser session: `errors --json` empty, `console --json` empty after home → project → back → palette. Earlier aggressive navigation/CDP interruption produced one native “AbortError: Transition was skipped”; not reproduced in final normal flow. No Svelte hydration errors seen.
- Local warm browser measurement: TTFB 0.8ms, LCP/FCP 40ms, CLS 0. This is local laboratory evidence, **not deployed performance or a guarantee**. React hydration profiler is inapplicable to Svelte.

## Visual critique and iteration

Screenshots were opened and visually inspected, not merely captured: desktop/full home, mobile/full home, tablet, 320px, case-study desktop/mobile, previous Portfolio page, 404 and social preview.

Refinements after first inspection: reduced hero scale/vertical gaps to expose selected work sooner; tightened mobile CTA rhythm; relaxed case-study heading tracking and balanced wrapping; added safe-area gutters and explicit hover feedback. Avoided adding a fake archive, Lab or screenshot to increase visual volume. Removed an internal-audit sentence from public project copy. Reduced palette JavaScript by passing only project names/slugs instead of shipping full case-study text (8.7KB → 4.7KB raw).

Screenshot directory: `/tmp/portfolio-validation/`.
Key files: `desktop-before.png`, `desktop-final.png`, `home-desktop-full.png`, `home-1440.png`, `home-1280.png`, `home-768.png`, `home-390.png`, `home-320.png`, `mobile-full-before.png`, `case-desktop.png`, `case-mobile.png`, `portfolio-desktop.png`, `palette.png`, `404.png`, `no-javascript.png`.

## Size / hydration

Total emitted JS: 46,571 bytes raw (includes deferred map). Sum of per-file gzip: 18,824 bytes. Palette 4,737 / 2,315 gzip; map 2,949 / 1,193 gzip; Svelte runtime 37,931 / 14,739 gzip; remaining helpers 954 raw. Latin variable font 30,092 bytes; Latin-ext asset is emitted but Unicode-range avoids loading it for normal English copy. No animations library, analytics, visitor GitHub fetch, portrait, video or remote font request. Static page content does not depend on hydration.

## Fresh guidelines audit

Fetched current Vercel Web Interface Guidelines during final review. Fixed input name, dialog overscroll containment, hover feedback, safe-area gutters, heading wrapping and shareable map state. Source checks: semantic controls, labeled combobox, visible focus, reduced motion, skip link, captions and explicit lack of fake contact data. Sentence-case headings and first-person identity intentionally follow the user's more specific copy brief rather than the generic guideline's Title Case/second-person rules.

## Release prerequisites / limits

Public email and production domain remain unknown. GitHub is not a DM substitute. Email/copy controls only render after configuring a real address; clipboard success/error branches have not been browser-tested with an actual approved email. Build-time SITE_URL was tested with reserved test origin `https://portfolio.test`: correct project canonical/sitemap/robots generated; invalid javascript URL rejected. Final output was rebuilt **without** the test origin, so no fake canonical/domain remains.

Confirm real email/domain, test on intended hosting, then independently review. Safari/Firefox, real mobile devices, screen-reader announcements and deployed social scraping were not tested. No broad security or accessibility certification is claimed.
