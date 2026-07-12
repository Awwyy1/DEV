import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PLATES } from '../plates';
import { POSTS } from '../journal';
import { WALK, WALK_META, LONG_HOP } from '../walk';
import { useSeo, useJsonLd } from '../seo';
import '../walk.css';

const SITE = 'https://kyrrd.pics';

const plateBySlug = (slug: string) => PLATES.find((p) => p.slug === slug);
const noteForPlate = (slug: string) => POSTS.find((p) => p.plateSlug === slug);

/* stop numbers run through the whole route, chapter by chapter */
const numberOf = (() => {
  const map = new Map<string, string>();
  let n = 0;
  for (const ch of WALK) for (const s of ch.stops) map.set(`${ch.id}:${s.slug}`, String(++n).padStart(2, '0'));
  return (chId: string, slug: string) => map.get(`${chId}:${slug}`) ?? '';
})();

export default function Walk() {
  useSeo(
    'The Long Walk — kyrrð',
    'A free self-guided walk through the heart of Reykjavík: 30 stops in seven chapters, 5.5 km one way, with the story behind every stop and the practical details checked on foot.',
  );
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The Long Walk — a free self-guided walk in Reykjavík',
    numberOfItems: WALK_META.stops,
    itemListElement: WALK.flatMap((ch) =>
      ch.stops.map((s) => {
        const plate = plateBySlug(s.slug);
        return {
          '@type': 'ListItem',
          position: Number(numberOf(ch.id, s.slug)),
          name: plate?.title ?? s.slug,
          url: `${SITE}/plate/${s.slug}`,
        };
      }),
    ),
  });

  const [active, setActive] = useState('c1');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );
    WALK.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const first = WALK[0].stops[0];
  const heroPlate = plateBySlug(first.slug);

  return (
    <div className="wk">
      {/* title page */}
      <header className="wk-hero">
        <div className="wk-no">kyrrð walks · no. 1 · self-guided · free</div>
        <h1>
          The Long
          <br />
          Walk<span className="eth">.</span>
        </h1>
        <p className="wk-arc">
          From the stone where the country began to the tower that watches over all of it.
        </p>
        <div className="wk-stats">
          <div className="wk-stat">
            <div className="v">{WALK_META.stops}</div>
            <div className="k">stops</div>
          </div>
          <div className="wk-stat">
            <div className="v">
              {WALK_META.km}
              <small> km</small>
            </div>
            <div className="k">one way</div>
          </div>
          <div className="wk-stat">
            <div className="v">
              {WALK_META.hours}
              <small> h</small>
            </div>
            <div className="k">with the stories</div>
          </div>
          <div className="wk-stat">
            <div className="v">{WALK_META.chapters}</div>
            <div className="k">chapters</div>
          </div>
          <div className="wk-stat">
            <div className="v">
              <span className="wk-free">
                0<small> kr</small>
              </span>
            </div>
            <div className="k">to walk it</div>
          </div>
        </div>
        <a className="btn btn-primary wk-go" href="#c1">
          Start at the stone where it all began ↓
        </a>
        <div className="wk-byline">
          Walked, photographed and written by one person. Every detail checked on foot.
        </div>
        <span className="wk-tail" />
      </header>

      {/* sticky chapter bar */}
      <nav className="wk-bar" aria-label="Chapters">
        <div className="in">
          <span className="t">
            The Long Walk · kyrr<span className="eth">ð</span>
          </span>
          <span className="wk-dots">
            {WALK.map((ch) => (
              <a key={ch.id} href={`#${ch.id}`} className={active === ch.id ? 'on' : ''}>
                {ch.roman}
              </a>
            ))}
          </span>
        </div>
      </nav>

      <div className="wk-col">
        <p className="wk-why">
          Guided walks in Reykjavík cost more than dinner and stop at six famous things. This one
          holds <b>thirty</b>, each with the story behind it, and it costs <span className="m">nothing</span>.
          It reads like a book: seven chapters, each with its own hero.
        </p>

        {/* contents */}
        <section className="wk-toc">
          <div className="h">The seven chapters</div>
          <ol>
            {WALK.map((ch) => {
              const nums = ch.stops.map((s) => numberOf(ch.id, s.slug));
              return (
                <li key={ch.id}>
                  <a href={`#${ch.id}`}>
                    <span className="rn">{ch.roman}</span>
                    <span className="nm">{ch.title}</span>
                    <span className="rng">
                      stops {nums[0]}–{nums[nums.length - 1]}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="wk-railnote">follow the line · it is the route</div>

        {/* the route */}
        {WALK.map((ch) => {
          const photo = plateBySlug(ch.photoSlug);
          const nums = ch.stops.map((s) => numberOf(ch.id, s.slug));
          return (
            <div className="wk-leg" id={ch.id} key={ch.id}>
              <div className="wk-chapter">
                <span className="ghost">{ch.roman}</span>
                <div>
                  <div className="rn">
                    Chapter {ch.roman} · stops {nums[0]}–{nums[nums.length - 1]} · {ch.area}
                  </div>
                  <h3>{ch.title}</h3>
                  <p className="belongs">{ch.belongs}</p>
                </div>
                <div
                  className="ph"
                  style={{
                    backgroundImage: photo?.image ? `url("${photo.image}")` : undefined,
                    backgroundPosition: photo?.focus || 'center',
                  }}
                />
              </div>

              {ch.stops.map((s) => {
                const plate = plateBySlug(s.slug);
                const note = noteForPlate(s.slug);
                return (
                  <div key={s.slug}>
                    <div className="wk-stop">
                      <span className="node">{numberOf(ch.id, s.slug)}</span>
                      <h4>{plate?.title ?? s.slug}</h4>
                      <div className="hook">{s.hook}</div>
                      <div className="links">
                        {note && <Link to={`/journal/${note.slug}`}>Story →</Link>}
                        {note && <span className="sep">·</span>}
                        <Link to={`/plate/${s.slug}`}>Send this place</Link>
                      </div>
                    </div>
                    {ch.plaque && ch.plaque.afterSlug === s.slug && (
                      <div className="wk-plaque">
                        <div className="k">{ch.plaque.label}</div>
                        <p>{ch.plaque.text}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {ch.hop && (
                <div className="wk-hop">
                  <span className="in">
                    <span className="arr">↓</span>
                    <span className="txt">{ch.hop}</span>
                  </span>
                </div>
              )}
              {ch.id === 'c6' && (
                <div className="wk-longhop">
                  <div className="big">
                    1.6 km · 20–25 min · <b>uphill</b>
                  </div>
                  <p>{LONG_HOP.note}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* ending */}
        <section className="wk-ending">
          <div className="fin">That's the walk</div>
          <h2>From the stone where it began to the tower that watches it.</h2>
          <p>
            You have walked the <b>heart</b> of Reykjavík: its founding, its republic, its harbour
            and its highest point. There is more city than this, but few lines hold more of its
            story.
          </p>
        </section>

        {/* annex */}
        <div className="wk-annex">
          <div className="wk-acard">
            <div className="k">Getting back</div>
            <h3>Two ways down from the hill.</h3>
            <p>
              <b>Walk it out:</b> from the church, all of downtown is ten minutes downhill, and
              every street leads back into it.
            </p>
            <p style={{ marginTop: 10 }}>
              <b>Or bus from near Höfði (Höfðatorg):</b>
            </p>
            <div className="wk-buses">
              {['2', '4', '5', '12', '14', '16', '17'].map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
            <p style={{ marginTop: 10 }}>
              <b>670 kr</b>, contactless. Board at the front door; with a bike, scooter or pram,
              use the middle door. Stop displays on board.
            </p>
          </div>

          <div className="wk-notes">
            <div className="wk-note">
              <div className="t">Weather</div>
              <p>
                Rain and fog are the real Iceland. Every photo here was shot in whatever the sky
                was doing.
              </p>
            </div>
            <div className="wk-note">
              <div className="t">Two climbs</div>
              <p>
                Mostly flat pavement along the water. The rises are the grassy hill at stop 15 and
                the final pull to the church, both earned by the view.
              </p>
            </div>
            <div className="wk-note">
              <div className="t">Pace</div>
              <p>
                Three hours easy with the stories and a coffee. It is a line, not a race; join or
                leave at any stop.
              </p>
            </div>
          </div>
        </div>

        {/* send as you go */}
        <div className="wk-send">
          <div className="in">
            <div>
              <div className="k">Send as you go</div>
              <h3>Walk it with someone in mind.</h3>
              <p>
                Pick a person before you set out. At every stop you love, send them that place as
                a signed card, straight from your phone. Thirty chances.
              </p>
              <Link className="btn btn-primary" to={`/plate/${first.slug}`}>
                Start with stop 01 →
              </Link>
            </div>
            <div
              className="wk-minicard"
              style={{ backgroundImage: heroPlate?.image ? `url("${heroPlate.image}")` : undefined }}
            >
              <span className="wm">
                kyrr<span className="eth">ð</span>.pics
              </span>
              <span className="m">Started where the whole country did.</span>
            </div>
          </div>
        </div>

        <div className="wk-foot-pad" />
      </div>
    </div>
  );
}
