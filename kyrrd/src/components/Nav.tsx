import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header className="topnav">
      <Link to="/" className="bm">
        kyrr<span className="eth">ð</span>
      </Link>
      <nav className="nav">
        <Link to="/archive">The Archive</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/about">How it works</Link>
        <Link to="/archive" className="btn btn-primary" style={{ padding: '10px 18px' }}>
          Send a card
        </Link>
      </nav>
    </header>
  );
}
