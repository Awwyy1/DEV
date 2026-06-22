import { Link, useParams } from 'react-router-dom';
import { findPost, POSTS } from '../journal';
import { findPlate } from '../plates';
import { Photo } from '../components/Photo';
import MapLink from '../components/MapLink';
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
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="wrap section article">
      <div className="kicker">
        {post.kicker} · {post.readMin} min read
      </div>
      <h1 className="d-h1" style={{ margin: '10px 0 6px' }}>
        {post.title}
      </h1>
      <div className="d-cap article-byline">
        <span>by kyrrð · {post.date}</span>
        {plate && <MapLink plate={plate} />}
      </div>

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
        <div className="article-cta">
          <div className="cta-top">
            <Photo
              gradient={plate.gradient}
              image={plate.image}
              sun={false}
              alt={plate.title}
              className="cta-thumb"
            />
            <div>
              <div className="d-label">Turn this view into a card</div>
              <div className="d-h2" style={{ fontSize: 20, marginTop: 3 }}>
                {post.plateTitle ?? plate.title}
              </div>
            </div>
          </div>
          <Link to={`/inscribe/${plate.slug ?? plate.id}`} className="btn btn-primary cta-btn">
            Sign and send to someone close
          </Link>
        </div>
      )}

      {others.length > 0 && (
        <div className="related">
          <div className="d-label">Keep reading</div>
          <div className="related-list">
            {others.map((p) => (
              <Link key={p.slug} to={`/journal/${p.slug}`} className="related-item">
                <Photo image={p.image} gradient={p.gradient} alt={p.title} />
                <div>
                  <div className="kicker">
                    {p.kicker} · {p.readMin} min
                  </div>
                  <div className="related-title">{p.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
