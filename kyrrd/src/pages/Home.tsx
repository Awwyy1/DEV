import { Link } from 'react-router-dom';
import { PLATES } from '../plates';
import { POSTS, readingMinutes } from '../journal';
import PlateCard from '../components/PlateCard';
import { Photo } from '../components/Photo';
import { useSeo } from '../seo';
import '../home.css';

const HERO_IMG = '/photos/The-Sun-Voyager.jpeg';
const PRODUCT_IMG = '/photos/WaterCarrier.jpeg';

// Floating hero cards — edit to swap the photo, note, sender and style.
// style: 'editorial' (dark, full-bleed) or 'vintage' (sepia, cream frame).
type HeroCardData = {
  image: string;
  message: string;
  from: string;
  place: string;
  style: 'editorial' | 'vintage';
  focus?: string;
};

const HERO_CARDS: HeroCardData[] = [
  {
    image: '/photos/Islandsvardan.jpeg',
    message: "You'd have loved the light here.",
    from: 'Marco',
    place: 'Íslandsvarðan',
    style: 'vintage',
  },
  {
    image: '/photos/WaterCarrier.jpeg',
    message: 'For the one who talks about the north.',
    from: 'Sofia',
    place: 'Water Carrier',
    style: 'editorial',
  },
];

function HeroCardView({ card, pos }: { card: HeroCardData; pos: string }) {
  const bg = { backgroundImage: `url("${card.image}")`, backgroundPosition: card.focus || 'center' };
  if (card.style === 'vintage') {
    return (
      <div className={`hc hc--vintage ${pos}`}>
        <div className="hc-vphoto" style={bg} />
        <div className="hc-vtint" />
        <div className="hc-vframe" />
        <div className="hc-vmark">
          kyrr<span className="eth">ð</span>.pics
        </div>
        <div className="hc-vcap">
          <p className="hc-vmsg">{card.message}</p>
          <div className="hc-vmeta">
            <span>{card.place}</span>
            <span className="hc-vsign">{card.from}</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`hc ${pos}`}>
      <div className="hc-img" style={bg} />
      <div className="hc-grad" />
      <div className="hc-mark">
        kyrr<span className="eth">ð</span>.pics
      </div>
      <div className="hc-cap">
        <p className="hc-msg">{card.message}</p>
        <div className="hc-meta">
          <span>{card.place}</span>
          <span>From {card.from}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useSeo(
    'kyrrð — Iceland, signed and sent',
    'Real photographs of Iceland, taken on a phone. Pick one, sign it with your words, and send it free to anyone.',
  );
  const picks = PLATES.filter((p) => p.image).slice(0, 4);
  const notes = POSTS.slice(0, 3);

  return (
    <div className="hm">
      {/* HERO */}
      <section className="hm-hero">
        <div className="hm-hero-bg" style={{ backgroundImage: `url("${HERO_IMG}")` }} />
        <div className="hm-hero-grad" />
        <div className="hm-hero-in">
          <div className="hm-htxt">
            <h1 className="hm-h1">A photograph, signed and sent.</h1>
            <p className="hm-sub">
              Real photographs of Iceland, taken on a phone. Pick&nbsp;one, sign it with your own
              words, and send it to someone who matters. Free, in under a minute.
            </p>
            <div className="hm-cta">
              <Link to="/archive" className="btn btn-primary">
                Send a card
              </Link>
              <Link to="/about" className="btn hm-btn-light">
                How it works
              </Link>
            </div>
            <div className="hm-trust">
              <span>
                <i>✓</i> Free to send
              </span>
              <span>
                <i>✓</i> No filters
              </span>
              <span>
                <i>✓</i> No account
              </span>
            </div>
          </div>
          <div className="hm-cards">
            {HERO_CARDS.map((c, i) => (
              <HeroCardView key={i} card={c} pos={i === 0 ? 'hc-a' : 'hc-b'} />
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="hm-manifesto">
        <div className="wrap">
          <div className="hm-mk">No pretension</div>
          <h2 className="hm-mh">Shot on a phone. On purpose.</h2>
          <p className="hm-mp">
            No drones, no filters, no stock library. These are real photographs of Iceland, taken by
            one person walking around with a phone. That is the whole point. A card should feel like a
            person made it and sent it, because one did.
          </p>
          <div className="hm-chips">
            <span>
              No <b>filters</b>
            </span>
            <span>
              No <b>stock</b>
            </span>
            <span>
              No <b>drones</b>
            </span>
            <span>
              Made by <b>a person</b>
            </span>
            <span>
              For <b>real people</b>
            </span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hm-sec wrap">
        <div className="hm-shead">
          <div className="d-label">How it works</div>
          <h2 className="hm-h2">Three steps, under a minute.</h2>
          <p>No design tools, no account. A card in the time it takes to write one line.</p>
        </div>
        <div className="hm-steps">
          <div className="hm-step">
            <div className="hm-n">01</div>
            <h3>Choose</h3>
            <p>Pick a photograph of Iceland, with the field note behind it.</p>
          </div>
          <div className="hm-step">
            <div className="hm-n">02</div>
            <h3>Sign</h3>
            <p>Add your words and your name. It becomes yours.</p>
          </div>
          <div className="hm-step">
            <div className="hm-n">03</div>
            <h3>Send</h3>
            <p>Save it and send it to someone you hold dear, anywhere. Free.</p>
          </div>
        </div>
      </section>

      {/* ARCHIVE SHOWCASE */}
      <section className="hm-arch">
        <div className="wrap">
          <div className="hm-ahead">
            <div>
              <div className="d-label">The archive</div>
              <h2 className="hm-h2">Real places, one at a time.</h2>
            </div>
            <Link to="/archive" className="hm-all">
              Browse all →
            </Link>
          </div>
          <div className="grid g4">
            {picks.map((p) => (
              <PlateCard key={p.id} plate={p} />
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="hm-sec wrap">
        <div className="hm-shead">
          <div className="d-label">Not just a photo</div>
          <h2 className="hm-h2">Every one has a story.</h2>
          <p>
            Behind each photograph there is a short field note: who made the statue, why the
            lighthouse stands where it does, what happened on that square. You send the picture, and
            they get the story with it.
          </p>
        </div>
        <div className="grid g3 journal-grid">
          {notes.map((p) => (
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

      {/* PRODUCT */}
      <section className="hm-sec wrap hm-show">
        <div className="hm-pc-wrap">
          <div className="hm-pc">
            <div className="hm-pc-img" style={{ backgroundImage: `url("${PRODUCT_IMG}")` }} />
            <div className="hm-pc-grad" />
            <div className="hm-pc-mark">
              kyrr<span className="eth">ð</span>.pics
            </div>
            <div className="hm-pc-b">
              <p className="hm-pc-msg">Sending you a piece of Iceland.</p>
              <div className="hm-pc-meta">
                <span>Water Carrier</span>
                <span>From Emma</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-label">The card</div>
          <div className="hm-stitle">This is what lands in their hands.</div>
          <p className="hm-lede">
            A real photograph, your words set into it, and your name at the foot. Saved as an image
            you can send through any messenger, to anyone.
          </p>
          <ul className="hm-feats">
            <li>
              <span className="hm-ic">◆</span>
              <div>
                <b>Three formats.</b> Post, Story or Square, so it fits wherever you send it.
              </div>
            </li>
            <li>
              <span className="hm-ic">✎</span>
              <div>
                <b>Your words, your name.</b> A shared joke, a memory, one line.
              </div>
            </li>
            <li>
              <span className="hm-ic">↗</span>
              <div>
                <b>Send anywhere.</b> Through any messenger, to anyone in the world.
              </div>
            </li>
          </ul>
          <Link to="/archive" className="btn btn-primary">
            Make your card
          </Link>
        </div>
      </section>

      {/* EMOTIONAL */}
      <section className="hm-emotional">
        <div className="wrap">
          <h2 className="hm-quote">Some things deserve more than a text.</h2>
          <p>A real photograph someone chose, with a line only you would write.</p>
          <Link to="/archive" className="btn btn-primary">
            Send a piece of Iceland
          </Link>
        </div>
      </section>

      {/* FINAL */}
      <section className="hm-sec wrap hm-final">
        <h2 className="hm-h2">Pick a photograph. Sign it. Send it.</h2>
        <p>Free, and ready before the kettle boils.</p>
        <Link to="/archive" className="btn btn-primary">
          Start with the archive
        </Link>
      </section>
    </div>
  );
}
