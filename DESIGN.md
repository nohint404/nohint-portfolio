---
name: nohint404
description: An inspectable developer archive typeset as a living specimen.
colors:
  paper: "#f4f0e8"
  carbon: "#171817"
  card-paper: "#fbf8f1"
  popover-paper: "#fffdf8"
  action-paper: "#f9f5ec"
  warm-wash: "#e9e4da"
  quiet-ink: "#5f605b"
  rule: "#cbc6bc"
  input-paper: "#d8d2c8"
  cobalt-signal: "#2d5bff"
  cobalt-pale: "#8ca6ff"
  white: "#fff"
  warning-red: "#c33122"
  link-rule: "#aaa49a"
  scrollbar: "#b8b1a5"
  portrait-ground: "#ded8ce"
  nav-glass: "rgb(255 253 248 / .8)"
typography:
  hero:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "clamp(4.25rem, 16.4vw, 12.5rem)"
    fontWeight: 470
    lineHeight: 0.76
    letterSpacing: "-.075em"
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3rem, 9vw, 7rem)"
    fontWeight: 600
    lineHeight: 0.8
    letterSpacing: "-.045em"
  body:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.6vw, 1.18rem)"
    lineHeight: 1.65
  label:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontSize: ".86rem"
    fontWeight: 650
  mono:
    fontFamily: "Geist Mono Variable, SFMono-Regular, Consolas, monospace"
    fontSize: ".72rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: ".14em"
rounded:
  pill: "999px"
  circle: "50%"
spacing:
  frame-mobile: "2rem"
  frame-tablet: "3rem"
  island-inset: "1rem"
  control: "2.75rem"
  action: ".65rem 1rem"
  section: "clamp(5rem, 11vw, 9rem)"
components:
  button-ink:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.action-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "{spacing.action}"
    height: "{spacing.control}"
  button-ink-hover:
    backgroundColor: "{colors.cobalt-signal}"
    textColor: "{colors.white}"
  text-link:
    textColor: "{colors.carbon}"
    typography: "{typography.label}"
    height: "{spacing.control}"
  navigation-island:
    backgroundColor: "{colors.nav-glass}"
    rounded: "{rounded.pill}"
    padding: ".35rem .4rem .35rem 1rem"
    height: "3.25rem"
---

# Design System: nohint404

## Overview

**Creative North Star: "The Living Type Specimen"**

nohint404 is an inspectable developer archive, not a dashboard portfolio. It gives real work the visual authority: warm paper carries oversized type, hard editorial rules partition evidence, and a single cobalt registration signal directs attention to actions, indices, and state.

The system is light, sparse, and physical without nostalgia. The central experience is a sequence of typeset records with generous silence around them; the navigation is the only floating object. The overall character is precise, engineering-first, restrained, and quietly assertive.

**Key Characteristics:**

- Warm paper field, carbon ink, and one cobalt signal.
- Extreme type-scale contrast with condensed editorial display faces and practical variable sans body copy.
- Fine horizontal rules and archive-record structures in place of cards or dashboard modules.
- A small translucent navigation island, while all content remains flat on the paper.
- Sparse, reduced-motion-aware interaction that confirms physical intent rather than decorating the page.

## Colors

Warm paper and carbon form the working field; cobalt is a scarce registration mark, never a second background system.

### Primary

- **Cobalt Signal:** reserved for high-value interaction, focus, selection, record indices, and the specimen alphabet.

### Neutral

- **Paper:** the continuous page ground.
- **Carbon:** the primary reading ink, hard section rules, and default ink actions.
- **Card Paper and Popover Paper:** slight lifts for contained UI only; they should not create a card-grid aesthetic.
- **Warm Wash:** quiet hover fill for navigation controls and secondary surfaces.
- **Quiet Ink:** supporting prose, captions, metadata, and descriptions.
- **Rule:** low-contrast archive dividers; carbon rules introduce major sections.
- **Action Paper:** light text on carbon actions and dark overlays.
- **Cobalt Pale:** a brightened cobalt used only as the dark-menu hover state.
- **Warning Red:** semantic destructive feedback, not a decorative accent.

### Named Rules

**The One Signal Rule.** Cobalt is the only expressive color. Use it to register an action, focus target, selected command, or archive index; do not spread it across static surfaces.

**The Paper Continuity Rule.** Content stays on the paper ground by default. A pale surface may contain a control or overlay, but must not turn the archive into a tiled interface.

## Typography

**Display Font:** Barlow Condensed, with a sans-serif fallback.

**Body Font:** Geist Variable, with system-ui and sans-serif fallbacks.

**Label/Mono Font:** Geist Mono Variable, with SFMono-Regular, Consolas, and monospace fallbacks.

**Character:** Barlow Condensed makes section titles and project names feel like specimen labels enlarged to poster scale. Geist keeps the evidence legible, while Geist Mono supplies small archival coordinates and technical metadata.

### Hierarchy

