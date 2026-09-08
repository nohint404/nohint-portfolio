# The workbench of things you can take apart

## Built world
A warm open page, not a dark shell or dashboard. Bricolage Grotesque’s irregular, wide lettering carries the identity. A red signal dot and authored imperfect SVG stroke repeat from prompt to diagrams to contact. Project worlds alternate cobalt, sky, paper; the sandbox owns yellow. Source diagrams are explicitly not product screenshots.

## Tokens
Paper `#F5F2EA`, ink `#11110F`, cobalt `#315CFF`, yellow `#FFD84A`, signature red `#FF4A3D`, sky `#DDECF5`, terminal green `#77D66D` (text `#1E7A34`), near-black `#171715`. Muted ink `#5D564A` on paper, `#B7AF9D` on dark; pale text `#DCE4FF` on cobalt. Project accents from data: vs-notrack yellow, Monolith deep teal `#0E7C7B`, portfolio green-ink. Never use the red decoration for small essential text. Lab is the dark scene; body canvas interpolates between pale scene tints via `data-scene` (+45% viewport observer), instant under reduced motion.

Self-hosted Latin Bricolage Grotesque variable, weights 200–800; technical strings use native monospace. Display identity 17.3vw capped at 282px; section type 48–96px; prose 17–22px, source details 65ch maximum. Tracking never tighter than −.04em. Fonts are preloaded; no third-party font requests.

Fluid 88% shell capped at 1680px. Small screens use 20px side gutters. Scene padding 55–130px, tighter within instrument controls. Breakpoints at 640, 960, 1100 and 1920px implement touch stack, tablet columns, mid-width instruments and large-screen breathing room.

Open prose has no container. Interactive windows alone use 14px radii with directional soft elevation; CTA and small action buttons are pill-ended. Graph nodes have 7px corners to distinguish controls from whole instruments. Consistent native arrow glyphs supplement clear action names; no icons stand in for unlabeled actions.

## Scene and interaction grammar
- Hero: whoami signal, monumental identity, finite 650ms type expansion and 900ms workspace unfolding. Entire page usable from SSR, no covering boot or sessionStorage gate. Three actual project sheets can be selected, spread, shuffled and reset.
- Workspace: fine-pointer proximity and bounded horizontal drag. Pointer capture released on cancellation/lost capture; vertical touch scrolling remains native. Arrow keys move focused sheets, Home/Escape resets; blur settles. Finite spring k190/d23, bounded 1/120s integration and 64ms maximum delta. Stop when settled, offscreen, hidden, reduced or destroyed.
- Projects: full-field visual worlds. vs-notrack mode/inspection diagram retains URL state. Monolith control relationship uses a drawn local-RPC circle and progressive scroll-linked opening. Case studies retain detailed citations and static contribution disclosures.
- Lab: optional bounded command interpreter, eight retained responses maximum, 160 input characters maximum. No execution, network, arbitrary navigation or filesystem.
- About: plain human copy and native disclosure-based contextual stack, not a logo wall.
- Contact: GitHub, email, then Discord. Email surface uses the same finite magnetic response; clipboard feedback is a polite live region with explicit fallback.

No perpetual idle animation, sound, scroll hijacking, canvas or WebGL. Cross-document title transitions and CSS scroll timelines are progressive only. Reduced motion cancels JS motion at runtime and disables CSS/transitions; all facts remain visible.

## Implementation and verification
Scene boundaries are Astro components. Svelte hydrates the above-fold workspace/navigation on load; below-fold terminal/contact/maps only when visible. Source truth lives in typed project/profile data, not animation props or invented telemetry. See `docs/redesign-validation.md` for measured checks and scope of browser review. Independent finish review remains the parent’s acceptance gate.
