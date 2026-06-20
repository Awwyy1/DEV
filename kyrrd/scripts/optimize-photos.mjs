// Build-output photo optimisation (runs as "postbuild", after Vite copies
// public/ into dist/). It only touches dist/photos, so the source files in
// public/photos stay as your full-size originals (no merge conflicts), while
// the deployed files are light. iPhone JPEGs (3-4 MB) become ~200-350 KB.

import { readdir, stat, writeFile, access } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = fileURLToPath(new URL('../dist/photos/', import.meta.url));

try {
  await access(dir);
} catch {
  console.log('  (no dist/photos, skipping photo optimisation)');
  process.exit(0);
}

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
