import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PLATES, TAGS } from '../plates';
import PlateCard from '../components/PlateCard';
import { useSeo } from '../seo';

export default function Archive() {
  useSeo(
    'The Archive — kyrrð',
    'An archive of photographs from around Iceland. Pick one, sign it, and send it as a card.',
  );

  // Thirty-five photographs is more than anyone wants to scroll to find one
  // thing, so the archive can be narrowed by what a place is and by name.
  const [tag, setTag] = useState('All');
  const [q, setQ] = useState('');

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PLATES.filter((p) => {
      const byTag = tag === 'All' || (p.tags ?? []).includes(tag);
      const byName = !term || `${p.title} ${p.place}`.toLowerCase().includes(term);
      return byTag && byName;
    });
  }, [tag, q]);

  return (
    <div className="wrap section">
      <div className="archhead">
        <div>
          <div className="d-label">The Archive</div>
          {/* the page's one h1: browsers add their own margins to headings, so
              the spacing is set here to match what the div used to do */}
          <h1 className="d-h2" style={{ margin: '4px 0 0' }}>
            Photographs from around Iceland.
          </h1>
          {/* the archive has a route through it; say so where people are looking */}
          <Link className="on-foot" to="/walk">
            Thirty of these places in one line on foot<b>The Long Walk →</b>
          </Link>
        </div>
      </div>

      <div className="arch-filters">
        <label className="arch-search">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a place"
            aria-label="Search the archive"
          />
        </label>
        <div className="arch-chips">
          {TAGS.map((t) => (
            <button
              key={t}
              className={`chip-sel${t === tag ? ' on' : ''}`}
              onClick={() => setTag(t)}
              aria-pressed={t === tag}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="arch-count">
          {shown.length} of {PLATES.length}
        </span>
      </div>

      {shown.length > 0 ? (
        <div className="grid g4">
          {shown.map((p) => (
            <PlateCard key={p.id} plate={p} />
          ))}
        </div>
      ) : (
        <p className="arch-empty">
          Nothing here by that name. Try another word, or{' '}
          <button className="arch-reset" onClick={() => { setQ(''); setTag('All'); }}>
            show everything
          </button>
          .
        </p>
      )}
    </div>
  );
}
