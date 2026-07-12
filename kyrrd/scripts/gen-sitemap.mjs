// Generates public/sitemap.xml from the real catalog so it can never go stale.
// plates.ts / journal.ts are dependency-free data modules, so we strip their
// types with esbuild and import the result — no manual editing of this map ever
// again. Runs as the `prebuild` step, so every deploy ships a sitemap that
// matches the data: add an article or a plate and it appears here on its own.
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { transform } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://kyrrd.pics';
const today = new Date().toISOString().slice(0, 10);

async function load(relPath) {
  const ts = readFileSync(resolve(root, relPath), 'utf8');
  const { code } = await transform(ts, { loader: 'ts', format: 'esm' });
  const url = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
  return import(url);
}

const { PLATES } = await load('src/plates.ts');
const { POSTS } = await load('src/journal.ts');

// A plate is live once it has a real photo and a pretty slug; placeholders ship
// with image: '' and are skipped until a photo is added.
const livePlates = PLATES.filter((p) => p.image && p.slug);

const entries = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/archive', changefreq: 'weekly', priority: '0.9' },
  { loc: '/journal', changefreq: 'weekly', priority: '0.8' },
  { loc: '/walk', changefreq: 'monthly', priority: '0.8' },
  ...POSTS.map((p) => ({ loc: `/journal/${p.slug}`, changefreq: 'monthly', priority: '0.7' })),
  { loc: '/about', changefreq: 'monthly', priority: '0.5' },
  ...livePlates.map((p) => ({ loc: `/plate/${p.slug}`, priority: '0.6' })),
  { loc: '/privacy', priority: '0.2' },
  { loc: '/terms', priority: '0.2' },
];

const body = entries
  .map((e) => {
    const parts = [`<loc>${SITE}${e.loc}</loc>`, `<lastmod>${today}</lastmod>`];
    if (e.changefreq) parts.push(`<changefreq>${e.changefreq}</changefreq>`);
    if (e.priority) parts.push(`<priority>${e.priority}</priority>`);
    return `  <url>${parts.join('')}</url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
console.log(
  `  sitemap.xml: ${entries.length} urls (${POSTS.length} articles, ${livePlates.length} plates)`,
);
