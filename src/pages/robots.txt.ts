import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\nAllow: /\n${site ? `Sitemap: ${new URL('sitemap-index.xml', site)}\n` : ''}`, { headers: { 'Content-Type': 'text/plain' } });
