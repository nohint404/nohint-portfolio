# Code Context

## Scope and decision
Public GitHub discovery performed 2026-09-07 via authenticated `gh api` against PUBLIC endpoints only. `users/nohint404/repos?per_page=100&sort=updated --paginate` returned all 5 public repositories; profile confirms public_repos=5. No private repositories queried. No project files changed. Target is empty and approved for new implementation.

**Use two projects, not 4–6.** Lead with vs-notrack because its implementation and recent authored history supply the strongest technical evidence, without calling it a flagship. Present Portfolio as an earlier interface experiment. Exclude empty Mods/nohint-portfolio and Icarus fork from selected work. There is no meaningful remaining archive; don't pad one.

**Superseded 2026-09-08: the old React repo was deleted. The third entry is now this site itself (nohint-portfolio, Astro/Svelte). Below is the original research record.**

## Files Retrieved
Remote paths below use exact repository-relative paths, current main at retrieval. Pin claims to commits when possible.
1. `nohint404/vs-notrack/vscode-obliterate-trackers.sh` lines 1–100, 110–330: Bash orchestration, embedded Python JSON/SQLite manipulation, mode selection, backups, environment/hosts/launcher operations.
2. `nohint404/vs-notrack/vscode-obliterate-trackers.ps1` lines 1–95: Windows parameters, privilege checks, backups and settings manipulation.
3. `nohint404/vs-notrack/.github/workflows/ci.yml` lines 1–99 (complete): Linux syntax/ShellCheck, fake-HOME functional checks, strict-mode idempotence check; Windows parser/PSScriptAnalyzer checks.
4. `nohint404/vs-notrack/README.md` lines 1–150: intended usage and documented tradeoffs. Marketing absolutes are NOT independently established.
5. `nohint404/Portfolio/package.json` lines 1–44 (complete): React 19, Vite 8, Tailwind 4, animation dependencies.
6. `nohint404/Portfolio/src/App.jsx` lines 1–77 (complete): composition of UI sections, motion/Lenis and analytics.
7. `nohint404/Portfolio/api/contact.js` lines 1–79 (complete): POST endpoint forwarding to environment-configured Discord webhook; misleading unconditional success, not a model to reuse.
8. `nohint404/Portfolio/src/components/ui/ContactForm.jsx` lines 1–130: React form state and fetch boundary.
9. `nohint404/Portfolio/vercel.json` lines 1–8 (complete): Vite static output plus SPA rewrites excluding API.
10. `nohint404/Portfolio/src/components/sections/Hero.jsx` lines 1–106; `Projects.jsx` lines 1–170; `CurrentProjects.jsx` lines 1–160; `src/components/ui/SocialIcons.jsx` lines 1–49: identity/copy/contact audit, NOT proof of listed projects.
11. `nohint404/Portfolio/README.md` lines 1–16: uncustomized Vite README, insufficient alone.
12. `nohint404/Icarus-Launcher/README.md` lines 1–94 and recursive tree: inherited launcher overview; contribution comparison is decisive below.

## Key Code / verified project content

