import { useEffect } from 'react';

/** Sets per-route <title>, meta description and canonical (good enough for Google's JS crawler). */
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
      }
      m.setAttribute('content', description);
    }

    const href = 'https://kyrrd.pics' + window.location.pathname.replace(/\/$/, '');
    let c = document.querySelector('link[rel="canonical"]');
    if (!c) {
      c = document.createElement('link');
      c.setAttribute('rel', 'canonical');
      document.head.appendChild(c);
    }
    c.setAttribute('href', href === 'https://kyrrd.pics' ? 'https://kyrrd.pics/' : href);
  }, [title, description]);
}
