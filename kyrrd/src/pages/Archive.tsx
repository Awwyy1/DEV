import { PLATES } from '../plates';
import PlateCard from '../components/PlateCard';
import { useSeo } from '../seo';

export default function Archive() {
  useSeo('The Archive — kyrrð', 'A quiet archive of photographs. Pick one, sign it, and send it as a card.');
  return (
    <div className="wrap section">
      <div className="archhead">
        <div>
          <div className="d-label">The Archive</div>
          <div className="d-h2" style={{ marginTop: 4 }}>
            Notes from quiet corners.
          </div>
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
