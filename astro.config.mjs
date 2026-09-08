import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
const value = process.env.SITE_URL;
let site;
if (value) {
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment.');
  site = url.origin;
}
export default defineConfig({ site, integrations: [svelte(), ...(site ? [sitemap()] : [])] });
