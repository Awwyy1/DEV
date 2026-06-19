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
    slug: 'hallgrimskirkja',
    title: 'Hallgrímskirkja, the church built to look like lava',
    kicker: 'Iceland · Field note',
    readMin: 6,
    date: 'June 2026',
    excerpt:
      'The pale tower above Reykjavík took more than forty years to build, and its front was shaped to echo the basalt columns of the Icelandic coast.',
    gradient: 'linear-gradient(200deg,#f4f6f7,#dfe7e9 50%,#aebcc1 85%,#6f8389)',
    image: '/photos/Hallgrimskirkja.jpeg',
    plateSlug: 'hallgrimskirkja',
    plateTitle: 'Hallgrímskirkja',
    body: [
      'You can see it from almost anywhere in Reykjavík. The church stands on Skólavörðuholt, the low hill at the top of the old town, and its pale grey tower rises over the coloured roofs like something the city was built around rather than something added to it later. Walk up Skólavörðustígur toward it and the front opens out in front of you, two great wings of stepped concrete sweeping down from the tower to the ground, with a statue of Leif Erikson keeping watch on the slope below.',
      'The shape is not an accident and it is not borrowed from anywhere else. The architect, Guðjón Samúelsson, looked at the basalt columns that form along the Icelandic coast, the tall hexagonal pillars you find at places like Reynisfjara and Svartifoss, and he built the front of the church to echo them. The result is a building that seems to have grown out of the same ground as the cliffs, which is a rare thing for a church to manage. It reads as Icelandic before it reads as anything religious.',
      'It was also built with enormous patience. The design dates to the late nineteen thirties, the first concrete was poured in 1945, and the church was not finished until 1986, more than forty years later. Guðjón did not live to see it rise to any real height, since he died in 1950, so the tower he drew was raised by other hands over the decades that followed. A whole generation of people in Reykjavík grew up watching it slowly become itself.',
      'The name belongs to a writer rather than a king or a bishop. Hallgrímur Pétursson was a seventeenth century poet and clergyman, best known for a long cycle of hymns on the passion of Christ that Icelanders have carried with them for centuries. There is something telling about a nation giving its largest church the name of a poet. Words have always mattered here, and the building is, among other things, a monument to a man who was good with them.',
      'Most people go up the tower, and they are right to. A lift takes you most of the way and a short set of steps does the rest, and at the top the whole city is laid out beneath you, the red and blue and green roofs, the bay, and Mount Esja on the far side. The inside is the opposite of the view, plain and tall and full of pale light, with a great organ at the back and very little decoration to pull your attention around. Early morning is the calm time, before the tour groups arrive.',
      'To send a photograph of Hallgrímskirkja is to send a small piece of the city that everyone in it can see from their own window. Add a few of your own words to it and it stops being a postcard of a landmark and becomes something closer to a note from a particular person who stood on that hill on a particular day. That is the difference we are after.',
    ],
  },
  {
    slug: 'sun-voyager',
    title: 'The Sun Voyager is not a Viking ship',
    kicker: 'Iceland · Field note',
    readMin: 5,
    date: 'June 2026',
    excerpt:
      'A gleaming steel boat on the Reykjavík waterfront that almost everyone reads as a Viking ship, and that its maker meant as something else entirely.',
    gradient: 'linear-gradient(160deg,#eef3f4,#cdd9dc 60%,#8fa3aa)',
    image: '/photos/The-Sun-Voyager.jpeg',
    plateSlug: 'sun-voyager',
    plateTitle: 'The Sun Voyager',
    body: [
      'It sits on the edge of the Reykjavík waterfront, a polished steel frame in the shape of a boat, with ribs that curve up toward the sky and a prow that points across the bay at Mount Esja. People drift toward it all day, and by the end of the afternoon there is usually a small crowd standing around it, waiting for the light to do something. From a distance it looks like the clean skeleton of a ship that someone has set down carefully by the sea.',
      'Almost everyone who meets it decides it is a Viking ship. It is easy to see why, with those swept lines and that hopeful prow, and the guides on the buses are not always in a hurry to correct anyone. The man who made it would have gently put them right. He thought of it as a dream boat, a vessel of light, an ode to the sun and to the idea of sailing toward country you have not seen yet. The Icelandic name, Sólfar, means something close to the sun voyager, and the work is about longing and the promise of somewhere new rather than about raiding a coastline.',
      'Its maker was Jón Gunnar Árnason, a sculptor who spent his life interested in boats and in the sea and in the way metal can be made to feel weightless. He was already ill while he worked on it, and he died in 1989, before it was finished and set in place. The Sun Voyager was raised on the waterfront in 1990, so the city never got to show it to him standing where he meant it to stand. There is something quiet and fitting about a sculpture devoted to setting out that its own author never quite arrived to see.',
      'The location does half the work. The sculpture faces north across the water at Esja, the long flat mountain that changes colour with every passing hour, and the steel takes whatever the sky is doing and hands it back to you. On a grey day it is cool and severe. In the low gold light of a summer evening it turns warm and almost liquid. The same object gives you a different photograph depending on when you stand in front of it, which is part of why people keep coming back to it.',
      'It is an easy thing to visit. You walk east along the Sæbraut path from the old harbour and the Harpa concert hall, ten minutes or so with the sea on one side, and you will see it before you reach it. Sunset is the obvious time and it does get busy, but the crowd tends to thin if you wait a little, and there is room to stand apart and let the boat sit empty against the water. Bring a warm layer even in summer, because the wind comes straight off the bay.',
      'A photograph of the Sun Voyager carries the same thing the sculpture does, which is the feeling of facing outward and wishing someone well on whatever they are heading toward. That makes it a natural thing to sign and send. You are handing a person a small steel boat pointed at the horizon, with a few of your own words attached, which is a gentle way to tell someone that you are thinking of where they are going.',
    ],
  },
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
