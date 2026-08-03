import { Link, useParams } from 'react-router-dom';
import { PLATES, findPlate } from '../plates';
import { POSTS, readingMinutes } from '../journal';
import PlateCard from '../components/PlateCard';
import MapLink from '../components/MapLink';
import PinIcon from '../components/PinIcon';
import { WALK } from '../walk';
import { useSeo, useJsonLd } from '../seo';

const SITE = 'https://kyrrd.pics';

/** Which stop this photograph is on The Long Walk, if it is on it at all. */
const walkStop = (() => {
  const map = new Map<string, number>();
  let n = 0;
  for (const ch of WALK) for (const s of ch.stops) map.set(s.slug, ++n);
  return (slug?: string) => (slug ? map.get(slug) : undefined);
})();

export default function PlateDetail() {
  const { id } = useParams();
  const plate = findPlate(id);
  useSeo(`${plate.title} — kyrrð`, plate.description, { image: plate.image });
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'kyrrð', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Archive', item: `${SITE}/archive` },
      { '@type': 'ListItem', position: 3, name: plate.title },
    ],
  });

  const key = plate.slug ?? plate.id;
  const stopNo = walkStop(plate.slug);
  // the field note tied to this photo, if one exists
  const note = POSTS.find((p) => p.plateSlug === plate.slug);
  // a few other photos to keep browsing — the next ones in the archive, wrapping
  const withImg = PLATES.filter((p) => p.image);
  const idx = withImg.findIndex((p) => p.id === plate.id);
  // 4 so mobile shows a clean 2x2; desktop hides the 4th and keeps a row of 3
  const more =
    idx >= 0 ? [...withImg.slice(idx + 1), ...withImg.slice(0, idx)].slice(0, 4) : withImg.slice(0, 4);

  return (
    <div className="wrap section pd">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/archive">Archive</Link>
        <span className="sep" aria-hidden="true">
          ▸
        </span>
        <span className="here">{plate.title}</span>
      </nav>

      <div className="grid g2 pd-grid" style={{ alignItems: 'start' }}>
        {/* the photo shown as the finished card */}
        <div className="hero-pc pd-pc">
          <div
            className="hero-pc__img"
            style={{
              backgroundImage: `url("${plate.image ?? ''}")`,
              backgroundPosition: plate.focus || 'center',
            }}
          />
          <div className="hero-pc__grad" />
          <div className="hero-pc__mark">
            kyrr<span className="eth">ð</span>.pics
          </div>
          <div className="hero-pc__body">
            <p className="hero-pc__msg">A piece of Iceland, for you.</p>
            <div className="hero-pc__meta">
              <span className="hero-pc__loc">
                <PinIcon /> {plate.title}
              </span>
              <span>From you</span>
            </div>
          </div>
        </div>

        <div className="pd-col">
          <h1 className="d-h1 pd-title" style={{ margin: '0 0 5px' }}>
            {plate.title}
          </h1>
          <div className="d-cap pd-cap">
            <span>{plate.place}</span>
            <span className="pd-map-inline">
              {' · '}
              <MapLink plate={plate} />
            </span>
          </div>
          <div className="pd-map-block">
            <MapLink plate={plate} />
          </div>

          <div className="pd-text">
            <p className="d-body" style={{ color: 'var(--steel-d)', margin: '16px 0 8px' }}>
              {plate.description}
            </p>

            <div className="pd-readrow">
              {plate.date && <span className="pd-date">{plate.date}</span>}
              {note && (
                <>
                  {plate.date ? ' · ' : ''}
                  <Link to={`/journal/${note.slug}`} className="pd-read">
                    Read the field note · {readingMinutes(note)} min →
                  </Link>
                </>
              )}
            </div>

            {/* every stop points back at the route it belongs to */}
            {stopNo && (
              <Link className="pd-walk" to="/walk">
                <span className="pd-walk-no">{String(stopNo).padStart(2, '0')}</span>
                <span>
                  Stop {stopNo} of 30 on <b>The Long Walk</b>, our free self-guided walking tour of
                  Reykjavík →
                </span>
              </Link>
            )}
          </div>

          <div className="pd-cta">
            <Link
              to={`/create/${key}`}
              className="btn btn-primary"
              style={{ marginTop: 22, width: '100%' }}
            >
              Sign &amp; send this photo
            </Link>
            <p className="pd-trust">Free · ready in seconds · send by any messenger</p>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="pd-more">
          <div className="recent-h">
            <div>
              <div className="d-label">Keep exploring</div>
              <div className="d-h2" style={{ marginTop: 4 }}>
                More from the archive
              </div>
            </div>
            <Link to="/archive" className="recent-all">
              All photos →
            </Link>
          </div>
          <div className="grid g3">
            {more.map((p) => (
              <PlateCard key={p.id} plate={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
