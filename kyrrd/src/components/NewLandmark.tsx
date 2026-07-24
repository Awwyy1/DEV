import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { POSTS } from '../journal';
import '../newlandmark.css';

// Remembers the last landmark the visitor has already been shown. When a newer
// field note is added it becomes POSTS[0], the stored slug no longer matches,
// and the popup announces itself once more. Nothing to update by hand.
const SEEN_KEY = 'kyrrd:new-landmark-seen';
const DELAY_MS = 2500;

// Pages where an announcement would be intrusive: the flow of building a card,
// and the article the popup would point at.
const isFlow = (path: string) => /^\/(create|inscribe|done)/.test(path);

export default function NewLandmark() {
  const { pathname } = useLocation();
  const post = POSTS[0]; // the newest field note
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const markSeen = () => {
    try {
      localStorage.setItem(SEEN_KEY, post.slug);
    } catch {
      /* private mode: just skip persistence */
    }
  };

  useEffect(() => {
    if (!post) return;
    const onArticle = pathname === `/journal/${post.slug}`;
    // Already reading it, or mid-flow: count it as seen and never pop.
    if (onArticle || isFlow(pathname)) {
      if (onArticle) markSeen();
      return;
    }
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(SEEN_KEY);
    } catch {
      /* ignore */
    }
    if (seen === post.slug) return;
    setMounted(true);
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
    // run once on first mount; pathname changes shouldn't re-trigger the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Soft close for the X / backdrop / Escape / Maybe later: fade out, then unmount.
  const dismiss = () => {
    markSeen();
    setOpen(false);
    setTimeout(() => setMounted(false), 400);
  };

  // Hard close for navigation: the popup lives in the Layout, which React Router
  // keeps mounted across route changes, so following the Read link would leave it
  // hanging over the article. Remove it at once and release the scroll lock.
  const hardClose = () => {
    markSeen();
    setOpen(false);
    setMounted(false);
    try {
      document.body.style.overflow = '';
    } catch {
      /* ignore */
    }
  };

  // Any route change (the Read link, back/forward) takes the popup down with it.
  useEffect(() => {
    if (mounted) hardClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!mounted || !post) return null;

  // Real photo on top, the note's gradient underneath as a fallback until the
  // image loads (or if it is ever missing).
  const bg = post.image ? `url("${post.image}"), ${post.gradient}` : post.gradient;

  return (
    <>
      <div className={`nl-backdrop${open ? ' on' : ''}`} onClick={dismiss} />
      <div
        className={`nl-modal${open ? ' on' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`New in the archive: ${post.plateTitle ?? post.title}`}
      >
        <div className="nl-card" style={{ backgroundImage: bg }}>
          <button ref={closeRef} className="nl-x" onClick={dismiss} aria-label="Close">
            ×
          </button>
          <span className="nl-mark">
            kyrr<span className="eth">ð</span>.pics
          </span>
          <div className="nl-grad" />
          <div className="nl-cap">
            <div className="k">◆ New field note</div>
            <div className="msg">{post.title}</div>
          </div>
        </div>
        <div className="nl-foot">
          <p className="ex">{post.excerpt}</p>
          <div className="act">
            <Link className="nl-btn" to={`/journal/${post.slug}`} onClick={hardClose}>
              Read the field note →
            </Link>
            <button className="nl-later" onClick={dismiss}>
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
