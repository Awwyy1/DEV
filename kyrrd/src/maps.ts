import type { Plate } from './plates';

// "64.14°N 21.93°W" -> [64.14, -21.93]
function coordsToLatLng(coords?: string): [number, number] | null {
  if (!coords) return null;
  const m = coords.match(/([\d.]+)\s*°?\s*([NS])[\s,]+([\d.]+)\s*°?\s*([EW])/i);
  if (!m) return null;
  let lat = parseFloat(m[1]);
  if (m[2].toUpperCase() === 'S') lat = -lat;
  let lng = parseFloat(m[3]);
  if (m[4].toUpperCase() === 'W') lng = -lng;
  return [lat, lng];
}

/**
 * Google Maps link for a plate. Free, no API key, opens the Maps app on phones.
 * Priority: explicit mapsUrl -> coordinates -> a search by name + place.
 */
export function mapsUrl(plate: Plate): string {
  if (plate.mapsUrl) return plate.mapsUrl;
  const ll = coordsToLatLng(plate.coords);
  if (ll) return `https://www.google.com/maps/search/?api=1&query=${ll[0]},${ll[1]}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${plate.title}, ${plate.place}`)}`;
}
