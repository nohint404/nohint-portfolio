import { monolith } from './monolith';
const vs = 'https://github.com/nohint404/vs-notrack/blob/b107464c01198e3f136e7c8a930af0b20972a9b8/';
const old = 'https://github.com/nohint404/Portfolio/blob/9cf1942760210aad84f046b6f8a72fd6a250f0a9/';
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
    slug: 'portfolio', role: 'Earlier work', repositoryOwner: 'nohint404', name: 'Portfolio', kind: 'Earlier interface experiment',
    description: 'An earlier exploration of the personal web.',
    summary: 'A React portfolio exploring animated typography, interactive presentation and a serverless contact endpoint.',
    technologies: ['React', 'JavaScript', 'Vite', 'Tailwind CSS'],
    repository: 'https://github.com/nohint404/Portfolio',
    sections: [
      { title: 'An interface assembled in React.', text: 'The application composes sections in React, using Framer Motion for entrance handling and Lenis for scroll integration. Vite builds the frontend, with Tailwind CSS in the styling stack.', source: old + 'src/App.jsx#L1-L77', label: 'Read the application composition' },
      { title: 'A small serverless boundary.', text: 'The contact form posts JSON to /api/contact. The serverless endpoint forwards it to an environment-configured Discord webhook. That keeps the webhook URL out of browser code, but the endpoint returns success even when delivery fails or configuration is missing. It is a limitation, not a pattern reused here.', source: old + 'api/contact.js#L1-L79', label: 'Inspect the contact endpoint' },
      { title: 'Source, rather than a live demo.', text: 'The repository’s listed deployment was unavailable during the source audit. The public repository remains the reference. This new site takes a different approach: static Astro pages, small Svelte islands and native scrolling.', source: old + 'package.json#L1-L44', label: 'View the original stack' },
    ],
  },
];
