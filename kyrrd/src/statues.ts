/* ============================================================
   STATUES — the /statues hub: every statue, sculpture and
   memorial in the archive, set out chapter by chapter along
   The Long Walk, so each one sits where the walk, measured on
   foot, meets it. The few that are not on the route come last.
   Like plates.ts, journal.ts and walk.ts this module imports no
   code (only types), so the prerender and the sitemap can load it
   on its own; the catalogue is passed in. Every name, sentence,
   maker and year comes from the notes; where a note does not say,
   the field is left empty rather than guessed.
   ============================================================ */
import type { Plate } from './plates';
import type { Post } from './journal';
import type { WalkChapter } from './walk';

/** The archive's tags that belong on this page. */
export const STATUE_TAGS = ['Statues', 'Sculpture', 'Memorials'];
export const isStatue = (plate?: Plate) => !!plate && STATUE_TAGS.includes(plate.tags?.[0] ?? '');

/**
 * Works that are not on The Long Walk, in the order the last section lists
 * them, with where they stand. One missing from this list still appears, at
 * the end of the section.
 */
const OFF_ROUTE: { slug: string; near: string }[] = [
  { slug: 'olafur-thors', near: 'by the pond' },
  { slug: 'unknown-bureaucrat', near: 'by the pond' },
  { slug: 'ur-alogum', near: 'by the pond' },
  { slug: 'looking-seawards', near: 'at the old harbour' },
];

export interface StatueArea {
  id: string; // anchor; for a chapter it is the walk page's own anchor
  name: string;
}

/** Years a note states in its text where its fact table has none. */
const YEAR_FROM_TEXT: Record<string, string> = {
  'unknown-bureaucrat': '1993', // made in 1993 (the plaque, reykjavik.is); the city set it up in 1994
  'berlin-wall': '2015', // "It arrived on the third of October 2015"
  vikurgardur: '2000', // "presented to the city on the sixteenth of June 2000"
  'black-cone': '2012', // "unveiled in 2012"
};
const YEAR_KEYS = [
  'Unveiled',
  'In place since',
  'Set up',
  'Raised',
  'On the hill since',
  'Made',
  'Finished',
  'Given',
  'On the square since',
  'Memorial raised',
];

/** One line for each sculptor with more than one work here, from the notes. */
const MAKER_LINE: Record<string, string> = {
  'Einar Jónsson': 'Iceland’s first professional sculptor.',
  'Sigurjón Ólafsson': 'He modelled séra Bjarni in the cathedral itself, in the real vestments.',
  'Ásmundur Sveinsson': 'He spent much of his life turning ordinary working people into bronze.',
};

const TYPE: Record<string, StatueType> = { Statues: 'Statue', Sculpture: 'Sculpture', Memorials: 'Memorial' };

export type StatueType = 'Statue' | 'Sculpture' | 'Memorial';

export interface StatueItem {
  slug: string; // plate slug
  note: string; // journal slug
  name: string;
  type: StatueType;
  image: string;
  focus?: string;
  line: string; // first sentence of the note's In short
  by: string;
  year: string;
  where: string;
  stop: number | null; // on The Long Walk
  area: StatueArea;
}

export interface StatueSection extends StatueArea {
  chapter: { id: string; roman: string; title: string; area: string; first: number; last: number } | null;
  items: StatueItem[];
  also: { slug: string; name: string; stop: number; note: string | null }[];
}

function yearOf(slug: string, facts: [string, string][]): string {
  if (YEAR_FROM_TEXT[slug]) return YEAR_FROM_TEXT[slug];
  for (const [k, v] of facts) {
    if (!YEAR_KEYS.includes(k)) continue;
    if (/nineteen thirties/i.test(v)) return '1930s';
    const m = v.match(/\b(1[5-9]\d\d|20\d\d)\b/);
    if (m) return m[1];
  }
  return '';
}

