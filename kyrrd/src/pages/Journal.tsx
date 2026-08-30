import { Link } from 'react-router-dom';
import { POSTS, photoAlt, readingMinutes } from '../journal';
import { Photo } from '../components/Photo';
import { useSeo } from '../seo';

export default function Journal() {
  useSeo(
    'Journal — kyrrð',
    'Notes from the places in the archive: short, human field notes on where these photographs were taken.',
  );
  return (
    <div className="wrap section">
      <div className="d-label">Journal</div>
      {/* the page's one h1; the margins keep the spacing the div had */}
      <h1 className="d-h2" style={{ margin: '4px 0 0' }}>
        Notes from the places in the archive.
      </h1>
      <Link className="on-foot" to="/walk" style={{ marginBottom: 28 }}>
        Walk past thirty of them in an afternoon<b>The Long Walk →</b>
      </Link>

      <div className="grid g3 journal-grid">
        {POSTS.map((p) => (
          <Link key={p.slug} to={`/journal/${p.slug}`} className="post-card">
            <Photo image={p.image} gradient={p.gradient} alt={photoAlt(p)} />
            <div className="post-card-body">
              <div className="kicker">
                {p.kicker} · {readingMinutes(p)} min read
              </div>
              <div className="post-title">{p.title}</div>
              <span className="read">Read the note →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
