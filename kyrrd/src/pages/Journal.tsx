import { Link } from 'react-router-dom';
import { POSTS, readingMinutes } from '../journal';
import { Photo } from '../components/Photo';
import { useSeo } from '../seo';

export default function Journal() {
  useSeo(
    'Journal — kyrrð',
    'Notes from the places in the archive: short, human guides to quiet corners of the world.',
  );
  return (
    <div className="wrap section">
      <div className="d-label">Journal</div>
      <h1 className="d-h1" style={{ margin: '8px 0 36px', maxWidth: '18ch' }}>
        Notes from the places in the archive.
      </h1>

      <div className="journal-list">
        {POSTS.map((p) => (
          <Link key={p.slug} to={`/journal/${p.slug}`} className="post-row">
            <Photo image={p.image} gradient={p.gradient} alt={p.title} />
            <div className="post-body">
              <div className="kicker">
                {p.kicker} · {readingMinutes(p)} min read
              </div>
              <div className="post-title">{p.title}</div>
              <p style={{ color: 'var(--steel-d)', maxWidth: '46ch' }}>{p.excerpt}</p>
              <span className="read">Read the note →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
