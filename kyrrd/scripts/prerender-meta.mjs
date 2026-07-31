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
    description: 'An archive of photographs from around Iceland. Pick one, sign it, and send it as a card.',
  },
  {
    path: '/journal',
    title: 'Journal — kyrrð',
    description:
      'Notes from the places in the archive: short, human field notes on where these photographs were taken.',
  },
  {
    path: '/walk',
    title: 'The Long Walk — kyrrð',
    description:
      'A free self-guided walk through the heart of Reykjavík: 30 stops in seven chapters, 5.5 km one way, with the story behind every stop and the practical details checked on foot.',
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
  post: p,
}));

const plates = PLATES.filter((p) => p.image && p.slug).map((p) => ({
  path: `/plate/${p.slug}`,
  title: `${p.title} — kyrrð`,
  description: p.description,
  image: p.image,
  plate: p,
  note: POSTS.find((n) => n.plateSlug === p.slug),
}));

const routes = [...staticPages, ...articles, ...plates];

const tpl = readFileSync(resolve(dist, 'index.html'), 'utf8');

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------------------
// Static body + structured data.
//
// Crawlers that do not run JavaScript (GPTBot, ClaudeBot, PerplexityBot, and
// every social scraper) used to receive an empty <div id="root">, so the whole
// Journal was invisible to them. We now write the real text into that div using
// the site's own class names, so the page is readable and already styled before
// any JavaScript arrives. React clears the container when it mounts and renders
// the interactive version over it.
// ---------------------------------------------------------------------------

/** Words per minute matches the reading time shown in the app. */
const readMinutes = (post) => {
  const words = post.body.join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

function articleBody(post) {
  const paras = post.body
    .map((p, i) => `<p${i === 0 ? ' class="lede"' : ''}>${esc(p)}</p>`)
    .join('\n          ');
  return `<div class="wrap section article-page">
      <div class="article-grid">
        <article class="article-main">
          <header class="article-head">
            <nav class="crumbs article-crumbs"><a href="/journal">Journal</a> <span class="sep">▸</span> <span class="here">Field note</span></nav>
            <div class="kicker">${esc(post.kicker)}</div>
            <h1 class="article-title">${esc(post.title)}</h1>
            <div class="d-cap article-byline">${esc(post.date)} · ${readMinutes(post)} min read</div>
          </header>
          <div class="article-body">
          ${paras}
          </div>
        </article>
      </div>
    </div>`;
}

function plateBody(plate, post) {
  const note = post ? `<p><a href="/journal/${post.slug}">Read the field note about ${esc(plate.title)}</a></p>` : '';
  return `<div class="wrap section pd">
      <nav class="crumbs"><a href="/archive">Archive</a> <span class="sep">▸</span> <span class="here">${esc(plate.title)}</span></nav>
      <h1 class="d-h1">${esc(plate.title)}</h1>
      <div class="d-cap">${esc(plate.place)}${plate.date ? ` · ${esc(plate.date)}` : ''}</div>
      <p class="d-body">${esc(plate.description)}</p>
      ${note}
      <p><a href="/create/${plate.slug}">Sign and send this photograph as a free digital card</a></p>
    </div>`;
}

function pageBody(route) {
  return `<div class="wrap section">
      <h1 class="d-h1">${esc(route.title.replace(' — kyrrð', ''))}</h1>
      <p class="d-body">${esc(route.description)}</p>
    </div>`;
}

/** Article schema for a field note; a person stands behind every one of them. */
const articleLd = (post, url, img) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  image: img,
  datePublished: post.date,
  dateModified: post.date,
  author: { '@type': 'Person', name: 'the person behind kyrrð', url: `${SITE}/about` },
  publisher: { '@type': 'Organization', name: 'kyrrð', url: SITE },
  mainEntityOfPage: url,
  inLanguage: 'en',
});

/** Landmarks are places: give search engines the entity, not just an article. */
const plateLd = (plate, url, img) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  name: plate.title,
  description: plate.description,
  image: img,
  url,
  address: { '@type': 'PostalAddress', addressLocality: 'Reykjavík', addressCountry: 'IS' },
  isAccessibleForFree: true,
  publicAccess: true,
});

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

  // The readable page, written into the root container React will take over.
  const body = route.post
    ? articleBody(route.post)
    : route.plate
      ? plateBody(route.plate, route.note)
      : pageBody(route);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  // Structured data as a second block; the site-wide graph in index.html stays.
  const ld = route.post
    ? articleLd(route.post, url, img)
    : route.plate
      ? plateLd(route.plate, url, img)
      : null;
  if (ld) {
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`,
    );
  }
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
