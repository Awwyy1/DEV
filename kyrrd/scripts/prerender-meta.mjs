// Writes a static dist/<route>/index.html for every shareable route with that
// route's own <title>, description, canonical, Open Graph and Twitter tags.
// Social scrapers (WhatsApp, Telegram, iMessage) don't run JS, so they read
// whatever is in the served HTML head — without this they show the homepage
// preview for every link. Vercel serves these files directly (a static file
// wins over the SPA rewrite); React still hydrates and takes over on load.
//
// Runs in `postbuild`, after Vite has produced dist/index.html. Routes come
// from the real catalog, so new articles/plates get their own preview for free.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { transform } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const SITE = 'https://kyrrd.pics';
const DEFAULT_IMAGE = `${SITE}/photos/glacier-edge.jpg`;

async function load(rel) {
  const ts = readFileSync(resolve(root, rel), 'utf8');
  const { code } = await transform(ts, { loader: 'ts', format: 'esm' });
  const url = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
  return import(url);
}

const { PLATES } = await load('src/plates.ts');
const { POSTS } = await load('src/journal.ts');

// Static pages — titles/descriptions mirror each page's useSeo() call.
const staticPages = [
  {
    path: '/archive',
    title: 'The Archive — kyrrð',
    description: 'A quiet archive of photographs. Pick one, sign it, and send it as a card.',
  },
  {
    path: '/journal',
    title: 'Journal — kyrrð',
    description:
      'Notes from the places in the archive: short, human guides to quiet corners of the world.',
  },
  {
    path: '/about',
    title: 'How it works — kyrrð',
    description:
      'How kyrrð works: choose a photograph, add your words, and send it as a signed digital card.',
  },
  { path: '/privacy', title: 'Privacy — kyrrð', description: 'How kyrrð handles your data.' },
  { path: '/terms', title: 'Terms — kyrrð', description: 'The terms for using kyrrð.' },
];

const articles = POSTS.map((p) => ({
  path: `/journal/${p.slug}`,
  title: `${p.title} — kyrrð`,
  description: p.excerpt,
  image: p.image,
  type: 'article',
}));

const plates = PLATES.filter((p) => p.image && p.slug).map((p) => ({
  path: `/plate/${p.slug}`,
  title: `${p.title} — kyrrð`,
  description: p.description,
  image: p.image,
}));

const routes = [...staticPages, ...articles, ...plates];

const tpl = readFileSync(resolve(dist, 'index.html'), 'utf8');

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setMeta(html, attr, key, value) {
  const v = esc(value);
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  return re.test(html)
    ? html.replace(re, `$1${v}$2`)
    : html.replace('</head>', `    <meta ${attr}="${key}" content="${v}" />\n  </head>`);
}

function render(route) {
  const url = SITE + route.path;
  const img = route.image
    ? route.image.startsWith('http')
      ? route.image
      : SITE + route.image
    : DEFAULT_IMAGE;
  let html = tpl;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, 'name', 'description', route.description);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:type', route.type || 'website');
  html = setMeta(html, 'property', 'og:image', img);
  html = setMeta(html, 'name', 'twitter:title', route.title);
  html = setMeta(html, 'name', 'twitter:description', route.description);
  html = setMeta(html, 'name', 'twitter:image', img);
  return html;
}

for (const route of routes) {
  const dir = join(dist, route.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), render(route));
}

console.log(
  `  prerender-meta: ${routes.length} routes (${articles.length} articles, ${plates.length} plates)`,
);
