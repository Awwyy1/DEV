// Render the ð mark to PNG icons (Safari/Chrome ignore SVG favicons, and iOS
// home-screen icons must be opaque PNGs). The exact glyph path is the one in
// favicon.svg (the real Space Grotesk eth, weight 500, traced to a vector path
// so it never depends on a font being installed). Run after editing the path:
//   node scripts/make-icons.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const GLACIER = '#23b1c9';
const CREAM = '#f7f4ee';

// single source of truth for the glyph shape
const d = readFileSync('public/favicon.svg', 'utf8').match(/<path d="([^"]+)"/)[1];

const tab = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${d}" fill="${GLACIER}"/></svg>`;
const tile = (bg, fg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${bg}"/><path d="${d}" fill="${fg}"/></svg>`;

const render = (name, svg, size) =>
  sharp(Buffer.from(svg), { density: 512 }).resize(size, size).png().toFile(`public/${name}`);

// transparent glyph for browser tabs; opaque glacier tile with a cream ð for
// the home-screen / app icon
await render('favicon-32.png', tab, 32);
await render('favicon-16.png', tab, 16);
await render('apple-touch-icon.png', tile(GLACIER, CREAM), 180);
await render('icon-192.png', tile(GLACIER, CREAM), 192);
await render('icon-512.png', tile(GLACIER, CREAM), 512);
console.log('icons generated from favicon.svg path');
