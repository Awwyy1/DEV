import { Link } from 'react-router-dom';
import { useSeo } from '../seo';

const STEPS = [
  ['01', 'Choose', 'Pick a photograph of Iceland, with the field note behind it.'],
  ['02', 'Sign', 'Add your words and your name. It becomes yours.'],
  ['03', 'Send', 'Save it and send it to someone you hold dear, anywhere. Free.'],
];

export default function About() {
  useSeo(
    'How it works — kyrrð',
    'How kyrrð works: choose a photograph, add your words, and send it as a signed digital card.',
  );
  return (
    <div className="wrap section" style={{ maxWidth: 760 }}>
      <div className="d-label">How it works</div>
      <h1 className="d-h1" style={{ margin: '8px 0 16px' }}>
        Turn a photograph into a card.
      </h1>
      <p className="d-lead" style={{ color: 'var(--steel-d)' }}>
        kyrrð is a small archive of photographs from around Iceland. Pick one, add your words, and send it as a
        signed digital card to someone, anywhere in the world.
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

      <Link to="/archive" className="btn btn-primary" style={{ marginTop: 28 }}>
        Choose a photograph
      </Link>
    </div>
  );
}
