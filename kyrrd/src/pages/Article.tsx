import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findPost, POSTS, readingMinutes } from '../journal';
import { findPlate } from '../plates';
import { Photo } from '../components/Photo';
import MapLink from '../components/MapLink';
import PinIcon from '../components/PinIcon';
import NewsletterCard from '../components/NewsletterCard';
import { SocialFollow } from '../components/Social';
import { useSeo, useJsonLd } from '../seo';

const SITE = 'https://kyrrd.pics';

/** Thin glacier bar across the very top that fills as the article is read.
 *  Driven by rAF + a GPU transform (no re-renders, no layout) so it glides. */
function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight || 1;
      const ratio = Math.min(1, Math.max(0, h.scrollTop / max));
      if (ref.current) ref.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="read-progress" ref={ref} />;
}

export default function Article() {
  const { slug } = useParams();
  const post = findPost(slug);
  // the tab and the search result carry seoTitle when the headline alone would
  // not find the place; the h1 below is always the headline itself
  useSeo(post ? `${post.seoTitle ?? post.title} — kyrrð` : 'Journal — kyrrð', post?.excerpt, {
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

      <div className="article-grid">
        <article className="article-main">
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

          {/* The short answer, above the story: what a reader in a hurry needs
              and what a search result or an assistant can quote. */}
          {post.inShort && (
            <div className="in-short">
              <div className="in-short-k">In short</div>
              <p>{post.inShort}</p>
            </div>
          )}
          {post.facts && (
            <table className="fact-table">
              <tbody>
                {post.facts.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

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
            <div className="send-hero">
              <div className="send-hero__tag">
                Send this view <span className="dot">·</span>
              </div>
              <div className="hero-pc">
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
                  <p className="hero-pc__msg">Sending you a piece of Iceland.</p>
                  <div className="hero-pc__meta">
                    <span className="hero-pc__loc">
                      <PinIcon /> {plate.title}
                    </span>
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

          {/* whoever reads a note to the end is the person who actually follows */}
          <div className="aside-card">
            <div className="aside-h">
              Follow the archive <span className="dot">·</span>
            </div>
            <p className="aside-sub" style={{ textAlign: 'left', margin: 0 }}>
              New photographs as they are taken.
            </p>
            <SocialFollow />
          </div>
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
