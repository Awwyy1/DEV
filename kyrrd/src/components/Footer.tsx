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
      <div className="foot-fine">© 2026 KYRRÐ</div>
    </footer>
  );
}