export function buildStatues(
  plates: Plate[],
  posts: Post[],
  walk: WalkChapter[],
  firstSentence: (text: string) => string,
) {
  const stopOf: Record<string, number> = {};
  let n = 0;
  for (const ch of walk) for (const s of ch.stops) stopOf[s.slug] = ++n;
  const plateOf = (slug: string) => plates.find((p) => p.slug === slug);
  const postOf = (slug: string) => posts.find((p) => p.plateSlug === slug);

  const item = (plate: Plate, area: StatueArea): StatueItem[] => {
    const slug = plate.slug ?? plate.id;
    const post = postOf(slug);
    if (!post || !plate.image) return [];
    const facts = post.facts ?? [];
    const fact = (...keys: string[]) => facts.find(([k]) => keys.includes(k))?.[1] ?? '';
    return [
      {
        slug,
        note: post.slug,
        name: post.plateTitle ?? plate.title,
        type: TYPE[plate.tags?.[0] ?? ''] ?? 'Sculpture',
        image: plate.image,
        focus: plate.focus,
        line: firstSentence(post.inShort ?? post.excerpt),
        by: fact('Sculptor', 'Artist'),
        year: yearOf(slug, facts),
        where: fact('Where') || area.name,
        stop: stopOf[slug] ?? null,
        area,
      },
    ];
  };

  // The walk's chapters, in its order, with its names and stop numbers. The
  // chapter's other stops (buildings, lighthouses) are named under it, so a
  // chapter here holds exactly the stops it holds on the walk.
  const chapters: StatueSection[] = walk
    .map((ch) => {
      const area: StatueArea = { id: ch.id, name: ch.title };
      const nums = ch.stops.map((s) => stopOf[s.slug]);
      return {
        ...area,
        chapter: { id: ch.id, roman: ch.roman, title: ch.title, area: ch.area, first: Math.min(...nums), last: Math.max(...nums) },
        items: ch.stops.flatMap((s) => {
          const plate = plateOf(s.slug);
          return plate && isStatue(plate) ? item(plate, area) : [];
        }),
        also: ch.stops
          .filter((s) => !isStatue(plateOf(s.slug)))
          .flatMap((s) => {
            const plate = plateOf(s.slug);
            return plate
              ? [{ slug: s.slug, name: postOf(s.slug)?.plateTitle ?? plate.title, stop: stopOf[s.slug], note: postOf(s.slug)?.slug ?? null }]
              : [];
          }),
      };
    })
    .filter((c) => c.items.length);

  // then the works the route does not pass
  const offArea: StatueArea = { id: 'off-route', name: 'Off the route' };
  const rank = (slug: string) => {
    const i = OFF_ROUTE.findIndex((o) => o.slug === slug);
    return i < 0 ? OFF_ROUTE.length : i;
  };
  const offItems = plates
    .filter((p) => isStatue(p) && !stopOf[p.slug ?? p.id])
    .sort((a, b) => rank(a.slug ?? a.id) - rank(b.slug ?? b.id))
    .flatMap((p) => item(p, offArea));
  const areas: StatueSection[] = offItems.length
    ? [...chapters, { ...offArea, chapter: null, items: offItems, also: [] }]
    : chapters;

  const items = areas.flatMap((a) => a.items);
  const count = (t: StatueType) => items.filter((i) => i.type === t).length;

  const byMaker: Record<string, StatueItem[]> = {};
  for (const i of items) if (i.by) (byMaker[i.by] ??= []).push(i);
  const makers = Object.entries(byMaker)
    .filter(([, list]) => list.length > 1)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([name, list]) => ({ name, line: MAKER_LINE[name] ?? '', items: list }));

  const onWalk = items.filter((i) => i.stop).length;
  // where the works off the route stand, said from the data so it cannot go stale
  const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const groups: [string, number][] = [];
  for (const i of offItems) {
    const near = OFF_ROUTE.find((o) => o.slug === i.slug)?.near ?? 'elsewhere in the centre';
    const g = groups.find(([k]) => k === near);
    if (g) g[1] += 1;
    else groups.push([near, 1]);
  }
  const offWalk = groups.map(([near, count]) => `${WORDS[count] ?? count} ${near}`).join(' and ');
  const sun = posts.find((p) => p.slug === 'sun-voyager');
  const einar = byMaker['Einar Jónsson'] ?? [];
  const faq = [
    {
      q: 'Are Reykjavík’s statues free to visit?',
      a: 'Every work on this page stands outdoors, in a square, a park, a garden or on the shore, and none of them charges for entry.',
    },
    {
      q: 'Who made the most statues on this page?',
      a: `Einar Jónsson, Iceland’s first professional sculptor, made ${einar.length} of them: ${einar
        .map((i) => i.name)
        .join(', ')}. Sigurjón Ólafsson made ${byMaker['Sigurjón Ólafsson']?.length ?? 0} and Ásmundur Sveinsson ${
        byMaker['Ásmundur Sveinsson']?.length ?? 0
      }.`,
    },
    {
      q: 'Can I see them all on one walk?',
      a: `${onWalk} of the ${items.length} lie on The Long Walk, a free self-guided route of 5.5 km that takes 3 to 4 hours. The other ${
        WORDS[items.length - onWalk] ?? items.length - onWalk
      }, ${offWalk}, are listed here with where they stand.`,
    },
    ...(sun?.inShort ? [{ q: 'Is the Sun Voyager a Viking ship?', a: sun.inShort }] : []),
  ];

  return {
    areas,
    items,
    counts: { all: items.length, Statue: count('Statue'), Sculpture: count('Sculpture'), Memorial: count('Memorial') },
    onWalk,
    offWalk,
    makers,
    madeByMakers: makers.reduce((s, m) => s + m.items.length, 0),
    faq,
  };
}

export type Statues = ReturnType<typeof buildStatues>;

export const statuesTitle = (n: number) => `Statues and Sculptures of Reykjavík: ${n} to See on Foot — kyrrð`;
export const STATUES_DESCRIPTION =
  'Every statue, sculpture and memorial in the archive, by where it stands in Reykjavík, with who made it and the story behind it. All free to see.';
export const statuesInShort = (s: Statues) =>
  `This page lists the ${s.counts.all} statues, sculptures and memorials in the kyrrð archive, chapter by chapter along The Long Walk, a free self-guided route of 5.5 km, so each one sits where the walk meets it. The ${
    ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][s.counts.all - s.onWalk] ??
    s.counts.all - s.onWalk
  } the route does not pass, ${s.offWalk}, come last. Every one stands outdoors and is free to see.`;
