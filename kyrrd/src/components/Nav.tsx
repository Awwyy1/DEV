import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../theme';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useTheme();
  const { pathname } = useLocation();
  const close = () => setOpen(false);

  // only the home page has a photo behind the nav; there it starts transparent
  // and picks up its background once you scroll away from the hero
  const overlay = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <>
      {/* with the menu down the bar is the top of the menu, so it drops the
          translucency and the overlay state and matches the panel below it */}
      <header
        className={`topnav${overlay && !open ? ' topnav--overlay' : ''}${open ? ' topnav--open' : ''}`}
      >
        <Link to="/" className="bm" onClick={close}>
          kyrr<span className="eth">ð</span>
        </Link>

        <div className="nav-right">
          <nav className="nav">
            <Link to="/archive">Archive</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/walk">The Walk</Link>
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

        {/* the panel lives inside the bar so it can hang off the bar's own
            height rather than a guessed number of pixels */}
        {open && (
        <div className="mobile-menu">
          <Link to="/archive" onClick={close}>
            Archive
          </Link>
          <Link to="/journal" onClick={close}>
            Journal
          </Link>
          <Link to="/walk" onClick={close}>
            The Walk
          </Link>
          <Link to="/about" onClick={close}>
            How it works
          </Link>

          <div className="menu-theme">
            <span className="d-label">Theme</span>
            <div className="seg">
              <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')}>
                Light
              </button>
              <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')}>
                Dark
              </button>
            </div>
          </div>

          <Link to="/archive" className="btn btn-primary" onClick={close}>
            Send a card
          </Link>
        </div>
        )}
      </header>
    </>
  );
}
