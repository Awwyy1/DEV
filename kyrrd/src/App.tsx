import { PLATES, type Plate } from './plates';

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      kyrr<span className="eth">ð</span>
    </span>
  );
}

function Seal() {
  return (
    <svg className="seal" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="92" height="92" stroke="currentColor" strokeWidth="1" />
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fontSize="48"
        fill="currentColor"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight={500}
      >
        ð
      </text>
      <text
        x="60"
        y="99"
        textAnchor="middle"
        fontSize="6.5"
        letterSpacing="3"
        fill="currentColor"
        fontFamily="Inter, sans-serif"
      >
        KYRRÐ
      </text>
    </svg>
  );
}

function PlateCard({ plate }: { plate: Plate }) {
  return (
    <article className="plate">
      <div
        className="photo"
        style={plate.image ? { backgroundImage: `url(${plate.image})` } : { background: plate.gradient }}
      />
      <div className="cap">
        <div className="pn">
          {plate.no} — {plate.series}
        </div>
        <h3 className="ttl">{plate.title}</h3>
        <div className="meta">
          {plate.location} · {plate.year}
        </div>
        {plate.inscription && <div className="insc">— {plate.inscription}</div>}
      </div>
    </article>
  );
}

export default function App() {
  return (
    <>
      <nav className="nav">
        <Wordmark />
        <div className="links">
          <a href="#archive">Archive</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero wrap" id="top">
        <span className="eyebrow">Photographic archive · est. 2026</span>
        <Wordmark className="mark" />
        <p className="lead">
          Stillness, collected plate by plate — a quiet archive of moments held still,
          wherever they are found.
        </p>
      </header>

      <main className="wrap" id="archive">
        <div className="archhead">
          <h2>The Archive</h2>
          <span className="count">{PLATES.length} plates</span>
        </div>
        <section className="grid">
          {PLATES.map((plate) => (
            <PlateCard key={plate.id} plate={plate} />
          ))}
        </section>
      </main>

      <footer className="foot" id="contact">
        <Seal />
        <div className="meta">© 2026 · a still archive · all plates held quiet</div>
        <Wordmark />
      </footer>
    </>
  );
}
