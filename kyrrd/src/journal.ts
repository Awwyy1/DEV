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
    slug: 'harpa',
    title: 'Harpa, the glass hall that almost never opened',
    kicker: 'Iceland · Field note',
    readMin: 5,
    date: 'June 2026',
    excerpt:
      'A great wall of coloured glass on the Reykjavík harbour that was left half built when the banks fell, and finished anyway as a sign the country was standing up again.',
    gradient: 'linear-gradient(160deg,#f4f6f7,#d7e0e3 55%,#9fb0b6)',
    image: '/photos/Harpa.jpeg',
    plateSlug: 'harpa',
    plateTitle: 'Harpa',
    body: [
      'It sits right on the edge of the old harbour, a great block of coloured glass that seems to change its mind every few minutes. When the sky is grey it goes quiet and slate coloured, and when the sun comes off the water it throws back blues and ambers and the odd flash of green. Walk inside and the same glass scatters the light across the floor and the walls, so that even on a dull afternoon there is something happening overhead.',
      'The shell was designed by the artist Olafur Eliasson together with the architects Henning Larsen, and it is built from hundreds of coloured panes shaped after the basalt columns you find along the Icelandic coast. The idea was to make a building that does to light what those cliffs do, breaking it into cells and handing it back in pieces. It works. From across the harbour Harpa reads less like a concert hall and more like a piece of the landscape that has learned a few new tricks.',
      'It almost did not happen. Construction began in 2007, and then in 2008 the banks of the country collapsed and the money for the project disappeared more or less overnight. For a while it stood half built by the water, a glass frame with nothing behind it, and there was a real argument about whether to walk away from it. In the end the state and the city decided to finish it rather than leave a ruin on the harbour, and when it opened in 2011 a lot of people read it as a sign that the country was finding its feet again.',
      'These days it is home to the Iceland Symphony Orchestra and the national opera, but you do not need a ticket to enjoy the best of it. The ground floor is open to anyone, the cafe looks out at the boats, and in the evening the glass is lit from within and turns the whole harbour front into something close to a slow fireworks display. Photographers tend to come at dusk, when the building and the sky are doing roughly the same thing.',
      'You will find it on the waterfront a short walk from the centre, close enough to the Sun Voyager that you can see one from the other. Go near sunset, or after dark when the panels light up, and give yourself time to stand still and watch the colours move across it. It rewards patience more than most buildings do.',
      'A photograph of Harpa carries a little of that story with it, a thing that was nearly lost and then kept. Sign one and send it to someone who is rebuilding something of their own, and the picture quietly says more than the words on it.',
    ],
  },
  {
    slug: 'althingi',
    title: 'Althingi, a parliament older than its house',
    kicker: 'Iceland · Field note',
    readMin: 6,
    date: 'June 2026',
    excerpt:
      'A modest grey stone house on a Reykjavík square that holds a parliament first gathered in the year 930, with four guardian spirits carved above its windows.',
    gradient: 'linear-gradient(180deg,#fff,#eaf0f2 52%,#cfd8dc 80%,#9aa9af)',
    image: '/photos/Althingi-Parliament.jpeg',
    plateSlug: 'althingi',
    plateTitle: 'Althingi Parliament House',
    body: [
      'On Austurvöllur, one of the small green squares in the middle of Reykjavík, there is a plain grey stone building two storeys high that you could easily walk past for a bank or an old school. People sit on the grass in front of it in summer, the cathedral stands quietly next door, and there is very little to tell you that this modest house is where the country makes its laws.',
      'The surprise is in the gap between the building and the thing it holds. The parliament inside, the Alþingi, was first gathered in the year 930 at Þingvellir, out in the rift valley to the east, which makes it one of the oldest parliaments anywhere in the world. The house itself is much younger. It was raised in 1880 and 1881 to a design by the Danish architect Ferdinand Meldahl, cut from Icelandic dolerite, so the idea inside is a thousand years older than the walls around it.',
      'Look up before you move on. Above four of the upper windows the stone carries the four guardian spirits of Iceland, the landvættir, a bull and a great bird and a dragon and a giant, the same four that hold up the country on its coat of arms. They are easy to miss and worth finding, four old protectors keeping a stone eye on the people passing laws below them.',
      'The square in front has its own quiet importance. Austurvöllur is where the city comes together, to celebrate on the national day and to complain loudly when it needs to, and in the cold early months of 2009, after the banks fell, it filled with people banging pots and pans until the government stepped down. The lawn in front of the parliament is, in a real sense, a national living room.',
      'You cannot wander inside without arrangement, but the building does not really ask you to. It rewards a slow look from the square, the stone, the spirits over the windows, the cathedral beside it, and the ordinary life of the city going on around something very old. It sits in the walkable centre of the old town, so it is easy to fold into a morning of wandering the nearby streets.',
      'To send a photograph of this small grey house is to send a thousand years of an idea folded into one quiet building. Add your own words to it for someone who values that kind of long patience, and the picture becomes a note as much as a postcard.',
    ],
  },
  {
    slug: 'partnership-sculpture',
    title: 'The Partnership, and the house just up the shore',
    kicker: 'Iceland · Field note',
    readMin: 5,
    date: 'June 2026',
    excerpt:
      'Two bronze figures holding on to each other on the Reykjavík shore, a gift between two countries, set a short walk from the house where the Cold War began to thaw.',
    gradient: 'linear-gradient(180deg,#fafafa,#e2eaec 60%,#b9c7cc)',
    image: '/photos/The-Partnership-Sculpture.jpeg',
    plateSlug: 'partnership-sculpture',
    plateTitle: 'The Partnership Sculpture',
    body: [
      'Out on the seafront path, east of the old harbour, two bronze figures lean into each other and hold on. They face the water and the long line of Mount Esja on the far side of the bay, and most people walk past them on the way to somewhere else. If you stop, the thing they are doing is plain enough. They are two separate shapes that have decided to stay joined.',
      'The sculpture is a gift, and the story behind it is unusually specific. In 1991 the American ambassador of the day, Charles Cobb, and his wife Sue gave it to the city to mark fifty years since Iceland and the United States first opened formal relations in 1941. The artist was Pétur Bjarnason, and he kept it simple, two people reaching for one another, which is about as clear as a statement of partnership between two countries can be. An identical version stands in Miami, on the other side of the same ocean.',
      'The place it stands gives it a second meaning that the makers could only have half intended. A few hundred metres further along the shore is Höfði, a white timber house on its own patch of lawn, and it was in that house in 1986 that Ronald Reagan and Mikhail Gorbachev sat down at a summit often credited with helping bring the Cold War toward its end. So a sculpture about two nations holding on sits within easy sight of the room where two superpowers tried to do the same thing.',
      'None of this announces itself. There is no grand plaza and no queue, just the path, the wind off the bay, and the two figures going quietly about their embrace while the city walks past. That is part of why it photographs so well. The drama is all in the shapes and the water behind them, and none of it in the staging.',
      'You will find it on the Sæbraut path, part of the run of sculptures along this stretch of coast, close enough to the Sun Voyager and to Höfði that the three of them make an easy and rewarding walk on a clear afternoon. Go when the light is low and the bay is calm, and let the two figures sit against the water.',
      'There are not many better things to send to a person you want to keep close than a photograph of two figures who have decided to hold on. Sign one with a few of your own words, and it carries exactly the thing it was built to say.',
    ],
  },
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
