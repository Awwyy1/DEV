/* ============================================================
   JOURNAL — add an article = add one { } block below.
     slug       URL: /journal/<slug>
     title      the headline
     kicker     small line above the title, e.g. 'Iceland · Field note'
     readMin    estimated reading minutes
     date       'June 2026'
     excerpt    one-sentence summary (shown on the list)
     image      '/photos/file.jpg' (hero); gradient is the fallback
     plateSlug  links the article to a photo card (the CTA at the end)
     body       array of paragraphs; each string is one paragraph
   Write like a person: plain, flowing sentences.
   ============================================================ */

export interface Post {
  slug: string;
  title: string;
  kicker: string;
  readMin: number;
  date: string;
  excerpt: string;
  gradient: string;
  image?: string;
  plateSlug?: string;
  plateTitle?: string;
  body: string[];
}

export const POSTS: Post[] = [
  {
    slug: 'grotta-lighthouse',
    title: 'Grótta Lighthouse, where the tide sets the schedule',
    kicker: 'Iceland · Field note',
    readMin: 6,
    date: 'June 2026',
    excerpt:
      'A small white lighthouse at the western edge of Reykjavík that you can only reach on foot when the sea allows it.',
    gradient: 'linear-gradient(180deg,#fff,#e8eef0 55%,#c9d4d8 78%,#9fb0b6)',
    image: '/photos/glacier-edge.jpg',
    plateSlug: 'grotta-lighthouse',
    plateTitle: 'Grótta Lighthouse',
    body: [
      'At the western edge of Reykjavík, past the last of the houses on Seltjarnarnes, the land thins out into a low spit of grass and rock and then gives up entirely. What is left is a small island with a white lighthouse on it, and for a few hours around every low tide you can walk straight out to it across a strip of sand that the sea keeps for itself the rest of the day.',
      'People who live in the city treat Grótta as a kind of release valve. It is close enough to reach on a whim after work, and yet it feels much further away than it really is, because the moment you step onto the causeway the traffic and the rooftops fall behind you and the only things left are the water, the birds, and the long flat light that Iceland does so well in the evenings. On a clear winter night it becomes one of the easiest places near the capital to stand under the northern lights without driving for an hour to find them.',
      'The lighthouse you see today went up in 1947, although there has been a light of one kind or another out here since the end of the nineteenth century. None of that is really the reason people come. The reason is the crossing. The sandbar that joins the island to the mainland floods completely at high tide, and it floods faster than most visitors expect, so the walk arrives with a small and genuine rule attached to it. You check the tide before you set out, you leave yourself room on both sides of low water, and you do not let a promising photograph talk you into staying ten minutes longer than you should. Every year a few people misjudge it and spend an uncomfortable hour on the island waiting for the sea to give the path back.',
      'When you time it well there is no drama in it at all, only a slow half kilometre of wet sand and the sound of oystercatchers complaining somewhere off to your left. Down in the rocks near the start of the path there is a tiny geothermal foot bath called Kvika, barely large enough for two pairs of feet, where you can sit and let the warm water draw the cold out of your toes while the colour builds in the sky. It is exactly the kind of small, unpolished detail that tells you more about a place than any landmark ever could.',
      'The birds deserve a mention of their own, partly because it is their home and partly because they decide when you are allowed to visit. Grótta is a protected nature reserve, and through the nesting season, which runs roughly from the start of May to the middle of July, the island is closed so that the Arctic terns and the eider ducks can raise their young undisturbed. The terns take their privacy especially seriously and will tell you very clearly when you have wandered too near a nest. Outside that window the crossing is yours, and the finest light usually falls in the shoulder months, when the days are long and low and far fewer people are sharing the view.',
      'Come for the evening if the forecast is kind to you. The whole peninsula faces west, so the sky does most of the work, and the lighthouse gives your eye something steady to hold while everything behind it turns the colour of cooling metal. Bring one more warm layer than you think you need, keep half an eye on the water the entire time, and let yourself stay until the city lights come on at your back. That is the Grótta most people carry home with them, and it is the one worth timing the tide for.',
    ],
  },
];

export const findPost = (slug?: string): Post | undefined => POSTS.find((p) => p.slug === slug);
