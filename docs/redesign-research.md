# Research: Astro/Svelte portfolio motion

## Summary
Prefer static Astro pages with native scrolling, one server-rendered Svelte workspace island, CSS/WAAPI decorative animation, and a small, interruptible rAF spring. Treat native cross-document scene transitions as progressive enhancement; introduce Astro ClientRouter or Motion/GSAP only for demonstrated requirements, not merely for polish.

External search and original-page inspection covered eight current official documentation pages. No repository source was changed or inspected; installed versions and actual implementation remain unverified.

## Findings
1. **Claim:** Native cross-document transitions and Astro ClientRouter are different architectural choices. **Sources:** [Astro transitions](https://docs.astro.build/en/guides/view-transitions/), [MDN transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API). **Support:** direct evidence. **Confidence:** high.
   - Astro explicitly says native transitions “don’t alter the core functionality of a multi-page application” or add JavaScript to page load; ClientRouter intercepts navigation and turns the MPA into an SPA, with script/state reinitialization considerations.
   - MDN distinguishes `Document.startViewTransition()` (same-document) from cross-document `pageswap`/`pagereveal`, and says `@view-transition` opts in current and destination documents.
   - **Recommendation/inference:** retain ordinary links and full document navigation; add shared-scene CSS only as enhancement. Keep shared names unique per page and avoid assigning names to every decorative object. Do not use `startViewTransition` availability as proof of cross-document support. Native snapshots are not persistence of the live Svelte island.
   - ClientRouter is justified if preserving the live workspace across routes is genuinely required: Astro documents `transition:persist` retaining island state. Unsupported-browser options are `animate` (default simulation), `swap` (unanimated DOM replacement), and `none` (full navigation). Prefer `swap` if adopting the router but not needing simulated motion.

2. **Claim:** Astro offers hydration timing without abandoning server-rendered content. **Source:** [Astro directives](https://docs.astro.build/en/reference/directives-reference/). **Support:** direct evidence. **Confidence:** high.
   - `client:load` hydrates immediately on page load; `client:idle` waits for initial load/idle, falling back to document `load` without `requestIdleCallback`; `client:visible` hydrates when visible using IntersectionObserver, with optional `rootMargin`.
   - `client:only="svelte"` skips server rendering. **Recommendation/inference:** use `client:load` for an immediately playable hero toy, otherwise `client:visible` with a modest prehydration margin. Preserve an attractive static workspace and all portfolio content before hydration. Visibility hydration is a loading trigger, not evidence of automatic offscreen animation pausing. Do not defer hydration of critical navigation.

3. **Claim:** WAAPI supplies playback control; rAF supplies a timestamped, cancellable frame callback—not a spring solver. **Sources:** [MDN WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [MDN rAF](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame). **Support:** direct evidence. **Confidence:** high.
   - WAAPI supports `play`, `pause`, `reverse`, `finish`, and `cancel`; `Element.animate()` starts immediately. `cancel()` removes animation effects; `finished` rejects on cancellation. MDN recommends avoiding indefinitely retained filling animations and describes `commitStyles()` for retaining values.
   - rAF provides a frame timestamp and returns an ID usable by `cancelAnimationFrame`; its examples calculate progress from elapsed time rather than frame counts.
   - **Recommendation/inference:** CSS for hover/focus states; WAAPI for finite, replayable stroke reveals; one demand-driven rAF loop for pointer-following spring dynamics. For hand-drawn strokes, use authored imperfect SVG paths and animate their dash offset, not continuous random path regeneration. Keep the final visible SVG as the baseline, so missing JS/WAAPI never hides meaningful content. Exact SVG dash-property interoperability was not independently verified within the page budget.
   - **Recommendation/inference:** spring integration should use elapsed time, bounded/substepped large deltas, explicit position/velocity settling thresholds, and a stop condition. Resume with a reset clock after suspension. Keep direct manipulation responsive; avoid a perpetual idle wobble. No frame-rate, compositor, or bundle-size guarantees are established by these sources.

4. **Claim:** Pointer capture retains events outside a dragged element but does not substitute for touch gesture policy. **Source:** [MDN Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events). **Support:** direct evidence. **Confidence:** high.
   - Capture retargets subsequent pointer events; it is implicitly released after `pointerup`/`pointercancel`. A browser may send `pointercancel` when interpreting an interaction as pan/zoom. `touch-action` declares native behavior; `auto` permits defaults, `none` disables them, and `pan-y` allows vertical scrolling.
   - **Recommendation/inference:** preserve page scrolling without wheel interception, body locking, or scroll-smoothing infrastructure. Track one active pointer, capture on the dedicated handle, and terminate drag on up/cancel/lost capture. Keep vertical-scroll-friendly interaction on touch where possible; unrestricted two-axis dragging needs an explicitly bounded handle/region with a deliberate gesture policy, not site-wide `touch-action:none`. Provide keyboard move/reset controls and a non-drag interaction alternative. Test actual phone scrolling and pinch zoom; capture alone does not make both drag and scroll coexist.

5. **Claim:** Reduced-motion preference must be checked initially and monitored during the session for custom JS motion. **Sources:** [MDN matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), [Astro transitions accessibility](https://docs.astro.build/en/guides/view-transitions/#prefers-reduced-motion). **Support:** direct evidence plus stated interpretation. **Confidence:** high.
   - MDN documents reading `.matches` and observing the MediaQueryList `change` event. Astro says its ClientRouter CSS disables all view-transition animations, including fallback animations, when reduced motion is detected.
   - **Recommendation/inference:** use `matchMedia('(prefers-reduced-motion: reduce)')` initially and on `change`; immediately cancel decorative WAAPI, stop spring scheduling, and settle objects to stable positions. Retain direct controls without inertial overshoot. Apply reduced-motion CSS to decorative effects and explicitly opt native MPA transitions out under reduction; ClientRouter’s guarantee does not cover arbitrary island animations or a router-free MPA. On preference restoration, allow future interactions rather than replaying all introductions.

6. **Claim:** Svelte provides client-only initialization and synchronous cleanup registration. **Sources:** [Svelte lifecycle](https://svelte.dev/docs/svelte/lifecycle-hooks), [Astro transitions](https://docs.astro.build/en/guides/view-transitions/), [MDN WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API). **Support:** direct evidence. **Confidence:** high.
   - `onMount` does not run on the server; a function returned from its synchronous callback runs on unmount. An async callback returns a Promise instead, so that cleanup pattern does not work. `onDestroy` also runs in server-side components.
   - **Recommendation/inference:** own media listeners, pointer listeners, observers, rAF IDs, and Animation handles within the island lifecycle. Teardown cancels frames/animations, disconnects observers, removes listeners, and clears active drag state; handle cancellation of awaited `finished` promises.
   - **Recommendation/inference:** explicitly pause decorative motion while offscreen or the document is hidden, and restart only if visible, permitted, and unsettled. Use IntersectionObserver and visibility state as implementation candidates; their detailed lifecycle semantics were not separately researched here. Do not equate “hydrated when visible” with “runs only while visible.”
   - If ClientRouter is chosen, Astro documents `astro:page-load` for initialization after navigation and `astro:before-swap` before replacement. Keep setup idempotent; persisted islands may remain mounted, so unmount cleanup alone is insufficient for route-specific activity.

7. **Claim:** The documented native primitives cover the stated basic interaction needs, but do not establish a measured advantage over libraries. **Sources:** [MDN WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API), [MDN rAF](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame). **Support:** interpretation. **Confidence:** medium.
   - **Recommendation/inference:** native CSS/WAAPI is the starting point for finite effects; a small spring is reasonable while dynamics remain a handful of independent objects and simple targets.
   - Reconsider Motion only when the team needs maintained spring/gesture orchestration beyond that scope; reconsider GSAP when coordinated, interruptible, multi-stage timelines or specialist SVG requirements become costly to maintain. These are evaluation triggers, not verified feature/licensing claims. No Motion/GSAP primary pages or benchmarks were included; library selection requires a targeted proof of concept and current API review if those requirements arise.

## Testing recommendations
Researcher recommendations, not claims of already-tested behavior:
- Run current Chromium, Firefox, and Safari plus real iOS/Android touch tests; explicitly exercise the no-transition fallback rather than assuming one support flag covers all features.
- Test no JavaScript, delayed hydration, direct deep links, hash links, back/forward and restored pages, slow destination loads, and navigation during dragging/animation. Content and links must remain usable.
- Toggle reduced motion while a spring, stroke, and scene transition are active; verify no lingering loop or permanently hidden SVG. Test keyboard-only interaction, focus visibility/order, and screen-reader navigation announcements if ClientRouter is introduced.
- Test pointer release outside bounds, cancellation, multiple pointers, touch vertical scrolling beginning near/on handles, and browser zoom.
- Scroll the toy offscreen, background/restore the tab, resize during motion, and repeatedly navigate away/back. Inspect duplicate listeners, detached nodes, pending frames, and uncaught cancellation rejections.
- Unit-test spring settling, interruption, and large time deltas; visually check high-refresh displays and low-powered devices. Profile the actual SVG/property workload before claiming paint/compositor efficiency.

## Contradictions
No behavioral contradiction established. Astro’s transitions page contains a broad Chromium-oriented browser-support remark alongside newer native-MPA guidance; it is not a reliable browser/version matrix. MDN extraction omitted compatibility table data, so no precise support versions are asserted.

## Missing evidence
- Repository versions, existing dependencies, animation ownership, and current router choice were not inspected.
- Native MPA same-origin restriction and exact `navigation: auto` syntax appeared in external search discovery, but not in the eight fetched originals’ inspected passages; confirm those details in MDN’s linked “Using the View Transition API” before implementation.
- Exact support for SVG dash animation, cross-document transitions/events, and optional WAAPI `commitStyles` across the chosen minimum browsers remains unverified. Baseline rendering must not depend on these optional enhancements.
- `source_check` was invoked for the critical routing/reduced-motion claim; it returned **unclear** and selected a versioned v5 page. That automated check is not treated as validation. Relevant current Astro and MDN originals were fetched and directly inspected instead.

## Sources
Kept (eight primary pages):
- [Astro: View transitions](https://docs.astro.build/en/guides/view-transitions/) — architecture, persistence, fallback, navigation lifecycle, accessibility.
- [Astro: Template directives](https://docs.astro.build/en/reference/directives-reference/) — hydration timing and server rendering.
- [Svelte: Lifecycle hooks](https://svelte.dev/docs/svelte/lifecycle-hooks) — SSR-safe setup and cleanup.
- [MDN: Using WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API) — playback, cancellation, retained styles.
- [MDN: Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) — capture and native touch gestures.
- [MDN: matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) — initial and runtime media-query observation.
- [MDN: View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) — same/cross-document distinction and opt-in surfaces.
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) — timestamps and cancellation.

Rejected/deprioritized: Astro v4/v5/beta search results and version-pinned Svelte playgrounds — current canonical documentation preferred. Search summaries — discovery only, not final evidence. No inspiration scraping or vendor performance marketing used.

## Next steps
Before implementation, inspect the repository’s actual Astro/Svelte versions and router; confirm the small unresolved MPA/SVG compatibility details against the agreed browser floor. Then prototype one draggable object, one stroke, and one route pair with the testing cases above before considering an animation dependency.
