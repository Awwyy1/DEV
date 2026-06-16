import { Mark } from './Brand';

export default function Footer() {
  return (
    <footer className="foot">
      <Mark size={64} />
      <span className="meta">© 2026 · kyrrð · an archive, released slowly</span>
      <span className="bm wm">
        kyrr<span className="eth">ð</span>
      </span>
    </footer>
  );
}
