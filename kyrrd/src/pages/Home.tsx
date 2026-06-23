import { Link } from 'react-router-dom';
import { PLATES } from '../plates';
import PlateCard from '../components/PlateCard';
import { useSeo } from '../seo';

export default function Home() {
  useSeo(
    'kyrrð — sign a photo, send it',
    'Choose a photograph, add your words, and send it as a signed digital card to anyone, anywhere.',
  );
  const featured = PLATES.slice(0, 4);
  return (
    <div className="wrap section">
      <header className="home-intro">
        <div className="d-label">Signed photo-cards</div>
        <h1 className="d-h1 home-title">A photograph, signed and sent.</h1>
        <p className="home-lede">
          Pick a view of Reykjavík, add your words, and send it as a personal digital card to
          someone, anywhere in the world.
        </p>
        <div className="home-cta">
          <Link to="/archive" className="btn btn-primary">
            Choose a photograph
          </Link>
          <Link to="/about" className="btn btn-ghost">
            How it works
          </Link>
        </div>
      </header>

      <div className="archhead home-archhead">
        <div>
          <div className="d-label">From the archive</div>
          <div className="d-h2" style={{ marginTop: 4 }}>
            Notes from quiet corners.
          </div>
        </div>
        <Link to="/archive" className="seeall">
          See all
        </Link>
      </div>
      <div className="grid g4">
        {featured.map((p) => (
          <PlateCard key={p.id} plate={p} />
        ))}
      </div>
    </div>
  );
}