- **Hero:** the expressive, oversized `nohint404` wordmark; it is set in Geist and may increase its variable weight on pointer proximity.
- **Display:** Barlow Condensed carries section headings, project records, menu links, and the concise hero statement.
- **Body:** Geist carries explanation and project summaries in long, calm measures that stop before the page becomes text-dense.
- **Label:** medium-weight Geist labels actions, navigation, and operational controls.
- **Mono:** uppercase, tracked Geist Mono denotes source paths, repository names, stacks, captions, and specimen strings.

### Named Rules

**The Scale-Over-Decoration Rule.** Establish hierarchy with size, compression, weight, rules, and space—not color blocks, badges, or decorative effects.

**The Archive Caption Rule.** Technical metadata is small, mono, tracked, and secondary. It annotates the work; it never competes with a title.

## Layout

The page is a single wide archive column with no persistent sidebar. Content is framed to a maximum of 78rem, then breathes heavily through clamp-based vertical bands. The hero fills most of the first viewport and establishes the type specimen before any project record appears.

Major sections begin with a carbon rule. At narrow widths, project records and capability definitions stack naturally; at 48rem the archive and lower sections move into two or four columns where the information benefits from comparison. At 64rem, featured work adds a dedicated index column. The fixed header keeps a smaller maximum width than the content frame and never becomes conventional app chrome.

**The Rule Before Module Rule.** Separate consequential archive material with a line and space, not a filled card or container treatment.

## Elevation & Depth

This is a flat-by-default paper system. Depth comes from editorial order, thin rules, tonal contrast, and the lone floating navigation island. The island is a translucent popover with background blur and a soft ambient shadow; the mobile navigation sheet and command palette use a stronger dark-overlay shadow only while open.

### Shadow Vocabulary

- **Navigation ambient:** `0 10px 30px rgb(32 31 28 / .08)` for the fixed island.
- **Overlay structural:** `0 20px 55px rgb(32 31 28 / .22)` for the mobile menu sheet.

**The Floating Exception Rule.** Only navigation and transient overlays may float. Archive records, sections, and evidence remain optically attached to the paper.

## Shapes

The system is deliberately bifurcated: continuous controls and the floating island are fully pill-shaped, while content is rectangular and rule-led. The portrait is the only circular content silhouette. There are no rounded content cards; borders are fine, straight, and functional.

## Components

### Ink Actions

- **Character:** compact, tactile calls to inspect or continue.
- **Shape:** full pill with a consistent touch-sized minimum height.
- **Primary:** carbon field with light action text; it is used for the primary project, contact, and mobile-menu actions.
- **Hover / Active:** hover shifts the field to cobalt; active compresses slightly. Maintain the visible cobalt focus outline supplied globally.

### Text Links

- **Character:** evidence-forward secondary actions, never muted into invisibility.
- **Style:** carbon text with a fine warm-gray underline; hover changes both text and underline to cobalt.
- **Use:** pair with an ink action when a choice needs a clear primary and an inspectable secondary path.

### Navigation Island

- **Character:** the page's one controlled floating object.
- **Style:** translucent popover-paper pill with backdrop blur, ambient shadow, condensed wordmark, and compact pill controls.
- **States:** muted navigation links gain a warm-wash hover; the mobile trigger reverses to carbon and turns cobalt on hover. More-transparency and more-contrast preferences simplify or reinforce the island.
- **Responsive behavior:** full navigation appears at the tablet breakpoint; below it, a dark menu sheet opens beneath the island.

### Command Palette

- **Character:** the sole signature interaction: a dark, deliberate navigation instrument.
- **Style:** carbon surface with light text and a cobalt selected row. Keep repository-like numbering and keyboard shortcuts visible; it is an operational overlay, not a chat or search dashboard.

### Archive Records

- **Character:** real projects treated as inspectable typeset records.
- **Structure:** a carbon top rule introduces featured work; smaller archive records use quiet dividers and align title, summary, stack, and directional mark across responsive columns.
- **Interaction:** archive records reveal their action state by turning cobalt and shifting right slightly; use this sparingly and respect reduced-motion settings.

### Profile Portrait

- **Style:** a small circular image on a subdued paper ground, rendered in grayscale with modest contrast. It supports the archive, rather than becoming a personal-brand hero image.

## Do's and Don'ts

### Do:

- **Do** let projects, repositories, and inspectable paths provide the visual evidence.
- **Do** use the paper-and-rule structure to make long pages feel calm and scannable.
- **Do** reserve cobalt for interaction, focus, selection, and archival registration marks.
- **Do** make all motion sparse and physical; preserve the reduced-motion and reduced-transparency fallbacks.
- **Do** keep controls keyboard-visible and touch-sized, with the shared high-contrast cobalt focus treatment.

### Don't:

- **Don't** add conventional app chrome, a sidebar, dashboard cards, metric tiles, or generic SaaS panels.
- **Don't** introduce extra accent colors, gradients, purple glows, terminal theatrics, or glass surfaces beyond the navigation island.
- **Don't** use rounded content cards; let rules, type scale, and whitespace establish the archive hierarchy.
- **Don't** fabricate proof through employers, client logos, statistics, testimonials, or decorative technical motifs.
