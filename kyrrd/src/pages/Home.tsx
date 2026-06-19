import { Link } from 'react-router-dom';
import { Photo } from '../components/Photo';

export default function Home() {
  return (
    <section className="hero">
      <Photo gradient="linear-gradient(175deg,#ffffff 0%,#eaf1f3 40%,#c4d2d6 72%,#7d9197 100%)" />
      <div className="ov">
        <span className="d-label eyebrow">Signed photo-cards</span>
        <h1>A photograph, signed and sent.</h1>
        <p>
          Pick a view, add your words, and send it as a personal digital card — to someone, anywhere
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
