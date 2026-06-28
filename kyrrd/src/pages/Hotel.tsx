import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { track } from '@vercel/analytics';
import { PLATES } from '../plates';
import { findPartner } from '../partners';
import { useSeo } from '../seo';
import '../hotelpage.css';

const HERO = PLATES.find((p) => p.slug === 'sun-voyager') ?? PLATES[0];

/**
 * Premium co-branded landing the hotel's lobby / in-room QR points to
 * (/hotel/:partner). Standalone, hidden, not linked. The guest picks a
 * Reykjavík landmark and is taken into the editor co-branded with the hotel.
 */
export default function Hotel() {
  const { partner } = useParams();
  const hotel = findPartner(partner);
  const name = hotel?.name ?? 'Your hotel';
  useSeo(`${name} × kyrrð — send a piece of Reykjavík`, 'A guest gift: sign a photograph of Reykjavík and send it home.', {
    image: HERO.image,
  });

  const picks = PLATES.filter((p) => p.image).slice(0, 6);
  const link = (slug: string) => `/create/${slug}${hotel ? `?partner=${hotel.slug}` : ''}`;

  useEffect(() => {
    track('hotel_landing', { partner: partner ?? 'unknown' });
  }, [partner]);

  return (
    <div className="hotelpage">
      <header className="hp-hero">
        <div className="hp-hero-bg" style={{ backgroundImage: `url("${HERO.image ?? ''}")` }} />
        <div className="hp-grad" />
        <div className="hp-cobrand">
          <span className="hp-hotel">{name}</span>
          <span className="hp-x">×</span>
          <span className="hp-km">kyrr<span className="eth">ð</span></span>
        </div>
        <div className="hp-hero-ov">
          <div className="hp-kicker">A gift from your stay</div>
          <h1 className="hp-title">Send a piece of Reykjavík home.</h1>
          <p className="hp-sub">
            Choose a photograph, sign it with your words, and send it — a free digital card in
            seconds, or a real postcard we print and post for you, postmarked Reykjavík.
          </p>
          <a href="#choose" className="btn btn-primary">Choose a photograph</a>
        </div>
      </header>

      <section className="hp-steps wrap">
        <div className="hp-step">
          <div className="hp-step-n">1</div>
          <div className="hp-step-t">Choose</div>
          <div className="hp-step-d">A Reykjavík landmark you love, with the story behind it.</div>
        </div>
        <div className="hp-step">
          <div className="hp-step-n">2</div>
          <div className="hp-step-t">Sign</div>
          <div className="hp-step-d">Add your words and your name. It becomes yours.</div>
        </div>
        <div className="hp-step">
          <div className="hp-step-n">3</div>
          <div className="hp-step-t">Send</div>
          <div className="hp-step-d">Free digital card, or a real postcard we post worldwide.</div>
        </div>
      </section>

      <section id="choose" className="hp-pick wrap">
        <div className="d-label">Reykjavík, picked for you</div>
        <h2 className="hp-h2">Choose your photograph</h2>
        <div className="hp-grid">
          {picks.map((p) => (
            <Link key={p.id} to={link(p.slug ?? p.id)} className="hp-card">
              <div className="hp-card-ph" style={{ backgroundImage: `url("${p.image ?? ''}")` }} />
              <div className="hp-card-cap">
                <span className="hp-card-no">{p.no}</span>
                <span className="hp-card-ttl">{p.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="hp-ways wrap">
        <div className="hp-way">
          <div className="hp-way-tag">Free · instant</div>
          <h3 className="hp-way-t">A digital card</h3>
          <p className="hp-way-d">Signed and ready in seconds. Save it or send the image to anyone, anywhere. A gift from {name}.</p>
        </div>
        <div className="hp-way feat">
          <div className="hp-way-tag">Premium</div>
          <h3 className="hp-way-t">A real postcard</h3>
          <p className="hp-way-d">We print your signed card and post a physical postcard to anyone in the world, postmarked Reykjavík. On the back, a QR opens the story of your landmark.</p>
        </div>
      </section>

      <footer className="hp-foot">
        <div className="wrap hp-foot-in">
          <span>With compliments of <b>{name}</b></span>
          <span className="hp-km">powered by kyrr<span className="eth">ð</span> · kyrrd.pics</span>
        </div>
      </footer>
    </div>
  );
}
