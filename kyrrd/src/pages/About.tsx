export default function About() {
  return (
    <div className="wrap section" style={{ maxWidth: 760 }}>
      <div className="d-label">Field Notes</div>
      <h1 className="d-h1" style={{ margin: '8px 0 18px' }}>
        kyrrð is not a shop.
      </h1>
      <p className="d-lead">It is an archive — released slowly, one plate at a time.</p>
      <p className="d-body" style={{ color: 'var(--steel-d)', marginTop: 18 }}>
        Each plate can be kept as a file, a print, or a numbered edition of one hundred — with the
        mark and a certificate. Choose a plate, add a word, and keep it.
      </p>
      <p className="d-body" style={{ color: 'var(--steel-d)', marginTop: 14 }}>
        Previews are shown quietly, watermarked and reduced; the full image is rendered only after
        an edition is taken.
      </p>
    </div>
  );
}
