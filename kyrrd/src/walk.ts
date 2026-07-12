/* ============================================================
   THE LONG WALK — kyrrð walks · no. 1
   The route data for /walk. Stops reference plates by slug, so
   titles, photos and links always come from the live catalogue;
   only the hook line lives here. Distances and practical notes
   were measured on foot.
   ============================================================ */

export interface WalkStop {
  slug: string; // plate slug — resolves title, photo, /plate and /journal links
  hook: string; // one line under the name
}

export interface WalkPlaque {
  afterSlug: string; // rendered right after this stop
  label: string;
  text: string;
}

export interface WalkChapter {
  id: string; // anchor
  roman: string;
  title: string;
  area: string; // shown next to the stop range
  belongs: string; // the chapter's one-line theme
  photoSlug: string; // plate whose photo opens the chapter
  stops: WalkStop[];
  plaque?: WalkPlaque;
  hop?: string; // the leg to the next chapter, as written on the line
}

export const WALK_META = {
  stops: 30,
  km: '5.5',
  hours: '3–4',
  chapters: 7,
};

export const WALK: WalkChapter[] = [
  {
    id: 'c1',
    roman: 'I',
    title: 'The Founding',
    area: 'the old town',
    belongs:
      'This chapter belongs to a stone with steam rising beside it: the exact spot where, by the old story, the city chose itself.',
    photoSlug: 'settlement-pillars',
    stops: [
      { slug: 'settlement-pillars', hook: 'Where the country began, and the steam still rises.' },
      { slug: 'skuli-magnusson', hook: 'The overlooked founder, holding his rolled charter.' },
      { slug: 'vikurgardur', hook: 'Six centuries resting under the grass.' },
    ],
    plaque: {
      afterSlug: 'skuli-magnusson',
      label: 'Coffee · at stop 02',
      text: 'You start at the founding, not at a café. But stop 02 sits by the terrace at the back of Hotel Parliament, so take your coffee here and carry on refuelled.',
    },
    hop: '2 min to the square',
  },
  {
    id: 'c2',
    roman: 'II',
    title: 'The Republic',
    area: 'Austurvöllur',
    belongs: 'This chapter belongs to one square that holds an entire state.',
    photoSlug: 'jon-sigurdsson',
    stops: [
      { slug: 'ingibjorg-bjarnason', hook: "First woman through the parliament's door." },
      { slug: 'black-cone', hook: 'A monument to the right to refuse.' },
      { slug: 'jon-sigurdsson', hook: 'Won a country by footnotes, never raised more than an argument.' },
      { slug: 'althingi', hook: 'A parliament older than its house, gathered since 930.' },
      { slug: 'domkirkjan', hook: 'The real cathedral, the one the lawmakers return to.' },
      { slug: 'jon-vidalin', hook: 'The preacher Iceland read aloud for two hundred years.' },
      { slug: 'sera-bjarni', hook: 'The priest the whole town greeted.' },
    ],
    hop: '3 min up Lækjargata',
  },
  {
    id: 'c3',
    roman: 'III',
    title: 'The Government Hill',
    area: 'Lækjargata → Arnarhóll',
    belongs:
      'This chapter belongs to a white house built as a prison, and the settler on the hill above it.',
    photoSlug: 'ingolfur-arnarson',
    stops: [
      { slug: 'water-carrier', hook: "She carried the city's water before the pipes did." },
      { slug: 'government-house', hook: 'Raised as a prison, promoted to run the country.' },
      { slug: 'christian-ix', hook: 'Left corner of the lawn, the king with the constitution in hand.' },
      { slug: 'hannes-hafstein', hook: 'Right corner, the first Icelander to govern Iceland.' },
      { slug: 'ingolfur-arnarson', hook: 'The settler on his hill. The first small climb of the day.' },
    ],
    hop: '240 m down to the water',
  },
  {
    id: 'c4',
    roman: 'IV',
    title: 'The Harbour',
    area: 'Harpa',
    belongs:
      'This chapter belongs to two instruments nobody can play, beside a glass hall that changes with the sky.',
    photoSlug: 'harpa',
    stops: [
      { slug: 'cellist', hook: 'A cello with no strings; your memory supplies the sound.' },
      { slug: 'wind-harp', hook: 'A steel wave strung like a harp that the wind actually plays.' },
      { slug: 'harpa', hook: 'The hall the country finished during the crash. Free to walk in.' },
      { slug: 'ingolfsgardur-lighthouse', hook: 'The little yellow light at the mouth of the old harbour.' },
    ],
    plaque: {
      afterSlug: 'harpa',
      label: 'Pit stop · halfway',
      text: 'Hnoss inside Harpa is a proper rest, and the basement toilet is the best-kept in the centre: 200 kr, any card, contactless. Checked personally.',
    },
    hop: '600 m · ~5 min along the water',
  },
  {
    id: 'c5',
    roman: 'V',
    title: 'The Shore Line',
    area: 'Sæbraut',
    belongs: 'This chapter belongs to the sea: the easiest stretch of the day, not one road to cross.',
    photoSlug: 'sun-voyager',
    stops: [
      { slug: 'sun-voyager', hook: 'Not a Viking ship. An ode to the sun, facing Esja across the bay.' },
      { slug: 'islandsvardan', hook: 'A lava cairn with a window cut for the mountain. 260 m on.' },
      { slug: 'shore-piece', hook: 'The smoothest stones in the city, at exactly sitting height. 270 m.' },
      { slug: 'partnership-sculpture', hook: 'Two nations leaning in, an identical twin in Miami. 200 m.' },
      { slug: 'hofdi-lighthouse', hook: 'Born in 2019, dressed as 1917.' },
    ],
    hop: '240 m · cross the road here, the only crossing',
  },
  {
    id: 'c6',
    roman: 'VI',
    title: 'The Thaw',
    area: 'Höfði',
    belongs: 'This chapter belongs to one lawn where a thousand years and one Cold War meet.',
    photoSlug: 'hofdi-house',
    stops: [
      { slug: 'ondvegissulur', hook: 'The high seat pillars, cast in copper. 140 m in.' },
      { slug: 'berlin-wall', hook: 'The real thing, three and a half metres of it. 100 m.' },
      { slug: 'einar-benediktsson', hook: 'The poet who tried to sell the northern lights. 20 m.' },
      { slug: 'hofdi-house', hook: 'Where the Cold War began to thaw, 1986.' },
    ],
  },
  {
    id: 'c7',
    roman: 'VII',
    title: 'The Summit',
    area: 'Skólavörðuholt · the finale',
    belongs:
      'This chapter belongs to the church you have seen from every stop, and to the Viking who reached America first. The last climb, and the whole walk laid out below.',
    photoSlug: 'hallgrimskirkja',
    stops: [
      { slug: 'hallgrimskirkja', hook: 'Forty years to build, shaped like the basalt coast.' },
      { slug: 'leif-eriksson', hook: 'Reached America five centuries before Columbus. Stood here before the church did.' },
    ],
  },
];

/* The long hop between VI and VII gets its own treatment on the page. */
export const LONG_HOP = {
  big: '1.6 km · 20–25 min · uphill',
  note: 'The long hop, and the best reward. The church you have seen from every stop so far is next.',
};
