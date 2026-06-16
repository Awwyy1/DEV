// The archive's data model. Each "plate" is one photograph.
// `gradient` is a placeholder until a real `image` is added — swap freely.
// `location` is per-plate on purpose: the archive travels anywhere.

export interface Plate {
  id: string;
  no: string; // plate number, e.g. "01"
  series: string; // e.g. "Series I"
  title: string;
  location: string; // where it was taken — anywhere in the world
  year: string;
  inscription?: string; // optional handwritten-style note
  gradient: string; // placeholder background until an image is set
  image?: string; // optional real image URL (overrides gradient when present)
}

export const PLATES: Plate[] = [
  {
    id: 'p01',
    no: '01',
    series: 'Series I',
    title: 'First Light',
    location: 'Vík, Iceland',
    year: '2025',
    gradient: 'linear-gradient(180deg,#cdd6da 0%,#9fb1ba 36%,#566066 68%,#1d1c1a 100%)',
  },
  {
    id: 'p02',
    no: '02',
    series: 'Series I',
    title: 'Low Tide',
    location: 'Lofoten, Norway',
    year: '2025',
    inscription: 'before the wind',
    gradient: 'linear-gradient(180deg,#eef2f3 0%,#cdd8dc 44%,#8fa3ab 100%)',
  },
  {
    id: 'p03',
    no: '03',
    series: 'Series I',
    title: 'Static',
    location: 'Tokyo, Japan',
    year: '2026',
    gradient: 'linear-gradient(180deg,#e7e7e9 0%,#aebfc4 55%,#3fa9c0 100%)',
  },
  {
    id: 'p04',
    no: '04',
    series: 'Series II',
    title: 'Cold Open',
    location: 'Atacama, Chile',
    year: '2026',
    gradient: 'linear-gradient(180deg,#d9d2c7 0%,#9aa0a3 50%,#2b2e30 100%)',
  },
  {
    id: 'p05',
    no: '05',
    series: 'Series II',
    title: 'Held Still',
    location: 'Faroe Islands',
    year: '2025',
    inscription: 'for no one in particular',
    gradient: 'linear-gradient(180deg,#f4f6f7 0%,#c4ced2 40%,#6c7a80 100%)',
  },
  {
    id: 'p06',
    no: '06',
    series: 'Series II',
    title: 'Afterimage',
    location: 'Patagonia, Argentina',
    year: '2026',
    gradient: 'linear-gradient(180deg,#cfd6d8 0%,#9aabb0 38%,#46555a 72%,#10100f 100%)',
  },
];
