import { monolith } from './monolith';
const vs = 'https://github.com/nohint404/vs-notrack/blob/b107464c01198e3f136e7c8a930af0b20972a9b8/';
const site = 'https://github.com/nohint404/nohint-portfolio/blob/main/';
export interface Contribution { title: string; text: string; source: string; nodes: string[] }
export interface ArchitectureNode { id: string; label: string; detail: string; group: 'media' | 'control'; next?: string }
export interface Project { slug: string; name: string; kind: string; role: 'Owned work' | 'Contributed work' | 'Earlier work'; repositoryOwner: string; description: string; summary: string; technologies: string[]; repository: string; sections: {title: string; text: string; source: string; label: string}[]; contributions?: Contribution[]; architecture?: ArchitectureNode[] }
export const projects: Project[] = [
  {
    slug: 'vs-notrack', role: 'Owned work', repositoryOwner: 'nohint404', name: 'vs-notrack', kind: 'Developer tooling',
    description: 'A closer look at what your editor leaves switched on.',
    summary: 'Scripts for configuring VS Code telemetry, extension behavior and local settings across Linux, macOS and Windows.',
    technologies: ['Bash', 'PowerShell', 'Python', 'GitHub Actions'],
    repository: 'https://github.com/nohint404/vs-notrack',
    sections: [
      { title: 'Configuration is more than a checkbox.', text: 'VS Code configuration spans settings files, extension state and product configuration. The shell script coordinates changes across these layers, with embedded Python handling JSON and SQLite. A separate PowerShell script addresses Windows.', source: vs + 'vscode-obliterate-trackers.sh#L65-L227', label: 'Read the configuration code' },
      { title: 'Two modes. Different tradeoffs.', text: 'Normal mode leaves the default marketplace configuration alone. Strict mode writes Open VSX gallery URLs and extends the optional hosts blocklist. These are configuration choices, not proof that all network traffic has stopped.', source: vs + 'vscode-obliterate-trackers.sh#L110-L124', label: 'Inspect mode selection' },
      { title: 'State deserves a careful edit.', text: 'Before changing the extension-state database, the script makes a timestamped backup. It reads the existing disabled-extension list and appends missing Copilot identifiers using parameterized SQLite statements. JSON parse errors, however, reset the loaded settings object: preservation is not unconditional.', source: vs + 'vscode-obliterate-trackers.sh#L203-L227', label: 'Inspect extension state' },
      { title: 'Test the settings, not just the syntax.', text: 'Linux CI uses disposable HOME fixtures to check selected settings, existing preferences and disabled-extension entries. A strict-mode check compares settings across repeated runs. Windows coverage is parsing and static analysis, not functional execution.', source: vs + '.github/workflows/ci.yml#L22-L99', label: 'Read the CI workflow' },
      { title: 'Read before running.', text: 'This is system-modifying software. It can stop editor processes, remove extension data and change configuration or hosts entries where permissions allow. This portfolio documents the source; it does not execute the scripts or certify privacy guarantees.', source: vs + 'vscode-obliterate-trackers.sh', label: 'Inspect the complete script' },
    ],
  },
  monolith,
  {
    slug: 'portfolio', role: 'Owned work', repositoryOwner: 'nohint404', name: 'nohint-portfolio', kind: 'This website',
    description: 'The site you are reading.',
    summary: 'This website: static Astro pages with small Svelte islands, a shell-style entrance and case studies drawn from public source.',
    technologies: ['Astro', 'Svelte', 'TypeScript', 'Bun'],
    repository: 'https://github.com/nohint404/nohint-portfolio',
    sections: [
      { title: 'Static pages, small islands.', text: 'Routes are prerendered Astro pages. Svelte hydrates only where interaction lives: the command palette, the project finder and the architecture diagrams. Everything else is static HTML.', source: site + 'src/pages/index.astro', label: 'Read the homepage source' },
      { title: 'A shell you can inspect.', text: 'The entrance is a small script, not a framework: staged shell lines, a progress bar and a wipe, all skipped under reduced motion and absent without JavaScript.', source: site + 'src/layouts/Layout.astro', label: 'Inspect the entrance script' },
      { title: 'One typed source for all content.', text: 'Project entries live in a single typed collection that feeds the homepage, detail pages, the palette and the finder, so nothing drifts between them.', source: site + 'src/data/projects.ts', label: 'Read the content layer' },
      { title: 'Checks before claims.', text: 'CI runs Astro and Svelte checks, unit tests, the production build and a static audit that also scans rendered pages for secret patterns and unsupported content.', source: site + '.github/workflows/ci.yml', label: 'Read the CI workflow' },
    ],
  },
];
