import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header className="topnav">
      <Link to="/" className="bm">
        kyrr<span className="eth">ð</span>
      </Link>
      <nav className="nav">
        <Link to="/archive">The Archive</Link>
        <Link to="/archive">Editions</Link>
        <Link to="/about">Field Notes</Link>
        <Link to="/inscribe/01" className="btn btn-primary" style={{ padding: '9px 16px' }}>
          Inscribe
        </Link>
      </nav>
    </header>
  );
}
