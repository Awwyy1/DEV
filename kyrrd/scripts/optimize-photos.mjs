// Build-time photo optimisation.
// iPhone JPEGs come in at 3–4 MB and 4000px wide, which makes the gallery slow.
// This downsizes everything in public/photos to a sensible web size and
// re-encodes it, so uploads can stay full-size while the served files are light.
// Runs automatically before every build (see "prebuild" in package.json).

import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = fileURLToPath(new URL('../public/photos/', import.meta.url));
const MAX = 1600; // longest edge, plenty for 4:5 cards even on retina
const QUALITY = 80;

const files = await readdir(dir);
for (const f of files) {
  if (!['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())) continue;
  const p = join(dir, f);
  try {
    const before = (await stat(p)).size;
    const buf = await sharp(p, { failOn: 'none' })
      .rotate() // bake in EXIF orientation, then drop the tag
      .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();
    if (buf.length < before) {
      await writeFile(p, buf);
      console.log(`  ${f}: ${Math.round(before / 1024)}KB -> ${Math.round(buf.length / 1024)}KB`);
    }
  } catch (e) {
    console.warn(`  skip ${f}: ${e.message}`);
  }
}
