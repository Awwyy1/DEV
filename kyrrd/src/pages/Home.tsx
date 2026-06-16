import { Link } from 'react-router-dom';
import { Photo } from '../components/Photo';

export default function Home() {
  return (
    <section className="hero">
      <Photo gradient="linear-gradient(175deg,#ffffff 0%,#eaf1f3 40%,#c4d2d6 72%,#7d9197 100%)" />
      <div className="ov">
        <h1>The North, inscribed.</h1>
        <p>
          An archive released in series. Choose a plate, add a word, and keep it — as a file, a
          print, or a numbered edition.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/archive" className="btn btn-primary">
            Enter the Archive
          </Link>
          <Link to="/about" className="btn btn-ghost">
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}
