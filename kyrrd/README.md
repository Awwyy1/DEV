# kyrrð

A quiet photographic archive. _Kyrrð_ (Icelandic) — stillness, calm.

Brand: white-cube / contemporary-gallery identity. The final **ð** is the signature
glyph (accent colour `#3FA9C0`). Romanised "kyrrd"; domain **kyrrd.pics**.

## Stack

Vite + React 19 + TypeScript. Plain CSS (no framework) for a self-contained build.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Content

Photographs live in `src/plates.ts`. Each plate has a placeholder `gradient`; add a
real `image` URL to override it. `location` is per-plate on purpose — the archive
travels anywhere.

## Deploy

Separate Vercel project on the same repo, **Root Directory = `kyrrd`**. Independent
from the site at the repository root.
