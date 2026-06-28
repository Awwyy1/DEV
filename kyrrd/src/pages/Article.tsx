import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findPost, POSTS, readingMinutes } from '../journal';
import { findPlate } from '../plates';
import { Photo } from '../components/Photo';
import MapLink from '../components/MapLink';
import NewsletterCard from '../components/NewsletterCard';
import { useSeo, useJsonLd } from '../seo';

const SITE = 'https://kyrrd.pics';

/** Thin glacier bar across the very top that fills as the article is read. */
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight || 1;
      setPct(Math.min(100, Math.max(0, (h.scrollTop / max) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="read-progress" style={{ width: `${pct}%` }} />;
}

export default function Article() {
  const { slug } = useParams();
  const post = findPost(slug);
  useSeo(post ? `${post.title} — kyrrð` : 'Journal — kyrrð', post?.excerpt, {
    image: post?.image,
    type: 'article',
  });
  useJsonLd(
    post
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: post.image ? `${SITE}${post.image}` : undefined,
            author: { '@type': 'Organization', name: 'kyrrð' },
            publisher: {
              '@type': 'Organization',
              name: 'kyrrð',
              logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` },
            },
            mainEntityOfPage: `${SITE}/journal/${post.slug}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'kyrrð', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE}/journal` },
              { '@type': 'ListItem', position: 3, name: post.title },
            ],
          },
        ]
      : null,
  );

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
  const key = plate ? (plate.slug ?? plate.id) : undefined;
  const others = POSTS.filter((p) => p.slug !== post.slug);
  // "Most read" is a curated order (the landmarks people actually search for,
  // per Search Console) so it stays distinct from the most-recent strip below.
  const POPULAR = [
    'grotta-lighthouse',
    'sun-voyager',
    'domkirkjan',
    'hallgrimskirkja',
    'einar-benediktsson',
    'harpa',
    'black-cone',
    'unknown-bureaucrat',
  ];
  const rank = (slug: string) => (POPULAR.indexOf(slug) + 1 || 99);
  const mostRead = [...others].sort((a, b) => rank(a.slug) - rank(b.slug)).slice(0, 5);
  const recent = others.slice(0, 3);

  return (
    <div className="wrap section article-page">
      <ReadingProgress />

      <header className="article-head">
        <nav className="crumbs article-crumbs" aria-label="Breadcrumb">
          <Link to="/journal">Journal</Link>
          <span className="sep" aria-hidden="true">
            ▸
          </span>
          <span className="here">Field note</span>
        </nav>

        <div className="kicker">
          {post.kicker} · {readingMinutes(post)} min read
        </div>
        <h1 className="article-title">{post.title}</h1>
        <div className="d-cap article-byline">
          <span>by kyrrð · {post.date}</span>
          {plate && <MapLink plate={plate} />}
        </div>
      </header>

      <Photo
        image={post.image}
        gradient={post.gradient}
        alt={post.title}
        className="article-hero"
      />

      <div className="article-grid">
        <article className="article-main">
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
              <Link to={`/create/${key}`} className="btn btn-primary cta-btn">
                Sign and send to someone close
              </Link>
            </div>
          )}
        </article>

        <aside className="article-aside">
          {plate && (
            <div className="aside-card send-this">
              <div className="aside-h">
                Send this view <span className="dot">·</span>
              </div>
              <div className="mini-pc">
                <div
                  className="mini-pc__img"
                  style={{ backgroundImage: `url("${plate.image ?? ''}")` }}
                />
                <div className="mini-pc__grad" />
                <div className="mini-pc__mark">
                  kyrr<span className="eth">ð</span>.pics
                </div>
                <div className="mini-pc__body">
                  <p className="mini-pc__msg">Wish you were here.</p>
                  <div className="mini-pc__meta">
                    <span>{plate.title}</span>
                    <span>From you</span>
                  </div>
                </div>
              </div>
              <Link to={`/create/${key}`} className="btn btn-primary aside-btn">
                Make your card
              </Link>
              <p className="aside-sub">Free · ready in seconds</p>
            </div>
          )}

          <div className="aside-card">
            <div className="aside-h">
              Most read <span className="dot">·</span>
            </div>
            <ol className="ranks">
              {mostRead.map((p, i) => (
                <li key={p.slug}>
                  <span className="n">{i + 1}</span>
                  <div>
                    <Link to={`/journal/${p.slug}`}>{p.title}</Link>
                    <span className="rmeta">Field note · {readingMinutes(p)} min</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <NewsletterCard />
        </aside>
      </div>

      {recent.length > 0 && (
        <section className="recent-notes">
          <div className="recent-h">
            <div>
              <div className="d-label">Keep reading</div>
              <div className="d-h2" style={{ marginTop: 4 }}>
                Recent notes
              </div>
            </div>
            <Link to="/journal" className="recent-all">
              All notes →
            </Link>
          </div>
          <div className="grid g3 journal-grid">
            {recent.map((p) => (
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
        </section>
      )}
    </div>
  );
}
