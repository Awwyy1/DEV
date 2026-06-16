import { Link } from 'react-router-dom';

const STEPS = [
  ['01', 'Choose a photograph', 'Browse the archive and pick a view that fits the moment.'],
  ['02', 'Add your words', 'Sign it — a name, a dedication, a quiet note. Always laid out for you.'],
  ['03', 'Pay $4.99', 'One price, one card. No bundles, no fuss.'],
  ['04', 'Download & send', 'Get your signed image instantly, or let us send it to them for you.'],
];

export default function About() {
  return (
    <div className="wrap section" style={{ maxWidth: 760 }}>
      <div className="d-label">How it works</div>
      <h1 className="d-h1" style={{ margin: '8px 0 16px' }}>
        Turn a photograph into a card.
      </h1>
      <p className="d-lead" style={{ color: 'var(--steel-d)' }}>
        kyrrð is a small archive of quiet photographs. Pick one, add your words, and send it as a
        signed digital card — to someone, anywhere in the world.
      </p>

      <div style={{ marginTop: 36 }}>
        {STEPS.map(([n, t, d]) => (
          <div className="edition" key={n}>
            <div style={{ display: 'flex', gap: 16 }}>
              <span className="d-label" style={{ marginTop: 3 }}>
                {n}
              </span>
              <div>
                <div className="nm" style={{ fontFamily: 'var(--disp)', fontWeight: 500, fontSize: 18 }}>
                  {t}
                </div>
                <div className="ds" style={{ fontSize: 13.5, color: 'var(--steel-d)', marginTop: 3, maxWidth: '52ch' }}>
                  {d}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="d-cap" style={{ marginTop: 28 }}>
        Previews are shown watermarked and reduced; your clean, signed image arrives the moment you
        pay.
      </p>

      <Link to="/archive" className="btn btn-primary" style={{ marginTop: 28 }}>
        Choose a photograph
      </Link>
    </div>
  );
}
