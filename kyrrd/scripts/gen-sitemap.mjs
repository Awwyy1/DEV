// Generates public/sitemap.xml from the real catalog so it can never go stale.
// plates.ts / journal.ts are dependency-free data modules, so we strip their
// types with esbuild and import the result — no manual editing of this map ever
// again. Runs as the `prebuild` step, so every deploy ships a sitemap that
// matches the data: add an article or a plate and it appears here on its own.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
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
const { POSTS, firstSentence } = await load('src/journal.ts');
const { WALK } = await load('src/walk.ts');
const { buildStatues, STATUES_DESCRIPTION } = await load('src/statues.ts');
const STATUES = buildStatues(PLATES, POSTS, WALK, firstSentence);

// A plate is live once it has a real photo and a pretty slug; placeholders ship
// with image: '' and are skipped until a photo is added.
const livePlates = PLATES.filter((p) => p.image && p.slug);

// ---------------------------------------------------------------------------
// lastmod. It used to be the build date on every URL, every build, and a date
// that is always today tells Google nothing, so it learns to ignore it and
// misses the real edits. Each page now has a fingerprint of what it shows;
// scripts/lastmod.json keeps the fingerprint and the day it last changed, and
// the date moves only when the fingerprint does. A page seen for the first time
// takes the date of the last commit to its source.
// ---------------------------------------------------------------------------
const src = (rel) => readFileSync(resolve(root, rel), 'utf8');
const fingerprint = (...parts) =>
  createHash('sha1')
    .update(parts.map((p) => (typeof p === 'string' ? p : JSON.stringify(p))).join('\n'))
    .digest('hex')
    .slice(0, 16);
const MANIFEST = resolve(root, 'scripts/lastmod.json');
const known = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const seen = {};
function committed(rel) {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${rel}"`, {
      cwd: root,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return d || today;
  } catch {
    return today;
  }
}
function lastmod(loc, print, seedFrom) {
  const was = known[loc];
  const date = was?.hash === print ? was.date : was ? today : committed(seedFrom);
  seen[loc] = { hash: print, date };
  return date;
}

const walkImages = WALK.map((ch) => PLATES.find((p) => p.slug === ch.photoSlug)?.image).filter(Boolean);

const entries = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: '1.0',
    print: fingerprint(src('src/pages/Home.tsx'), livePlates.slice(0, 4), POSTS.slice(0, 3).map((p) => p.title)),
    seed: 'src/pages/Home.tsx',
  },
  {
    loc: '/archive',
    changefreq: 'weekly',
    priority: '0.9',
    print: fingerprint(src('src/pages/Archive.tsx'), livePlates.map((p) => [p.title, p.place, p.image])),
    seed: 'src/pages/Archive.tsx',
  },
  {
    loc: '/journal',
    changefreq: 'weekly',
    priority: '0.8',
    print: fingerprint(src('src/pages/Journal.tsx'), POSTS.map((p) => [p.slug, p.title, p.image])),
    seed: 'src/pages/Journal.tsx',
  },
  {
    loc: '/walk',
    changefreq: 'monthly',
    priority: '0.8',
    print: fingerprint(src('src/pages/Walk.tsx'), src('src/walk.ts')),
    seed: 'src/walk.ts',
    // the chapter photographs, now real images on the page
    images: walkImages,
  },
  {
    loc: '/statues',
    changefreq: 'monthly',
    priority: '0.8',
    print: fingerprint(src('src/pages/Statues.tsx'), STATUES.items.map((i) => [i.name, i.line, i.by, i.year, i.image])),
    seed: 'src/statues.ts',
    images: STATUES.items.map((i) => i.image),
  },
  ...POSTS.map((p) => ({
    loc: `/journal/${p.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    print: fingerprint(p),
    seed: 'src/journal.ts',
    // the photograph the note opens with, so image search finds it from here
    // rather than only by crawling the page
    images: p.image ? [p.image] : [],
  })),
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: '0.5',
    print: fingerprint(src('src/pages/About.tsx')),
    seed: 'src/pages/About.tsx',
  },
  // Photograph pages whose story lives in a field note point their canonical at
  // that note, so only the notes belong here; a sitemap lists canonical URLs.
  ...livePlates
    .filter((p) => !POSTS.some((n) => n.plateSlug === p.slug))
    .map((p) => ({
      loc: `/plate/${p.slug}`,
      priority: '0.6',
      print: fingerprint(p),
      seed: 'src/plates.ts',
      images: [p.image],
    })),
  { loc: '/privacy', priority: '0.2', print: fingerprint(src('src/pages/Privacy.tsx')), seed: 'src/pages/Privacy.tsx' },
  { loc: '/terms', priority: '0.2', print: fingerprint(src('src/pages/Terms.tsx')), seed: 'src/pages/Terms.tsx' },
];

const body = entries
  .map((e) => {
    const parts = [`<loc>${SITE}${e.loc}</loc>`, `<lastmod>${lastmod(e.loc, e.print, e.seed)}</lastmod>`];
    if (e.changefreq) parts.push(`<changefreq>${e.changefreq}</changefreq>`);
    if (e.priority) parts.push(`<priority>${e.priority}</priority>`);
    for (const img of e.images ?? []) parts.push(`<image:image><image:loc>${SITE}${img}</image:loc></image:image>`);
    return `  <url>${parts.join('')}</url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
// rewritten only when something moved, so an unchanged build leaves no diff
const sorted = Object.fromEntries(Object.keys(seen).sort().map((k) => [k, seen[k]]));
const manifest = JSON.stringify(sorted, null, 2) + '\n';
if (!existsSync(MANIFEST) || readFileSync(MANIFEST, 'utf8') !== manifest) writeFileSync(MANIFEST, manifest);
const moved = Object.keys(seen).filter((k) => known[k]?.hash !== seen[k].hash).length;
console.log(
  `  sitemap.xml: ${entries.length} urls (${POSTS.length} articles, ${livePlates.length} plates), lastmod moved on ${moved}`,
);

// ---------------------------------------------------------------------------
// llms.txt — a plain map of the site for language models, generated from the
// same catalogue so it can never drift from what is actually published.
// ---------------------------------------------------------------------------
const llms = `# kyrrð

> Real photographs of Reykjavík taken on foot, the true story behind each one,
> and a free digital postcard you can sign and send. Everything here is free to
> read and free to send. Nothing is stock, nothing is generated: every picture
> was taken on a phone by the person who walked there, in whatever weather the
> day gave.

Facts are checked on location. When something turns out to be wrong it is
corrected rather than quietly left, and monuments missing from the maps have
been added to them.

## Field notes
${POSTS.map((p) => `- [${p.seoTitle ?? p.title}](${SITE}/journal/${p.slug}): ${p.inShort ?? p.excerpt}`).join('\n')}

## Photographs
${livePlates.map((p) => `- [${p.title}](${SITE}/plate/${p.slug}): ${p.description}`).join('\n')}

## Guides
- [The Long Walk](${SITE}/walk): a free self-guided walk through Reykjavík, 30 stops in seven chapters, 5.5 km, with the distances and the practical details measured on foot.
- [Statues and sculptures of Reykjavík](${SITE}/statues): ${STATUES_DESCRIPTION} ${STATUES.counts.all} works by area, with who made each one and when, and ${STATUES.onWalk} of them on The Long Walk.

## About
- [How it works](${SITE}/about): choose a photograph, add your words, send it as a signed digital card.
`;

writeFileSync(resolve(root, 'public/llms.txt'), llms);
console.log(`  llms.txt: ${POSTS.length + livePlates.length} entries`);
