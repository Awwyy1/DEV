import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="topnav">
        <Link to="/" className="bm" onClick={close}>
          kyrr<span className="eth">ð</span>
        </Link>

        <div className="nav-right">
          <nav className="nav">
            <Link to="/archive">The Archive</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/about">How it works</Link>
            <Link to="/archive" className="btn btn-primary" style={{ padding: '10px 18px' }}>
              Send a card
            </Link>
          </nav>

          <ThemeToggle />

          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu">
          <Link to="/archive" onClick={close}>
            The Archive
          </Link>
          <Link to="/journal" onClick={close}>
            Journal
          </Link>
          <Link to="/about" onClick={close}>
            How it works
          </Link>
          <Link to="/archive" className="btn btn-primary" onClick={close}>
            Send a card
          </Link>
        </div>
      )}
    </>
  );
}
