import { strict as assert } from 'node:assert';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const pages = ['index.html', 'work/vs-notrack/index.html', 'work/monolith/index.html', 'work/portfolio/index.html', '404.html'];
let links = 0;
const external = new Set<string>();
for (const page of pages) {
  const html = readFileSync(join('dist', page), 'utf8');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${page}: exactly one h1`);
  assert(html.includes('name="description"'), `${page}: description`);
  assert(html.includes('id="main"'), `${page}: skip target`);
  assert(!/gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|-----BEGIN.*PRIVATE KEY/.test(html), `${page}: secret signature`);
  assert(!/Project Alpha|200\+ players|passionate developer|portfolio-psymariux.vercel.app/.test(html), `${page}: unsupported content`);
  for (const [, raw] of html.matchAll(/href="([^"]+)"/g)) {
    const href = raw!.replaceAll('&amp;', '&');
    if (href.startsWith('https:')) { external.add(href); continue; }
    if (href.startsWith('mailto:')) continue;
    const url = new URL(href, `http://validation.invalid/${page.replace('index.html', '')}`);
    const pathname = decodeURIComponent(url.pathname);
    const target = join('dist', pathname.endsWith('/') ? pathname + 'index.html' : pathname);
    assert(existsSync(target), `${page}: missing ${href}`);
    if (url.hash) assert(readFileSync(target, 'utf8').includes(`id="${url.hash.slice(1)}"`), `${page}: missing anchor ${href}`);
    links++;
  }
}
assert(existsSync('dist/share.png'));
const home = readFileSync('dist/index.html', 'utf8');
const contact = home.slice(home.indexOf('id="contact"'));
assert(contact.indexOf('https://github.com/nohint404') < contact.indexOf('mailto:contact@nohint.dev'), 'GitHub before email');
assert(contact.includes('Discord') && contact.includes('nohint404'), 'Discord handle visible');
assert(home.includes('id="lab"') && home.includes('id="terminal-command"'), 'optional terminal present');
assert(!home.includes('boot-shell') && !home.includes('portfolio-visited'), 'no blocking legacy boot');
const monolith = readFileSync('dist/work/monolith/index.html', 'utf8');
assert(monolith.includes('My contribution record.') && monolith.includes('3fbe425de2a611eafcac48c8e857fb52a7c5578c'), 'static contribution evidence');
for (const page of pages) {
  const html = readFileSync(join('dist', page), 'utf8');
  for (const [, asset] of html.matchAll(/(?:src|content)="(\/(?:_astro\/|share)[^"]+)"/g)) assert(existsSync(join('dist', asset!)), `${page}: asset ${asset}`);
}
console.log(`PASS: ${pages.length} static pages; ${links} local links/assets and anchors; metadata, source-only content and secret-signature checks.`);
console.log(`External links (${external.size}):\n${[...external].join('\n')}`);
let js = 0;
for (const file of readdirSync('dist/_astro').filter(file => file.endsWith('.js'))) {
  const content = readFileSync(`dist/_astro/${file}`);
  js += content.length;
  console.log(`${file}: ${content.length} bytes, ${Bun.gzipSync(content).length} gzip`);
}
console.log(`Total emitted JS: ${js} bytes (includes deferred architecture).`);

assert(js < 85000, `JavaScript budget exceeded: ${js} > 85000 bytes`);
