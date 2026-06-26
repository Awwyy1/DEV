// Render the ð mark to PNG icons for mobile (Safari/Chrome ignore SVG favicons).
// Run after changing favicon.svg:  node scripts/make-icons.mjs
import sharp from 'sharp';

const GLACIER = '#3FA9C0';
const eth = (bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
  (bg ? `<rect width="100" height="100" fill="${bg}"/>` : '') +
  `<text x="50" y="74" font-size="82" text-anchor="middle" ` +
  `font-family="'Space Grotesk','DejaVu Sans',Arial,sans-serif" font-weight="600" ` +
  `fill="${GLACIER}">ð</text></svg>`;

const out = (name, svg, size) =>
  sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toFile(`public/${name}`);

// transparent for browser tabs, solid white square for home-screen / app icons
await out('favicon-32.png', eth(null), 32);
await out('favicon-16.png', eth(null), 16);
await out('apple-touch-icon.png', eth('#ffffff'), 180);
await out('icon-192.png', eth('#ffffff'), 192);
await out('icon-512.png', eth('#ffffff'), 512);
console.log('icons generated');
