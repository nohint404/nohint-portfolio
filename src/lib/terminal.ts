import { projects } from '../data/projects';
import { profile } from '../data/profile';
export const terminalCommands = ['help', 'about', 'projects', 'github', 'stack', 'contact', 'clear', 'neofetch', 'whoami', 'ls', 'cat README.md'];
/** A text lookup, never a shell: no eval, network, filesystem or arbitrary navigation. */
export function terminalReply(raw: string): string {
  const command = raw.trim().replace(/\s+/g, ' ').toLowerCase();
  switch (command) {
    case 'help': return terminalCommands.join('  ·  ');
    case 'whoami': return profile.name;
    case 'about': case 'cat readme.md': return 'nohint404 — developer tooling and web interfaces. Linux is part of how I work. This terminal is a toy, not a connection to my machine.';
    case 'ls': case 'projects': return projects.map(p => `${p.name} — ${p.role}; repository owner: ${p.repositoryOwner}`).join('\n');
    case 'github': return profile.github;
    case 'stack': return projects.map(p => `${p.name}: ${p.technologies.join(', ')}`).join('\n');
    case 'contact': return `GitHub: ${profile.github}\nEmail: ${profile.email}\nDiscord: ${profile.discord}`;
    case 'neofetch': return 'nohint404\n─────────\nSurface: Astro\nInteractions: Svelte\nBuild: Bun\nHost OS: not detected (and none of my business).';
    case 'clear': return '';
    case 'sudo': return 'You already have permission to look around.';
    case 'rm -rf /': return 'Nice try. The only thing being removed is the suspense.';
    case 'vim': return 'You can leave this one. Try :q';
    case ':q': case 'exit': return 'You’re free. The rest of the page was here all along.';
    case '': return '';
    default: return 'Unknown command. Type help for the small, safe list.';
  }
}
