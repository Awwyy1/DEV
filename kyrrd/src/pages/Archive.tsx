import { PLATES, TAGS } from '../plates';
import PlateCard from '../components/PlateCard';

export default function Archive() {
  return (
    <div className="wrap section">
      <div className="archhead">
        <div>
          <div className="d-label">The Archive</div>
          <div className="d-h2" style={{ marginTop: 4 }}>
            Series II — III
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TAGS.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="grid g4">
        {PLATES.map((p) => (
          <PlateCard key={p.id} plate={p} />
        ))}
      </div>
    </div>
  );
}
