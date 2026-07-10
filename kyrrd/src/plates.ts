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
  focus?: string; // card crop focus (CSS background-position, e.g. 'top'); default center
}

export const TAGS = ['All', 'Waterfalls', 'Coast', 'Mountains', 'Cities'];

export const PLATES: Plate[] = [
  {
    id: '02', no: '01', series: 'Series II', title: 'The Sun Voyager',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.92°W', date: 'June 13 2026',
    description: 'Not the Viking ship everyone takes it for, Jón Gunnar Árnason’s steel Sun Voyager has faced Mount Esja since 1990.',
    gradient: 'linear-gradient(160deg,#eef3f4,#cdd9dc 60%,#8fa3aa)',
    image: '/photos/The-Sun-Voyager.jpeg',
    slug: 'sun-voyager',
    mapsUrl: 'https://maps.app.goo.gl/fLSZxB7wTDUS8b5K9',
  },
  {
    id: '20', no: '02', series: 'Series VII', title: 'Government House',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'White above the Lækjargata lawn, Government House, the prime minister’s seat in a stone building raised in the 1760s as the country’s prison.',
    gradient: 'linear-gradient(180deg,#eaf1f6,#c3d6e4 50%,#8ba9bf 82%,#5b7386)',
    image: '/photos/Government-House.jpeg',
    slug: 'government-house',
    mapsUrl: '',
    mapsQuery: 'Stjórnarráðshúsið, Reykjavík',
  },
  {
    id: '24', no: '03', series: 'Series VII', title: 'Himinglæva',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.93°W', date: 'July 2026',
    description: 'A steel wave the wind plays on the square outside Harpa, Elín Hansdóttir’s Himinglæva, the concert hall’s own instrument.',
    gradient: 'linear-gradient(180deg,#f1f4f7,#d3dce6 50%,#9fb0c4 82%,#6b7d94)',
    image: '/photos/Wind-Harp.jpeg',
    slug: 'wind-harp',
    mapsUrl: '',
    mapsQuery: 'Himinglæva, Harpa, Reykjavík',
  },
  {
    id: '17', no: '04', series: 'Series VI', title: 'Skúli Magnússon',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'Father of Reykjavík in bronze, Skúli Magnússon, whose Aðalstræti workshops turned a scatter of farms into a town.',
    gradient: 'linear-gradient(180deg,#eef1ec,#c7cfc2 52%,#8f9a8c 82%,#59615a)',
    image: '/photos/Skuli-Magnusson.jpeg',
    slug: 'skuli-magnusson',
    focus: 'top', // tall subject: keep the head, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Skúli Magnússon statue, Fógetagarðurinn, Reykjavík',
  },
  {
    id: '01', no: '05', series: 'Series II', title: 'Grotta Lighthouse',
    place: 'Reykjavík, Iceland', coords: '64.17°N 22.02°W', date: 'June 10 2026',
    description: 'Reachable on foot only around low tide, the Grótta lighthouse on an island the sea cuts off twice a day.',
    gradient: 'linear-gradient(180deg,#fff,#e8eef0 55%,#c9d4d8 78%,#9fb0b6)',
    image: '/photos/glacier-edge.jpg',
    slug: 'grotta-lighthouse',
    mapsUrl: 'https://maps.app.goo.gl/YbsUwJ2c7R4hezwM6',
  },
  {
    id: '21', no: '06', series: 'Series VII', title: 'Christian IX',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'Arm held out on the Government House lawn, Christian IX of Denmark, offering Iceland the constitution he brought over in 1874.',
    gradient: 'linear-gradient(180deg,#f0f4f6,#ccd9e2 50%,#93a9b8 82%,#5f7484)',
    image: '/photos/King-Christian-IX-of-Denmark.jpeg',
    slug: 'christian-ix',
    focus: 'top', // tall statue on a tall plinth: keep the king, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Christian IX statue, Stjórnarráðshúsið, Reykjavík',
  },
  {
    id: '26', no: '07', series: 'Series VII', title: 'The Cellist',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.93°W', date: 'July 2026',
    description: 'Bowing a cello with no strings in the water outside Harpa, Ólöf Pálsdóttir’s Musician, modelled on the cellist Erling Blöndal Bengtsson.',
    gradient: 'linear-gradient(180deg,#eff3f5,#d3dbe0 48%,#9daab4 78%,#7a5b48)',
    image: '/photos/Sellospilarinn.jpeg',
    slug: 'cellist',
    mapsUrl: '',
    mapsQuery: 'Statue of Erling Blöndal Bengtsson, Harpa, Reykjavík',
  },
  {
    id: '05', no: '08', series: 'Series III', title: 'Althingi Parliament House',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 05 2026',
    description: 'Behind a plain grey façade on Austurvöllur sits Alþingi, a parliament first gathered in the year 930.',
    gradient: 'linear-gradient(180deg,#fff,#eaf0f2 52%,#cfd8dc 80%,#9aa9af)',
    image: '/photos/Althingi-Parliament.jpeg',
    slug: 'althingi',
    mapsUrl: 'https://maps.app.goo.gl/dShnqqthHmDtbu2H9',
    mapsQuery: 'Alþingishúsið, Reykjavík',
  },
  {
    id: '16', no: '09', series: 'Series V', title: 'Íslandsvarðan',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.92°W', date: 'June 2026',
    description: 'Cast to look like raw lava, Íslandsvarðan, Jóhann Eyfells’s bronze cairn with a hole that keeps Mount Esja in view.',
    gradient: 'linear-gradient(180deg,#e7edef,#9fb0b6 50%,#586469 82%,#23282b)',
    image: '/photos/Islandsvardan.jpeg',
    slug: 'islandsvardan',
    mapsUrl: '', // not on Google Maps; falls back to a name search
    mapsQuery: 'Íslandsvarðan, Sæbraut, Reykjavík',
  },
  {
    id: '09', no: '10', series: 'Series III', title: 'Water Carrier',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 2026',
    description: 'Bowed under a wooden yoke, the Water Carrier who hauled Reykjavík’s water by hand long before the pipes arrived.',
    gradient: 'linear-gradient(180deg,#eef2f3 0%,#cdd8dc 50%,#8b999f 100%)',
    image: '/photos/WaterCarrier.jpeg',
    slug: 'water-carrier',
    mapsUrl: 'https://maps.app.goo.gl/uh56g3gKDMePMQLd7',
    mapsQuery: 'Vatnsberinn, Reykjavík',
  },
  {
    id: '33', no: '11', series: 'Series VII', title: 'Leif Eiríksson',
    place: 'Reykjavík, Iceland', coords: '64.14°N 21.93°W', date: 'July 2026',
    description: 'On a stone ship’s prow before Hallgrímskirkja, Leif Eiríksson, the son of Iceland who reached America five centuries before Columbus.',
    gradient: 'linear-gradient(180deg,#eff3f6,#d0dbe3 50%,#9db0be 80%,#5d7183)',
    image: '/photos/Leif-Eriksson.jpeg',
    slug: 'leif-eriksson',
    focus: 'top', // figure atop the prow plinth: keep him, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Leif Eriksson statue, Hallgrímskirkja, Reykjavík',
  },
  {
    id: '25', no: '12', series: 'Series VII', title: 'The Berlin Wall',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'July 2026',
    description: 'A painted slab of the Berlin Wall on the lawn by Höfði, set down where Reagan and Gorbachev began the thaw that brought it down.',
    gradient: 'linear-gradient(180deg,#f2f4f6,#d8dde3 50%,#a7b0ba 82%,#6e7883)',
    image: '/photos/Piece-of-Berlin-Wall.jpeg',
    slug: 'berlin-wall',
    mapsUrl: '',
    mapsQuery: 'Berlin Wall segment, Höfði, Reykjavík',
  },
  {
    id: '03', no: '13', series: 'Series II', title: 'Hallgrimskirkja',
    place: 'Reykjavík, Iceland', coords: '64.14°N 21.93°W', date: 'May 27 2026',
    description: 'Forty years in the building, Hallgrímskirkja’s pale tower was shaped after the basalt columns of the Icelandic coast.',
    gradient: 'linear-gradient(200deg,#f4f6f7,#dfe7e9 50%,#aebcc1 85%,#6f8389)',
    image: '/photos/Hallgrimskirkja.jpeg',
    slug: 'hallgrimskirkja',
    focus: 'top', // tall subject: keep the tower, crop from the bottom
    mapsUrl: 'https://maps.app.goo.gl/6K1YGj6NsbuVDk7a7',
  },
  {
    id: '30', no: '14', series: 'Series VII', title: 'Jón Sigurðsson',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'Facing the parliament from his column on Austurvöllur, Jón Sigurðsson, the man who argued Iceland back to itself.',
    gradient: 'linear-gradient(180deg,#f1f4f6,#d5dde3 50%,#a3b2bd 80%,#5f7080)',
    image: '/photos/Jon-Sigurdsson.jpeg',
    slug: 'jon-sigurdsson',
    focus: 'top', // statue high on a stone column: keep the figure, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Jón Sigurðsson statue, Austurvöllur, Reykjavík',
  },
  {
    id: '27', no: '15', series: 'Series VII', title: 'Höfði Lighthouse',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'July 2026',
    description: 'Bright yellow on its viewing platform by Höfði, a lighthouse built in 2019 to the pattern of the old harbour lights of 1917.',
    gradient: 'linear-gradient(180deg,#f0f4f6,#d2dde2 50%,#a4b4bc 78%,#e8c25a)',
    image: '/photos/Hofdi-Lighthouse.jpeg',
    slug: 'hofdi-lighthouse',
    mapsUrl: '',
    mapsQuery: 'Höfði Lighthouse, Sæbraut, Reykjavík',
  },
  {
    id: '10', no: '16', series: 'Series IV', title: 'Unknown Bureaucrat',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 2026',
    description: 'Sharp from the waist down and a raw block of basalt above, the Unknown Bureaucrat, a monument to the official no one remembers.',
    gradient: 'linear-gradient(180deg,#ffffff,#e6edf0 50%,#bcccd2 80%,#8ea0a7)',
    image: '/photos/Unknown-Bureaucrat.jpeg',
    slug: 'unknown-bureaucrat',
    mapsUrl: 'https://maps.app.goo.gl/az5ee1gHZKVV7CmZA',
    mapsQuery: 'Monument to the Unknown Bureaucrat, Reykjavík',
  },
  {
    id: '15', no: '17', series: 'Series V', title: 'Domkirkjan',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 2026',
    description: 'Beside the parliament on Austurvöllur, the cathedral where members still gather for a service before each new session opens.',
    gradient: 'linear-gradient(180deg,#f2f6f8,#d2e0e6 55%,#9bb4be)',
    image: '/photos/Domkirkjan.jpeg',
    slug: 'domkirkjan',
    mapsUrl: 'https://maps.app.goo.gl/5t4mjjBDjE8T5Sdq6',
  },
  {
    id: '23', no: '18', series: 'Series VII', title: 'Öndvegissúlur',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'July 2026',
    description: 'Copper pillars crowned with carved forms beside Höfði, Sigurjón Ólafsson’s monument to the high seat pillars Ingólfur threw into the sea.',
    gradient: 'linear-gradient(180deg,#eef3f2,#c8d6d2 50%,#8ba49c 80%,#4f6b62)',
    image: '/photos/Ondvegissulur.jpeg',
    slug: 'ondvegissulur',
    focus: 'top', // tall column: keep the carved crown, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Öndvegissúlur, Höfði, Reykjavík',
  },
  {
    id: '04', no: '19', series: 'Series II', title: 'The Partnership Sculpture',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'June 04 2025',
    description: 'Two bronze figures leaning into each other on the shore, the Partnership, a gift between Iceland and the United States.',
    gradient: 'linear-gradient(180deg,#fafafa,#e2eaec 60%,#b9c7cc)',
    image: '/photos/The-Partnership-Sculpture.jpeg',
    slug: 'partnership-sculpture',
    mapsUrl: 'https://maps.app.goo.gl/8LrrBWL9wyvuijJj9',
  },
  {
    id: '22', no: '20', series: 'Series VII', title: 'Hannes Hafstein',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'Open handed on the Government House lawn, Hannes Hafstein, the poet who became the first Icelander to govern Iceland from the house behind him.',
    gradient: 'linear-gradient(180deg,#eef2f0,#c9d4cd 52%,#8fa096 82%,#57645c)',
    image: '/photos/Hannes-Hafstein.jpeg',
    slug: 'hannes-hafstein',
    focus: 'top', // tall statue: keep the figure, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Hannes Hafstein statue, Stjórnarráðshúsið, Reykjavík',
  },
  {
    id: '32', no: '21', series: 'Series VII', title: 'Víkurgarður',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'Three stones carved with the faint figures of the parish, marking Víkurgarður, the churchyard where Reykjavík buried its dead for six centuries.',
    gradient: 'linear-gradient(180deg,#f1f2ee,#d8dad0 50%,#a8ab9c 80%,#6b6e5f)',
    image: '/photos/Minnisvardi-um-Vikurkirkjugard.jpeg',
    slug: 'vikurgardur',
    mapsUrl: '',
    mapsQuery: 'Víkurgarður, Aðalstræti, Reykjavík',
  },
  {
    id: '06', no: '22', series: 'Series III', title: 'Harpa',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.93°W', date: 'March 2026',
    description: 'Coloured glass that shifts with the weather, Harpa on the old harbour, left half built when the banks fell and finished anyway.',
    gradient: 'linear-gradient(160deg,#f4f6f7,#d7e0e3 55%,#9fb0b6)',
    image: '/photos/Harpa.jpeg',
    slug: 'harpa',
    mapsUrl: 'https://maps.app.goo.gl/9Sjh2W6vGcdiHwrm8',
  },
  {
    id: '12', no: '23', series: 'Series IV', title: 'Einar Benediktsson',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'June 2026',
    description: 'Poet, lawyer and tireless schemer, Einar Benediktsson stands beside Höfði, the man who, the story goes, once tried to sell the northern lights.',
    gradient: 'linear-gradient(200deg,#f6f7f8,#dde6e8 50%,#a9b9bf 88%,#728288)',
    image: '/photos/Einar-Benediktsson.jpeg',
    slug: 'einar-benediktsson',
    focus: 'top', // tall subject: keep the head, crop from the bottom
    mapsUrl: 'https://maps.app.goo.gl/54BeDJCVVFEoUDks8',
    mapsQuery: 'Einar Benediktsson statue, Höfði, Reykjavík',
  },
  {
    id: '29', no: '24', series: 'Series VII', title: 'Séra Bjarni Jónsson',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'Beside the cathedral he served for forty years, séra Bjarni Jónsson, the priest all of Reykjavík knew by sight.',
    gradient: 'linear-gradient(180deg,#f0f2f4,#d6dce1 50%,#a6b1ba 80%,#647380)',
    image: '/photos/Sera-Bjarni-Jonsson.jpeg',
    slug: 'sera-bjarni',
    focus: 'top', // bust on a pedestal: keep the head and plaque, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Séra Bjarni Jónsson bust, Dómkirkjan, Reykjavík',
  },
  {
    id: '31', no: '25', series: 'Series VII', title: 'Ingibjörg H. Bjarnason',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'Beside the parliament she entered first, Ingibjörg H. Bjarnason, headmistress, suffragist and the first woman elected to the Alþingi.',
    gradient: 'linear-gradient(180deg,#eff1f3,#d2d7dc 50%,#9aa3ad 80%,#454e58)',
    image: '/photos/Ingibjorg-Bjarnason.jpeg',
    slug: 'ingibjorg-bjarnason',
    focus: 'top', // figure atop a tall dark plinth: keep her, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Ingibjörg H. Bjarnason statue, Alþingi, Reykjavík',
  },
  {
    id: '14', no: '26', series: 'Series IV', title: 'The Black Cone',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'June 2026',
    description: 'Driven into a split boulder outside parliament, the Black Cone, Iceland’s stark monument to the right to protest.',
    gradient: 'linear-gradient(180deg,#dfe7ea,#aebcc2 45%,#5f6e74 80%,#23282b)',
    image: '/photos/The-black-cone.jpeg',
    slug: 'black-cone',
    focus: 'bottom', // low subject: keep the cone, crop from the top
    mapsUrl: 'https://maps.app.goo.gl/WRj48fMoY65L95JRA',
    mapsQuery: 'The Black Cone, Monument to Civil Disobedience, Reykjavík',
  },
  {
    id: '18', no: '27', series: 'Series VI', title: 'Úr Álögum',
    place: 'Reykjavík, Iceland', coords: '64.14°N 21.93°W', date: 'July 2026',
    description: 'Sword lowered over a beaten beast, Einar Jónsson’s Úr álögum, a rider breaking a spell in the garden below Hallgrímskirkja.',
    gradient: 'linear-gradient(180deg,#e9edee,#b9c4c2 52%,#7c8a86 82%,#414a45)',
    image: '/photos/Ur-Alogum.jpeg',
    slug: 'ur-alogum',
    focus: 'top', // tall subject: keep the rider, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Úr álögum, Einar Jónsson Museum, Reykjavík',
  },
  {
    id: '11', no: '28', series: 'Series IV', title: 'Hofdi House',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.91°W', date: 'June 2026',
    description: 'On the north shore stands Höfði, the white house where Reagan and Gorbachev met in 1986 and the Cold War began to thaw.',
    gradient: 'linear-gradient(160deg,#f4f6f7,#d3dde0 55%,#92a3a9)',
    image: '/photos/hofdi-house.jpeg',
    slug: 'hofdi-house',
    mapsUrl: 'https://maps.app.goo.gl/fPsvWe3mRM8Cqf3r8',
  },
  {
    id: '19', no: '29', series: 'Series VI', title: 'Ingólfsgarður Lighthouse',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.93°W', date: 'July 2026',
    description: 'Bright yellow at the end of a stone breakwater, the little lighthouse marking the mouth of Reykjavík’s old harbour.',
    gradient: 'linear-gradient(180deg,#eff3f5,#cdd8de 52%,#9fb1b8 80%,#e6bf4c)',
    image: '/photos/Ingolfsgardur-Lighthouse.jpeg',
    slug: 'ingolfsgardur-lighthouse',
    mapsUrl: '',
    mapsQuery: 'Ingólfsgarður lighthouse, Reykjavík harbour',
  },
  {
    id: '28', no: '30', series: 'Series VII', title: 'Jón Vídalín',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'In the ruff of his office beside Dómkirkjan, Jón Vídalín, the bishop whose book of sermons was read aloud in Icelandic homes for two centuries.',
    gradient: 'linear-gradient(180deg,#eef1f0,#ccd5d1 50%,#93a49d 80%,#4e5f58)',
    image: '/photos/Jon-Vidalin.jpeg',
    slug: 'jon-vidalin',
    focus: 'top', // bust on a tall basalt pillar: keep the head, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Jón Vídalín memorial, Dómkirkjan, Reykjavík',
  },
  {
    id: '13', no: '31', series: 'Series IV', title: 'Ingólfur Arnarson',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.93°W', date: 'June 2026',
    description: 'Spear in hand on his green hill, Ingólfur Arnarson, the settler the sagas credit with founding Reykjavík.',
    gradient: 'linear-gradient(180deg,#fbfdfd,#e2eaec 55%,#b3c2c7 85%,#7f9197)',
    image: '/photos/Ingolfur-Arnarson.jpeg',
    slug: 'ingolfur-arnarson',
    focus: 'top', // tall subject: keep the head, crop from the bottom
    mapsUrl: 'https://maps.app.goo.gl/V4TDaYU63c3Zqz61A',
    mapsQuery: 'Ingólfur Arnarson statue, Arnarhóll, Reykjavík',
  },
  {
    id: '34', no: '32', series: 'Series VII', title: 'Shore Piece',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.92°W', date: 'July 2026',
    description: 'A run of boulders polished to a shine among the rough rock of the Sæbraut seawall, Sigurður Guðmundsson’s Fjöruverk, hiding in plain sight since 2002.',
    gradient: 'linear-gradient(180deg,#f0f2f4,#dcd6d4 50%,#b3a6a4 80%,#6e6a70)',
    image: '/photos/polished-boulders.jpeg',
    slug: 'shore-piece',
    mapsUrl: '',
    mapsQuery: 'The Shore Piece, Sæbraut, Reykjavík',
  },
  {
    id: '35', no: '33', series: 'Series VII', title: 'Looking Seawards',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'Two fishermen in oilskins reading the horizon by the old harbour, Looking Seawards, Ingi P. Gíslason’s 1997 tribute to the men who worked the sea.',
    gradient: 'linear-gradient(180deg,#eef3f5,#cad9dd 50%,#8ba3ab 80%,#4f6a72)',
    image: '/photos/Looking-seawards.jpeg',
    slug: 'looking-seawards',
    focus: 'top', // two standing figures: keep them, crop from the bottom
    mapsUrl: '',
    mapsQuery: 'Looking Seawards sculpture, Reykjavík harbour',
  },
  {
    id: '36', no: '34', series: 'Series VII', title: 'The Settlement Pillars',
    place: 'Reykjavík, Iceland', coords: '64.15°N 21.94°W', date: 'July 2026',
    description: 'A basalt pillar downtown that hisses real steam, marking where Ingólfur’s high seat pillars are said to have washed ashore and Reykjavík began.',
    gradient: 'linear-gradient(180deg,#eceef0,#c2c6cc 48%,#7c8088 80%,#3a3c42)',
    image: '/photos/Seat-Pillars-Monument.jpeg',
    slug: 'settlement-pillars',
    focus: 'top', // tall basalt pillar: keep the top, crop from the bottom
    mapsUrl: 'https://maps.app.goo.gl/N1XEhZ6AaXEA676w7',
    mapsQuery: 'Ingólfur Arnarson settlement pillars monument, Reykjavík',
  },
  /* ---- Add a plate by copying a block above: drop the photo in
     kyrrd/public/photos, set image/title/slug/description, then ask for the
     Journal article. Any plate left with an empty image is skipped. ---- */
];

export const findPlate = (key?: string): Plate =>
  PLATES.find((p) => p.id === key || p.slug === key) ?? PLATES[0];
