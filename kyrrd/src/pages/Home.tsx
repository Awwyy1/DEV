import { Link } from 'react-router-dom';
import { PLATES } from '../plates';
import PlateCard from '../components/PlateCard';
import { useSeo } from '../seo';
import '../home.css';

const HERO_IMG = '/photos/The-Sun-Voyager.jpeg';
const PRODUCT_IMG = '/photos/WaterCarrier.jpeg';

export default function Home() {
  useSeo(
    'kyrrð — Iceland, signed and sent',
    'Real photographs of Iceland, taken on a phone. Pick one, sign it with your words, and send it free to anyone.',
  );
  const picks = PLATES.filter((p) => p.image).slice(0, 4);

  return (
    <div className="hm">
      {/* HERO */}
      <section className="hm-hero">
        <div className="hm-hero-bg" style={{ backgroundImage: `url("${HERO_IMG}")` }} />
        <div className="hm-hero-grad" />
        <div className="hm-hero-in wrap">
          <span className="hm-eyebrow">
            <span className="hm-pip" /> Iceland · shot on a phone, no filters
          </span>
          <h1 className="hm-h1">A photograph, signed and sent.</h1>
          <p className="hm-sub">
            Real photographs of Iceland, taken on a phone. Pick one, sign it with your own words, and
            send it to someone who matters. Free, in under a minute.
          </p>
          <div className="hm-cta">
            <Link to="/archive" className="btn btn-primary">
              Send a card
            </Link>
            <Link to="/archive" className="btn hm-btn-light">
              Browse the archive
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
            <p>A photograph of Iceland you like, with the field note behind it.</p>
          </div>
          <div className="hm-step">
            <div className="hm-n">02</div>
            <h3>Sign</h3>
            <p>Add your message and your name. It becomes yours.</p>
          </div>
          <div className="hm-step">
            <div className="hm-n">03</div>
            <h3>Send</h3>
            <p>Save it and send it to anyone, anywhere. Free.</p>
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
                <span>From Anna</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-label">The card</div>
          <div className="hm-stitle">This is what lands in their hands.</div>
          <p className="hm-lede">
            A real photograph, your words set into it, and your name at the foot. Saved as an image
            you can send through any app, or print.
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
                <b>Send anywhere.</b> Message, post, or print and mail it.
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
