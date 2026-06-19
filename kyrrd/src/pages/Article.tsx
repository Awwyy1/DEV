import { Link, useParams } from 'react-router-dom';
import { findPost } from '../journal';
import { findPlate } from '../plates';
import { Photo } from '../components/Photo';
import { useSeo } from '../seo';

export default function Article() {
  const { slug } = useParams();
  const post = findPost(slug);
  useSeo(post ? `${post.title} — kyrrð` : 'Journal — kyrrð', post?.excerpt);

  if (!post) {
    return (
      <div className="wrap section">
        <div className="d-h2">Note not found.</div>
        <Link to="/journal" className="btn btn-primary" style={{ marginTop: 16 }}>
          Back to the Journal
        </Link>
      </div>
    );
  }

  const plate = post.plateSlug ? findPlate(post.plateSlug) : undefined;

  return (
    <article className="wrap section article">
      <div className="kicker">
        {post.kicker} · {post.readMin} min read
      </div>
      <h1 className="d-h1" style={{ margin: '10px 0 6px' }}>
        {post.title}
      </h1>
      <div className="d-cap">by kyrrð · {post.date}</div>

      <Photo image={post.image} gradient={post.gradient} alt={post.title} className="article-hero" />

      <div className="article-body">
        {post.body.map((para, i) =>
          i === 0 ? (
            <p className="lede" key={i}>
              {para}
            </p>
          ) : (
            <p key={i}>{para}</p>
          ),
        )}
      </div>

      {plate && (
        <Link to={`/plate/${plate.slug ?? plate.id}`} className="cta-card">
          <Photo gradient={plate.gradient} image={plate.image} sun={false} alt={plate.title} />
          <div>
            <div className="d-label">Send this view as a card</div>
            <div className="d-h2" style={{ fontSize: 20, marginTop: 3 }}>
              {post.plateTitle ?? plate.title}
            </div>
          </div>
          <span className="arrow">→</span>
        </Link>
      )}
    </article>
  );
}
