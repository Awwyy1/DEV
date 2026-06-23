/* ============================================================
   PHOTO CATALOG — the only file you edit to manage photos.

   (1) ADD A PHOTO
       a. Upload the image to  kyrrd/public/photos/   (must be JPEG/PNG/WebP — NOT HEIC)
       b. Copy one { ... } block below, paste it, and set:
            id      unique id, e.g. '09'
            no      number shown on the card, e.g. '09'
            title   the NAME shown under the photo   ← rename here
            place / date / coords   the caption line
            image   '/photos/your-file.jpg'
            slug    (optional) pretty URL, e.g. 'my-photo'  → /plate/my-photo
       c. Save / merge → refresh kyrrd.pics

   (2) RENAME a photo  → change its `title` (and `no` if you like)
   (3) PRETTY URL      → add a `slug` (else the URL uses the id, e.g. /plate/02)
   (4) REORDER         → move the { } block up or down
   (5) REMOVE          → delete its { } block

   (6) GOOGLE MAPS LINK (exact pin)
       Every card has a `mapsUrl: ''` line. To point its
       "View on Google Maps" link at an exact spot:
         a. Open google.com/maps and find the place. For pinpoint
            accuracy, right-click the exact point on the map and click
            the coordinates at the top of the menu to copy them.
         b. Get a link one of two ways:
              • Share → Copy link        (gives https://maps.app.goo.gl/...)
              • or build it from coords:  https://www.google.com/maps?q=64.146820,-21.942600
         c. Paste it between the quotes, e.g.
              mapsUrl: 'https://maps.app.goo.gl/abc123',
       Leave it as '' and the link falls back to an automatic name search.

   `image` always wins over `gradient`. Shoot / crop ~4:5 (portrait).
   ============================================================ */

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
  slug?: string; // pretty URL segment; falls back to `id`
  mapsUrl?: string; // paste a Google Maps share link for an exact pin
  mapsQuery?: string; // precise place name to search, when the title differs
}

export const TAGS = ['All', 'Waterfalls', 'Coast', 'Mountains', 'Cities'];