### vs-notrack
- Exact repository: https://github.com/nohint404/vs-notrack
- Verified latest main: `b107464c01198e3f136e7c8a930af0b20972a9b8`; recent 5 commit records resolve author.login=nohint404. Latest authored date 2026-09-07. History: https://github.com/nohint404/vs-notrack/commits/main/
- Suggested concise description: “Scripts for configuring VS Code telemetry, extension behavior and local settings across Linux, macOS and Windows.” This describes implementation intent, not guaranteed network privacy.
- Safe tags: Bash, PowerShell, Python, GitHub Actions. SQLite may appear in technical detail, not as broad database expertise.
- Modes: normal keeps default marketplace configuration; strict writes Open VSX gallery URLs. Interactive menu plus environment switches: https://github.com/nohint404/vs-notrack/blob/b107464c01198e3f136e7c8a930af0b20972a9b8/vscode-obliterate-trackers.sh#L5-L50 and #L110-L124
- JSON settings: timestamp backup, Python loads existing valid JSON, merges settings and ignored extension list. Do NOT say it universally preserves settings: parse errors reset data to an empty dictionary. https://github.com/nohint404/vs-notrack/blob/b107464c01198e3f136e7c8a930af0b20972a9b8/vscode-obliterate-trackers.sh#L65-L75 and #L110-L137
- Extension state: backs up VS Code `state.vscdb`, queries existing disabled-extension JSON, appends missing Copilot entries and writes with SQLite parameter binding. https://github.com/nohint404/vs-notrack/blob/b107464c01198e3f136e7c8a930af0b20972a9b8/vscode-obliterate-trackers.sh#L203-L227
- Product configuration, optional hosts changes, Linux launchers: https://github.com/nohint404/vs-notrack/blob/b107464c01198e3f136e7c8a930af0b20972a9b8/vscode-obliterate-trackers.sh#L239-L317
- Windows script supports switches, checks administrator privileges, backs up touched settings: https://github.com/nohint404/vs-notrack/blob/main/vscode-obliterate-trackers.ps1#L1-L49
- Test design is an interesting case-study section: disposable HOME fixtures verify selected settings, existing preferences/disabled entries retained, normal marketplace separation, strict-mode repeatability. Windows CI is syntax/static analysis, NOT Windows functional coverage. https://github.com/nohint404/vs-notrack/blob/b107464c01198e3f136e7c8a930af0b20972a9b8/.github/workflows/ci.yml#L22-L99
- Compact architecture visual can truthfully show “mode selection → settings / extension state / product configuration → optional system changes”; label it an implementation map, never simulated live output.
- No screenshots in repository tree. Use a designed source/architecture visualization rather than fake app imagery.
- Status wording: “Public source · updated September 2026” or omit timestamp. Do not assert build passing: runs not checked. Do not repeat README “zero Microsoft”, “under 2 seconds”, guaranteed privacy, universal safety, or production maturity. Scripts were NOT executed because they alter the host.

### Portfolio (previous iteration — repo deleted, research record only)
- Repository: https://github.com/nohint404/Portfolio
- Main at retrieval: `9cf1942760210aad84f046b6f8a72fd6a250f0a9`.
- Suggested description: “An earlier React portfolio exploring animated typography, interactive presentation and a serverless contact endpoint.”
- React / Vite / Tailwind dependencies: https://github.com/nohint404/Portfolio/blob/9cf1942760210aad84f046b6f8a72fd6a250f0a9/package.json#L1-L44
- Sections composed in React, Framer Motion entrance handling and Lenis scroll integration: https://github.com/nohint404/Portfolio/blob/9cf1942760210aad84f046b6f8a72fd6a250f0a9/src/App.jsx#L1-L77
- Client contact form posts JSON, server endpoint uses `process.env.DISCORD_WEBHOOK_URL`: https://github.com/nohint404/Portfolio/blob/9cf1942760210aad84f046b6f8a72fd6a250f0a9/src/components/ui/ContactForm.jsx#L23-L56 and https://github.com/nohint404/Portfolio/blob/9cf1942760210aad84f046b6f8a72fd6a250f0a9/api/contact.js#L1-L79
- Architecture “React interface → /api/contact → configured Discord webhook” is supported, but do not advertise reliable delivery: endpoint returns success even on webhook failure/absence. New portfolio should NOT reuse this behavior.
- Deployment configuration: https://github.com/nohint404/Portfolio/blob/9cf1942760210aad84f046b6f8a72fd6a250f0a9/vercel.json#L1-L8 . Do not copy npm workflow into new Bun project.
- Repo homepage `https://portfolio-psymariux.vercel.app` checked by HTTP HEAD: **404 DEPLOYMENT_NOT_FOUND**. Omit live link.
- Public asset candidate: https://raw.githubusercontent.com/nohint404/Portfolio/main/src/assets/hero.png . Tree verifies file exists, but image was not visually inspected; don't call it a screenshot or infer likeness/ownership. `public/Hope.mp3` also exists but rights unverified: do not reuse audio.
- Recent history contains Vercel bot integrations and null-login merge authors; do not attribute all lines/dependencies solely to user. Owning this original public repository supports showcasing its implementation, not claims of sole authorship of third-party visual components.
- **Do not import the old content data:** `Projects.jsx` lists Custom RP Framework, Survival Plugin Suite, Game Server Manager, Vehicle System, Discord Bot Platform, Minigame Engine, including 200+ players. No matching public implementations found. `CurrentProjects.jsx` lists Prodigy and literal ????; these are unsupported, not portfolio evidence. The old hero's many language claims and availability label are not corroboration.

