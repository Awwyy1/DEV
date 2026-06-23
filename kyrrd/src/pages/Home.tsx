import { Link } from 'react-router-dom';
import { Photo } from '../components/Photo';
import { useSeo } from '../seo';

export default function Home() {
  useSeo(
    'kyrrð — sign a photo, send it',
    'Choose a photograph, add your words, and send it as a signed digital card to anyone, anywhere.',
  );
  return (
    <section className="hero">
      <Photo className="home-hero-ph" sun={false} />
      <div className="ov">
        <span className="d-label eyebrow">Signed photo-cards</span>
        <h1>A photograph, signed and sent.</h1>
        <p>
          Pick a view, add your words, and send it as a personal digital card to someone, anywhere
          in the world.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/archive" className="btn btn-primary">
            Choose a photograph
          </Link>
          <Link to="/about" className="btn btn-ghost">
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}
