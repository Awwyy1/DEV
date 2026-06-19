import { Link } from 'react-router-dom';
import { Mark } from './Brand';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <Mark size={34} label={false} />
        <span className="bm">
          kyrr<span className="eth">ð</span>
        </span>
      </div>
      <div className="foot-fine">
        <span>© 2026 KYRRÐ</span>
        <span className="foot-links">
          <Link to="/journal">Journal</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
