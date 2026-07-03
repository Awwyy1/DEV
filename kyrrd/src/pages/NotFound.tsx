import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../seo';
import '../notfound.css';

const NF_IMG = '/photos/glacier-edge.jpg';

export default function NotFound() {
  useSeo('Page not found — kyrrð', 'This page has drifted off the map. Let’s get you back.');

  // tell search engines not to index unknown URLs; clean up on leaving
  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, follow';
    document.head.appendChild(m);
    return () => {
      m.remove();
    };
  }, []);

  return (
    <section className="nf">
      <div className="nf-bg" style={{ backgroundImage: `url("${NF_IMG}")` }} />
      <div className="nf-scrim" />
      <div className="nf-in">
        <div className="nf-code">404</div>
        <h1 className="nf-title">This one drifted off the map.</h1>
        <p className="nf-sub">
          The page you were after isn’t here. It may have moved, or it never existed. Let’s get you
          back to solid ground.
        </p>
        <div className="nf-cta">
          <Link to="/" className="btn btn-primary">
            Back to the start
          </Link>
          <Link to="/archive" className="btn nf-btn-2">
            Browse the archive
          </Link>
        </div>
      </div>
    </section>
  );
}
