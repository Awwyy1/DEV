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
    slug: 'water-carrier',
    title: 'The Water Carrier who waited years to stand',
    kicker: 'Iceland · Field note',
    readMin: 5,
    date: 'June 2026',
    excerpt:
      'A bronze woman near Lækjargata who carried water through the city long before the pipes arrived, and who waited years for Reykjavík to let her stand.',
    gradient: 'linear-gradient(180deg,#eef2f3 0%,#cdd8dc 50%,#8b999f 100%)',
    image: '/photos/WaterCarrier.jpeg',
    plateSlug: 'water-carrier',
    plateTitle: 'Water Carrier',
    body: [
      'She stands near Lækjargata, in the older part of central Reykjavík, a bronze woman bent forward under a wooden yoke with a pail of water hanging from each end. People pass her on their way to the shops without always noticing, which feels right, because for most of her life she was exactly the kind of person nobody looked at twice. If you stop in front of her for a moment you can see the weight in her shoulders and the patience in her face, and you begin to understand why she is here.',
      'Before Reykjavík had pipes in its walls, somebody had to bring the water. For a long time that somebody was usually a woman, often a poor one, who carried it from the wells and the pond to the houses of people who could pay her a little to do it. The work was heavy and endless and almost invisible, the sort of labour a town leans on without ever thanking. The statue is for her. Ásmundur Sveinsson, who made it, spent much of his life turning ordinary working people into bronze, and the water carrier is one of the most honest things he ever did.',
      'He shaped her in the nineteen thirties, and the city did not know what to do with her. Many people thought she was ugly. They wanted their public sculpture to lift the eye and flatter the nation, and here instead was a stooped figure doing hard manual work, with no grace added and nothing softened. The argument went on for years, and the statue waited while it played out. She only found her place in the city in the late nineteen forties, long after she was finished, once enough people had come round to the idea that a monument could honour effort instead of glory.',
      'Time has been kinder to her than her first audience was. The thing people once found unlovely is now the thing they value, because she tells the truth about how a small northern town actually kept itself alive. Reykjavík grew up around her, the wells closed, the pipes arrived, and the job she represents disappeared completely, which is the only reason we can afford to find her beautiful now.',
      'She is easy to visit and easy to miss, which is part of her charm. You will find her on a low base near the corner of Lækjargata, a short walk from the harbour and the pond, with the old timber houses of the centre around her. Morning is a good time, before the street fills up, when the light comes in low and the bronze still holds a little of the cold. Bring nothing in particular. Just stand where she is looking and imagine the same spot a hundred and thirty years ago, full of people doing exactly what she is doing.',
      'There is something fitting about turning a figure like this into a card and sending it to someone you are thinking of. She spent her working life carrying something heavy to a door that was not her own, because it mattered to the people inside. A photograph of her, with a few words of your own added, is a quieter version of the same small and deliberate act.',
    ],
  },
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