export const PLATES: Plate[] = [
  {
    id: '09', no: '09', series: 'Series III', title: 'Water Carrier',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 2026',
    description: 'A bronze woman bowed under a yoke, still carrying water through the city long after the taps arrived.',
    gradient: 'linear-gradient(180deg,#eef2f3 0%,#cdd8dc 50%,#8b999f 100%)',
    image: '/photos/WaterCarrier.jpeg',
    slug: 'water-carrier',
    mapsUrl: 'https://maps.app.goo.gl/uh56g3gKDMePMQLd7',
    mapsQuery: 'Vatnsberinn, Reykjavík',
  },
  {
    id: '01', no: '01', series: 'Series II', title: 'Grotta Lighthouse',
    place: 'Reykjavík, Iceland', coords: '64.17°N 22.02°W', date: 'June 10 2026',
    description: 'An island guarded by the ocean, where the path disappears with the rising tide.',
    gradient: 'linear-gradient(180deg,#fff,#e8eef0 55%,#c9d4d8 78%,#9fb0b6)',
    image: '/photos/glacier-edge.jpg',
    slug: 'grotta-lighthouse',
    mapsUrl: 'https://maps.app.goo.gl/YbsUwJ2c7R4hezwM6',
  },
  {
    id: '02', no: '02', series: 'Series II', title: 'The Sun Voyager',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.92°W', date: 'June 13 2026',
    description: 'Jón Gunnar Árnason’s iconic sculpture, standing proud against Mount Esja since 1990.',
    gradient: 'linear-gradient(160deg,#eef3f4,#cdd9dc 60%,#8fa3aa)',
    image: '/photos/The-Sun-Voyager.jpeg',
    slug: 'sun-voyager',
    mapsUrl: 'https://maps.app.goo.gl/fLSZxB7wTDUS8b5K9',
  },
  {
    id: '03', no: '03', series: 'Series II', title: 'Hallgrimskirkja',
    place: 'Reykjavík, Iceland', coords: '64.14°N 21.93°W', date: 'May 27 2026',
    description: 'Reykjavík iconic landmark, standing tall as a beacon of Icelandic heritage and design.',
    gradient: 'linear-gradient(200deg,#f4f6f7,#dfe7e9 50%,#aebcc1 85%,#6f8389)',
    image: '/photos/Hallgrimskirkja.jpeg',
    slug: 'hallgrimskirkja',
    mapsUrl: 'https://maps.app.goo.gl/6K1YGj6NsbuVDk7a7',
  },
  {
    id: '04', no: '04', series: 'Series II', title: 'The Partnership Sculpture',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'June 04 2025',
    description: 'A bronze emblem of unity, celebrating the enduring friendship between two nations across the Atlantic.',
    gradient: 'linear-gradient(180deg,#fafafa,#e2eaec 60%,#b9c7cc)',
    image: '/photos/The-Partnership-Sculpture.jpeg',
    slug: 'partnership-sculpture',
    mapsUrl: 'https://maps.app.goo.gl/8LrrBWL9wyvuijJj9',
  },
  {
    id: '05', no: '05', series: 'Series III', title: 'Althingi Parliament House',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 05 2026',
    description: 'The historic seat of Alþingi, home to one of the world’s oldest surviving parliaments.',
    gradient: 'linear-gradient(180deg,#fff,#eaf0f2 52%,#cfd8dc 80%,#9aa9af)',
    image: '/photos/Althingi-Parliament.jpeg',
    slug: 'althingi',
    mapsUrl: 'https://maps.app.goo.gl/dShnqqthHmDtbu2H9',
    mapsQuery: 'Alþingishúsið, Reykjavík',
  },
  {
    id: '06', no: '06', series: 'Series III', title: 'Harpa',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.93°W', date: 'March 2026',
    description: 'An endless play of light and water, designed to dissolve the boundaries of space.',
    gradient: 'linear-gradient(160deg,#f4f6f7,#d7e0e3 55%,#9fb0b6)',
    image: '/photos/Harpa.jpeg',
    slug: 'harpa',
    mapsUrl: 'https://maps.app.goo.gl/9Sjh2W6vGcdiHwrm8',
  },
  {
    id: '10', no: '10', series: 'Series IV', title: 'Unknown Bureaucrat',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 2026',
    description: 'An anonymous figure burdened by stone, embodying the quiet grind of bureaucratic life.',
    gradient: 'linear-gradient(180deg,#ffffff,#e6edf0 50%,#bcccd2 80%,#8ea0a7)',
    image: '/photos/Unknown-Bureaucrat.jpeg',
    slug: 'unknown-bureaucrat',
    mapsUrl: 'https://maps.app.goo.gl/az5ee1gHZKVV7CmZA',
    mapsQuery: 'Monument to the Unknown Bureaucrat, Reykjavík',
  },
  {
    id: '11', no: '11', series: 'Series IV', title: 'Hofdi House',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'June 2026',
    description: 'A small white house by the sea where two superpowers once sat down to talk.',
    gradient: 'linear-gradient(160deg,#f4f6f7,#d3dde0 55%,#92a3a9)',
    image: '/photos/hofdi-house.jpeg',
    slug: 'hofdi-house',
    mapsUrl: 'https://maps.app.goo.gl/fPsvWe3mRM8Cqf3r8',
  },
  {
    id: '12', no: '12', series: 'Series IV', title: 'Einar Benediktsson',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'June 2026',
    description: 'A bronze poet beside Höfði house, a restless dreamer who, the story goes, once tried to sell the northern lights.',
    gradient: 'linear-gradient(200deg,#f6f7f8,#dde6e8 50%,#a9b9bf 88%,#728288)',
    image: '/photos/Einar-Benediktsson.jpeg',
    slug: 'einar-benediktsson',
    mapsUrl: 'https://maps.app.goo.gl/54BeDJCVVFEoUDks8',
    mapsQuery: 'Einar Benediktsson statue, Höfði, Reykjavík',
  },
  {
    id: '13', no: '13', series: 'Series IV', title: 'Ingólfur Arnarson',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.93°W', date: 'June 2026',
    description: 'Armoured, spear in hand, looking out over the capital he founded.',
    gradient: 'linear-gradient(180deg,#fbfdfd,#e2eaec 55%,#b3c2c7 85%,#7f9197)',
    image: '/photos/Arnarholl.jpeg',
    slug: 'arnarholl',
    mapsUrl: 'https://maps.app.goo.gl/V4TDaYU63c3Zqz61A',
    mapsQuery: 'Ingólfur Arnarson statue, Arnarhóll, Reykjavík',
  },
  {
    id: '14', no: '14', series: 'Series IV', title: 'The Black Cone',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 2026',
    description: 'A boulder split by a black cone in front of the parliament, a quiet monument to civil disobedience.',
    gradient: 'linear-gradient(180deg,#dfe7ea,#aebcc2 45%,#5f6e74 80%,#23282b)',
    image: '/photos/The-black-cone.jpeg',
    slug: 'black-cone',
    mapsUrl: 'https://maps.app.goo.gl/WRj48fMoY65L95JRA',
    mapsQuery: 'The Black Cone, Monument to Civil Disobedience, Reykjavík',
  },
];

export const findPlate = (key?: string): Plate =>
  PLATES.find((p) => p.id === key || p.slug === key) ?? PLATES[0];
