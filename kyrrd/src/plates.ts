/* ============================================================
   PHOTO CATALOG — the only file you edit to manage photos.

   (1) ADD A PHOTO
       a. Upload the image to  kyrrd/public/photos/
          (GitHub → folder → Add file → Upload files)
       b. Copy one { ... } block below, paste it, and set:
            id      unique id, e.g. '09'
            no      number shown on the card, e.g. '09'
            title   the NAME shown under the photo   ← rename here
            place / date / coords   the caption line
            image   '/photos/your-file.jpg'
       c. Merge the PR → refresh kyrrd.pics

   (2) RENAME a photo  → change its `title` (and `no` if you like)
   (3) REORDER         → move the { } block up or down
   (4) REMOVE          → delete its { } block

   `image` always wins over `gradient`. Shoot / crop ~4:5 (portrait).
   ============================================================ */

export const PRICE = '$4.99';

export interface Plate {
  id: string;
  no: string;
  series: string;
  title: string;
  place: string;
  coords?: string;
  date: string;
  description: string;
  gradient: string;
  image?: string;
}

export const TAGS = ['All', 'Waterfalls', 'Coast', 'Mountains', 'Cities'];

export const PLATES: Plate[] = [
  {
    id: '01', no: '01', series: 'Series II', title: 'Glacier Edge',
    place: 'Lofoten, Norway', coords: '68.21°N 13.96°E', date: 'January 2025',
    description: 'First light along the ice, where the shelf gives out and the water begins.',
    gradient: 'linear-gradient(180deg,#fff,#e8eef0 55%,#c9d4d8 78%,#9fb0b6)',
    image: '/photos/GlacierEdge.jpg',
  },
  {
    id: '02', no: '02', series: 'Series II', title: 'Black Sand',
    place: 'Tenerife, Spain', coords: '28.27°N 16.61°W', date: 'March 2025',
    description: 'A long beach under flat cloud, nothing moving but the tide line.',
    gradient: 'linear-gradient(160deg,#eef3f4,#cdd9dc 60%,#8fa3aa)',
  },
  {
    id: '03', no: '03', series: 'Series II', title: 'Highland Light',
    place: 'Atacama, Chile', coords: '24.50°S 69.25°W', date: 'February 2026',
    description: 'Last light across the interior, where the track gives out and the cold begins.',
    gradient: 'linear-gradient(200deg,#f4f6f7,#dfe7e9 50%,#aebcc1 85%,#6f8389)',
  },
  {
    id: '04', no: '04', series: 'Series II', title: 'Still Fjord',
    place: 'Faroe Islands', coords: '62.01°N 6.77°W', date: 'November 2025',
    description: 'Water held so still the cliffs forget which way is up.',
    gradient: 'linear-gradient(180deg,#fafafa,#e2eaec 60%,#b9c7cc)',
  },
  {
    id: '05', no: '05', series: 'Series III', title: 'Static',
    place: 'Tokyo, Japan', coords: '35.68°N 139.69°E', date: 'January 2026',
    description: 'A grey afternoon between buildings, the city holding its breath.',
    gradient: 'linear-gradient(180deg,#fff,#eaf0f2 52%,#cfd8dc 80%,#9aa9af)',
  },
  {
    id: '06', no: '06', series: 'Series III', title: 'Held Still',
    place: 'Patagonia, Argentina', coords: '50.94°S 73.40°W', date: 'March 2026',
    description: 'Wind paused for a single frame over open water.',
    gradient: 'linear-gradient(160deg,#f4f6f7,#d7e0e3 55%,#9fb0b6)',
  },
  {
    id: '07', no: '07', series: 'Series III', title: 'Cold Open',
    place: 'Hokkaido, Japan', coords: '43.80°N 142.86°E', date: 'December 2025',
    description: 'Snowlight before the snow, the whole field one even tone.',
    gradient: 'linear-gradient(200deg,#fbfdfd,#e3ebed 55%,#b3c2c7 88%,#7f9197)',
  },
  {
    id: '08', no: '08', series: 'Series III', title: 'Afterimage',
    place: 'Scottish Highlands', coords: '57.01°N 4.74°W', date: 'February 2026',
    description: 'What stays on the eye after you look away from the loch.',
    gradient: 'linear-gradient(180deg,#cfd6d8,#9aabb0 38%,#46555a 80%,#10100f)',
  },
];

export const findPlate = (id?: string): Plate => PLATES.find((p) => p.id === id) ?? PLATES[0];
