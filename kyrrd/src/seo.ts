import { useEffect } from 'react';

const SITE = 'https://kyrrd.pics';
const DEFAULT_IMAGE = `${SITE}/photos/glacier-edge.jpg`;

type SeoType = 'website' | 'article';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** '/photos/x.jpg' -> 'https://kyrrd.pics/photos/x.jpg'; absolute urls pass through. */
function absUrl(src?: string): string {
  if (!src) return DEFAULT_IMAGE;
  return src.startsWith('http') ? src : SITE + src;
}

/**
 * Sets per-route <title>, meta description, canonical, Open Graph and Twitter
 * card tags. Google renders the JS and picks these up; a build-time pre-render
 * is still the way to reach non-JS scrapers (social link previews) — that's a
 * separate step.
 */
export function useSeo(
  title: string,
  description?: string,
  opts: { image?: string; type?: SeoType; canonical?: string } = {},
) {
  const image = opts.image;
  const type = opts.type ?? 'website';
  // Pages that are a second view of something else point at the original, so
  // search engines rank one strong page instead of two competing ones.
  const canonicalOverride = opts.canonical;
  useEffect(() => {
    document.title = title;

    const path = window.location.pathname.replace(/\/$/, '');
    const pageUrl = path ? SITE + path : `${SITE}/`;
    const canonical = canonicalOverride ?? pageUrl;
    const img = absUrl(image);

    if (description) upsertMeta('name', 'description', description);

    let c = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!c) {
      c = document.createElement('link');
      c.setAttribute('rel', 'canonical');
      document.head.appendChild(c);
    }
    c.setAttribute('href', canonical);

    upsertMeta('property', 'og:title', title);
    if (description) upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', img);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    if (description) upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);
  }, [title, description, image, type, canonicalOverride]);
}

/**
 * Injects a JSON-LD <script> for the current route and removes it on unmount /
 * route change. Pass null to render nothing (e.g. on a not-found branch).
 */
export function useJsonLd(data: unknown) {
  const json = data ? JSON.stringify(data) : '';
  useEffect(() => {
    if (!json) return;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = json;
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, [json]);
}
