import { Link } from 'react-router-dom';
import { Mark } from './Brand';
import { SocialIcons } from './Social';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <Mark size={34} label={false} />
        <span className="bm">
          kyrr<span className="eth">ð</span>
        </span>
      </div>
      {/* three parts: the line, the icons, the links. The middle column is sized
          to its content and the outer two share the rest, so the icons sit on
          the centre of the footer whatever the side columns weigh. */}
      <div className="foot-fine">
        <span className="foot-c">© 2026 KYRRÐ</span>
        <SocialIcons />
        <span className="foot-links">
          <Link to="/journal">Journal</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
