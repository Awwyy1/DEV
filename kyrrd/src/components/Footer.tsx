import { Mark } from './Brand';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <span className="bm">
          kyrr<span className="eth">ð</span>
        </span>
        <Mark size={34} label={false} />
      </div>
      <div className="foot-fine">© 2026 KYRRÐ</div>
    </footer>
  );
}
