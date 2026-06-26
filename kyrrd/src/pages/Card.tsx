import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { findPlate } from '../plates';
import { findPartner } from '../partners';
import { POSTS } from '../journal';
import { Photo } from '../components/Photo';
import MapLink from '../components/MapLink';
import { useSeo } from '../seo';
import '../cardpage.css';

/**
 * Hidden landing the QR on the back of a physical card points to (/c/:slug).
 * Not linked or listed anywhere. Shows the story of the landmark on the card
 * and quietly invites the recipient to send their own.
 */
export default function Card() {
  const { slug } = useParams();
  const plate = findPlate(slug);
  const key = plate.slug ?? plate.id;
  const post = POSTS.find((p) => p.plateSlug === key);
  const [params] = useSearchParams();
  const fromHotel = findPartner(params.get('from'));
  useSeo(`${plate.title} — kyrrð`, plate.description);

  // Keep the QR landing out of the index (it mirrors the journal article).
  useEffect(() => {
    const m = document.querySelector('meta[name="robots"]');
    const prev = m?.getAttribute('content') ?? null;
    if (m) m.setAttribute('content', 'noindex, nofollow');
    return () => {
      if (m && prev !== null) m.setAttribute('content', prev);
    };
  }, []);

  useEffect(() => {
    track('qr_landing', { plate: key, from: fromHotel?.slug ?? 'none' });
  }, [key]);

  return (
    <div className="cardpage">
      <header className="cp-hero">
        <Photo
          className="cp-hero-ph"
          image={plate.image}
          gradient={plate.gradient}
          alt={plate.title}
          sun={false}
        />
        <div className="cp-grad" />
        <Link to="/" className="cp-mark-top">
          kyrr<span className="eth">ð</span>
        </Link>
        <div className="cp-hero-ov">
          <div className="cp-kicker">
            {fromHotel ? `Sent with compliments of ${fromHotel.name}` : 'A card from Reykjavík'}
          </div>
          <h1 className="cp-title">{plate.title}</h1>
          <div className="cp-place">
            {plate.place}
            {plate.coords ? ` · ${plate.coords}` : ''}
          </div>
        </div>
      </header>

      <main className="cp-body">
        <p className="cp-intro">
          Someone chose this for you. Here is the story behind the photograph on your card.
        </p>

        <article className="cp-story">
          {post ? (
            post.body.map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <p>{plate.description}</p>
          )}
        </article>

        <div className="cp-map">
          <MapLink plate={plate} />
        </div>

        <section className="cp-cta">
          <div className="cp-cta-kicker">Your turn</div>
          <h2 className="cp-cta-title">Send a piece of Reykjavík to someone you love.</h2>
          <Link to={`/create/${key}`} className="btn btn-primary">
            Make your own card
          </Link>
          <Link to="/archive" className="cp-cta-alt">
            or browse the archive →
          </Link>
        </section>
      </main>

      <footer className="cp-foot">
        <Link to="/" className="cp-mark">
          kyrr<span className="eth">ð</span>
        </Link>
        <small>kyrrd.pics</small>
      </footer>
    </div>
  );
}
