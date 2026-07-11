import type { Plate } from '../plates';
import { mapsUrl } from '../maps';

/** Small text link to the spot on Google Maps (Option A). */
export default function MapLink({ plate }: { plate: Plate }) {
  return (
    <a className="maplink" href={mapsUrl(plate)} target="_blank" rel="noopener noreferrer">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" />
        <circle cx="12" cy="9.2" r="2.4" />
      </svg>
      View on Google Maps
    </a>
  );
}
