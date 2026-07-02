import { Link } from 'react-router-dom';
import { POSTS, readingMinutes } from '../journal';
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
      <div className="d-h2" style={{ marginTop: 4, marginBottom: 28 }}>
        Notes from the places in the archive.
      </div>

      <div className="grid g3 journal-grid">
        {POSTS.map((p) => (
          <Link key={p.slug} to={`/journal/${p.slug}`} className="post-card">
            <Photo image={p.image} gradient={p.gradient} alt={p.title} />
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
