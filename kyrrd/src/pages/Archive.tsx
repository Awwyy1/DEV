import { PLATES } from '../plates';
import PlateCard from '../components/PlateCard';
import { useSeo } from '../seo';

export default function Archive() {
  useSeo(
    'The Archive — kyrrð',
    'An archive of photographs from around Iceland. Pick one, sign it, and send it as a card.',
  );
  return (
    <div className="wrap section">
      <div className="archhead">
        <div>
          <div className="d-label">The Archive</div>
          {/* the page's one h1: browsers add their own margins to headings, so
              the spacing is set here to match what the div used to do */}
          <h1 className="d-h2" style={{ margin: '4px 0 0' }}>
            Photographs from around Iceland.
          </h1>
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