### Exclusions
- `Icarus-Launcher`: public fork of `fraa2a/Icarus-Launcher`, ultimate source `modrinth/code`. https://api.github.com/repos/nohint404/Icarus-Launcher
- Cross-fork comparison `https://api.github.com/repos/fraa2a/Icarus-Launcher/compare/main...nohint404:main` returned status=behind, ahead_by=0, behind_by=635, commits=[], files=[]. No unique current fork changes demonstrated. Exclude from owned work, and do not claim Rust/Tauri/Vue expertise from inherited files. This does not prove user never contributed upstream; history attribution beyond comparison was not exhaustively investigated.
- `Mods` and `nohint-portfolio`: size=0 in public enumeration; exclude as empty. New site can later list itself once implementation actually exists, not as discovery proof.

## Architecture / positioning
Evidence supports **developer tooling and web interfaces**, not AI infrastructure, local model systems, or a seniority/job label. Suggested hero territory: “Tools for the way I work. Interfaces for the web.” Identity `nohint404`; supporting copy “Linux-minded tooling and web interfaces, with the source open to inspection.” Linux identity is explicitly user-provided and shell implementation supports the tooling half. Keep claims specific, no grand distributed systems narrative.

Capabilities should be small and project-linked, not portrayed as recurring across many repos:
- Local tooling: Bash, PowerShell, Python → vs-notrack.
- Interface development: JavaScript, React, CSS/Tailwind → Portfolio.
- Verification/deployment: GitHub Actions → vs-notrack; Vercel configuration → Portfolio.
Astro/Svelte/TypeScript/Bun are required for the NEW site, not established recurring historical skills. Label as “This site” after implementation if shown.

## Contact and identity
Public profile: https://github.com/nohint404 ; name/login nohint404, email null, blog empty (https://api.github.com/users/nohint404).
Old source says PsyMariux, links GitHub psymariux and has Discord/X `#` placeholders: https://github.com/nohint404/Portfolio/blob/main/src/components/ui/SocialIcons.jsx and src/components/sections/Hero.jsx. Do not reuse placeholders or assume old alias is preferred today. No verified email/LinkedIn/personal Discord found. Icarus README Discord belongs to upstream community, not a personal contact.
Parent is asking user for public email. Until confirmed, avoid fake email/copy-email command and false contact forms. GitHub is verified but not a direct messaging channel.

## Start Here
Worker should first open `vs-notrack/vscode-obliterate-trackers.sh` at the pinned URL above, then its CI file. These provide a concrete, distinctive source-backed technical story and a truthful architectural interaction. Use two editable curated project entries with source URLs, no GitHub API calls per visitor. No need for a large archive or contrived lab section.

## Coverage / gaps
All five public repository metadata records enumerated with pagination. Both original nonempty repos inspected through trees, README, manifests/config and selected implementation; fork compared to parent. No builds/tests executed on source projects, no screenshots captured, no claims of runtime guarantees. No private data fetched, no host-modifying scripts executed, no secrets printed. Deployment homepage checked and rejected. Research is enough for a two-project content map; richer career, contact, or additional work must come from user-approved evidence rather than padding.
