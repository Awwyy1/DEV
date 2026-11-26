import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Every route change starts at the top of the page, unless the link names a
    part of it (/walk#c6), in which case it lands there once it has rendered. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
