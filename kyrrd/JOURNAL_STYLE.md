# kyrrð — Journal writing style

The voice the Grótta Lighthouse piece is written in. Follow this for every
article so it never has to be explained again. To commission one, just say
"write a Journal article about <place>" and this file is the brief.

## Principles
- Write like one knowledgeable person talking to another. Calm, warm, unhurried.
- Lead with place and feeling, then weave the useful facts in (history, tides,
  seasons, light, how to get there). Information arrives inside the story, not
  as a checklist.
- Second person is welcome ("you check the tide before you set out"). First
  person only when it genuinely helps.
- Specific, verifiable detail beats adjectives. Name the year, the bird, the
  footbath, the season. Get the facts right.
- Every article ties back to one photograph in the archive: it ends with the
  CTA to that card (set `plateSlug` in the post).

## Hard rules (non-negotiable)
- NO dashes of any kind. No em dash, no en dash. Use commas, the word "and",
  parentheses, or a full stop instead.
- NO clipped or fragment sentences. Every sentence is complete and flows into
  the next. No one-word or half sentences for effect.
- NO AI tells: avoid "whether you're... or...", "nestled", "boasts", "stands as
  a testament", "in the heart of", "hidden gem", "breathtaking", "rich
  tapestry", "isn't just X, it's Y", "In conclusion", "Ultimately", "Nestled".
- NO bullet lists in the body and no forced groups of three. It reads as an
  essay, in paragraphs.
- NO exclamation marks, no hype, no "buy now".
- Pick British or American spelling and stay consistent within the piece.

## Shape
- Five to eight paragraphs, roughly 600 to 900 words.
- A grounded opening that puts the reader in the place.
- A practical middle, written as prose: how it works, when to go, what to watch
  for, the light.
- A quiet closing image, not a summary.

## Reference tone (match this)
"At the western edge of Reykjavík, past the last of the houses on Seltjarnarnes,
the land thins out into a low spit of grass and rock and then gives up entirely.
What is left is a small island with a white lighthouse on it, and for a few hours
around every low tide you can walk straight out to it across a strip of sand that
the sea keeps for itself the rest of the day."

## Where it goes
Each finished article becomes one block in `kyrrd/src/journal.ts`
(slug, title, kicker, readMin, date, excerpt, image, plateSlug, body).
