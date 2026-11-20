/* ============================================================
   STATUES — the /statues hub: every statue, sculpture and
   memorial in the archive, grouped by where it stands.
   Like plates.ts, journal.ts and walk.ts this module imports no
   code (only types), so the prerender and the sitemap can load it
   on its own; the catalogue is passed in. Every name, sentence,
   maker and year comes from the notes; where a note does not say,
   the field is left empty rather than guessed.
   ============================================================ */
import type { Plate } from './plates';
import type { Post } from './journal';
import type { WalkChapter } from './walk';

export interface StatueArea {
  id: string; // anchor
  name: string;
  slugs: string[]; // plate slugs, in walking order
}

/** Areas in the order The Long Walk meets them; Tjörnin holds the two off it. */
export const STATUE_AREAS: StatueArea[] = [
  { id: 'old-town', name: 'The old town', slugs: ['settlement-pillars', 'skuli-magnusson', 'vikurgardur'] },
  { id: 'tjornin', name: 'Tjörnin, the pond', slugs: ['olafur-thors', 'unknown-bureaucrat'] },
  {
    id: 'austurvollur',
    name: 'Austurvöllur',
    slugs: ['ingibjorg-bjarnason', 'black-cone', 'jon-sigurdsson', 'jon-vidalin', 'sera-bjarni'],
  },
  {
    id: 'arnarholl',
    name: 'Lækjargata and Arnarhóll',
    slugs: ['water-carrier', 'christian-ix', 'hannes-hafstein', 'ingolfur-arnarson'],
  },
  { id: 'harbour', name: 'Harpa and the old harbour', slugs: ['cellist', 'wind-harp', 'looking-seawards'] },
  {
    id: 'saebraut',
    name: 'The Sæbraut shore',
    slugs: ['sun-voyager', 'islandsvardan', 'shore-piece', 'partnership-sculpture'],
  },
  { id: 'hofdi', name: 'Höfði', slugs: ['ondvegissulur', 'berlin-wall', 'einar-benediktsson'] },
  { id: 'holt', name: 'Skólavörðuholt', slugs: ['leif-eriksson', 'ur-alogum'] },
];

/** Years a note states in its text where its fact table has none. */
const YEAR_FROM_TEXT: Record<string, string> = {
  'unknown-bureaucrat': '1994', // "found this idea and cast it in 1994"
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

  const areas = STATUE_AREAS.map((area) => ({
    ...area,
    items: area.slugs.flatMap((slug): StatueItem[] => {
      const plate = plates.find((p) => p.slug === slug);
      const post = posts.find((p) => p.plateSlug === slug);
      if (!plate || !post || !plate.image) return [];
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
    }),
  }));
  const items = areas.flatMap((a) => a.items);
  const count = (t: StatueType) => items.filter((i) => i.type === t).length;

  const byMaker: Record<string, StatueItem[]> = {};
  for (const i of items) if (i.by) (byMaker[i.by] ??= []).push(i);
  const makers = Object.entries(byMaker)
    .filter(([, list]) => list.length > 1)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([name, list]) => ({ name, line: MAKER_LINE[name] ?? '', items: list }));

  const onWalk = items.filter((i) => i.stop).length;
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
        items.length - onWalk
      }, by the pond, at the old harbour and behind Hallgrímskirkja, are listed here with where they stand.`,
    },
    ...(sun?.inShort ? [{ q: 'Is the Sun Voyager a Viking ship?', a: sun.inShort }] : []),
  ];

  return {
    areas,
    items,
    counts: { all: items.length, Statue: count('Statue'), Sculpture: count('Sculpture'), Memorial: count('Memorial') },
    onWalk,
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
  `This page lists the ${s.counts.all} statues, sculptures and memorials in the kyrrð archive, grouped by where they stand in Reykjavík. Every one stands outdoors and is free to see, and ${s.onWalk} of them lie on The Long Walk, a free self-guided route of 5.5 km.`;
