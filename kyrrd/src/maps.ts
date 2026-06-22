import type { Plate } from './plates';

/**
 * Google Maps link for a plate. Free, no API key, opens the Maps app on phones.
 * Priority:
 *   1) plate.mapsUrl   — paste a Google share link for an exact pin
 *   2) plate.mapsQuery — a precise place name to search (when the title differs)
 *   3) title + place   — search by the landmark's name (accurate for known spots)
 */
export function mapsUrl(plate: Plate): string {
  if (plate.mapsUrl) return plate.mapsUrl;
  const query = plate.mapsQuery ?? `${plate.title}, ${plate.place}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
