import { Link } from 'react-router-dom';
import { POSTS } from '../journal';
import { Photo } from '../components/Photo';
import { useSeo } from '../seo';

export default function Journal() {
  useSeo(
    'Journal — kyrrð',
    'Notes from the places in the archive: short, human guides to quiet corners of the world.',
  );
  const [featured, ...rest] = POSTS;
  return (
    <div className="wrap section">
      <div className="d-label">Journal</div>
      <h1 className="d-h1" style={{ margin: '8px 0 28px', maxWidth: '18ch' }}>
        Notes from the places in the archive.
      </h1>

      {featured && (
        <Link to={`/journal/${featured.slug}`} className="featured">
          <Photo image={featured.image} gradient={featured.gradient} alt={featured.title} />
          <div className="kicker" style={{ marginTop: 16 }}>
            {featured.kicker} · {featured.readMin} min read
          </div>
          <div className="d-h2" style={{ margin: '8px 0 6px' }}>
            {featured.title}
          </div>
          <p style={{ color: 'var(--steel-d)', maxWidth: '60ch' }}>{featured.excerpt}</p>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="grid g3" style={{ marginTop: 44 }}>
          {rest.map((p) => (
            <Link key={p.slug} to={`/journal/${p.slug}`} className="post-card">
              <Photo image={p.image} gradient={p.gradient} alt={p.title} />
              <div className="kicker" style={{ marginTop: 12 }}>
                {p.kicker} · {p.readMin} min
              </div>
              <div className="post-title">{p.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
