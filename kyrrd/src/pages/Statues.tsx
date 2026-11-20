import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLATES } from '../plates';
import { firstSentence, POSTS } from '../journal';
import { WALK } from '../walk';
import { buildStatues, STATUES_DESCRIPTION, statuesInShort, statuesTitle, type StatueType } from '../statues';
import { useSeo } from '../seo';
import PinIcon from '../components/PinIcon';
import '../statues.css';

const DATA = buildStatues(PLATES, POSTS, WALK, firstSentence);
const MOSAIC = ['leif-eriksson', 'jon-sigurdsson', 'sun-voyager', 'unknown-bureaucrat', 'einar-benediktsson', 'water-carrier'];
const crop = (focus?: string) => (focus === 'top' ? 'center top' : focus || 'center');
// "The Berlin Wall" belongs under B in an index, not under T
const bare = (s: string) => s.replace(/^The /, '');

type Filter = 'all' | StatueType;

export default function Statues() {
  const [filter, setFilter] = useState<Filter>('all');
  const [view, setView] = useState<'areas' | 'table'>('areas');
  const { areas, items, counts, onWalk, makers, madeByMakers, faq } = DATA;

  useSeo(statuesTitle(counts.all), STATUES_DESCRIPTION, { image: '/photos/Leif-Eriksson.jpeg' });
  // The ItemList, FAQ and breadcrumbs are written into the served HTML by the
  // prerender from the same data, which is what search engines read; adding
  // them again here would put every block on the page twice.

  const shows = (t: StatueType) => filter === 'all' || filter === t;
  const mosaic = MOSAIC.map((s) => items.find((i) => i.slug === s)).filter((i) => !!i);
  const sorted = [...items].sort((a, b) => bare(a.name).localeCompare(bare(b.name), 'is'));

  return (
    <div className="st">
      <div className="wrap">
        <section className="st-hero">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/archive">Archive</Link>
              <span className="sep" aria-hidden="true">
                ▸
              </span>
              <span className="here">Statues and sculptures</span>
            </nav>
            <h1 className="st-h1">Statues and sculptures of Reykjavík</h1>
            <p className="st-lede">
              Every statue, sculpture and memorial in the archive, where it stands, who made it and the story behind
              it. Photographed on a phone, all outdoors, all free to see.
            </p>
            <div className="st-stats">
              <span>
                <b>{counts.all}</b>works
              </span>
              <span>
                <b>{counts.Statue}</b>statues
              </span>
              <span>
                <b>{counts.Sculpture}</b>sculptures
              </span>
              <span>
                <b>{counts.Memorial}</b>memorials
              </span>
              <span>
                <b>0</b>kr
              </span>
            </div>
          </div>
          <div className="st-mosaic" aria-hidden="true">
            {mosaic.map((i) => (
              <span
                key={i.slug}
                style={{ backgroundImage: `url("${i.image}")`, backgroundPosition: crop(i.focus) }}
              />
            ))}
          </div>
        </section>

        <div className="in-short st-short">
          <div className="in-short-k">In short</div>
          <p>{statuesInShort(DATA)}</p>
        </div>
      </div>

      {/* the controls stick only while the list is on screen, and not at all on
          a phone, where stuck to the top they would take half of it */}
      <div className="st-list">
        <div className="st-ctl">
          <div className="wrap">
            <div className="st-ctl-in">
              <div className="st-chips">
                {(['all', 'Statue', 'Sculpture', 'Memorial'] as Filter[]).map((f) => (
                  <button
                    key={f}
                    className={`st-chip${filter === f ? ' on' : ''}`}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {f === 'all' ? 'All' : f === 'Sculpture' ? 'Sculpture' : `${f}s`}
                    <b>{f === 'all' ? counts.all : counts[f]}</b>
                  </button>
                ))}
              </div>
              <div className="st-seg">
                <button className={view === 'areas' ? 'on' : ''} onClick={() => setView('areas')}>
                  By area
                </button>
                <button className={view === 'table' ? 'on' : ''} onClick={() => setView('table')}>
                  A to Z
                </button>
              </div>
            </div>
            {view === 'areas' && (
              <div className="st-idx">
                {areas.map((a) => (
                  <a key={a.id} href={`#${a.id}`}>
                    {a.name} <b>{a.items.length}</b>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="wrap">
          {view === 'areas' ? (
            areas.map((a, idx) => {
              const visible = a.items.filter((i) => shows(i.type));
              if (!visible.length) return null;
              // the area is the walk's chapter, stop for stop
              const meta = a.chapter
                ? `Chapter ${a.chapter.roman} of The Long Walk, ${a.chapter.title} · stops ${a.chapter.first} to ${a.chapter.last}`
                : 'Not on The Long Walk';
              return (
                <section className="st-area" id={a.id} key={a.id}>
                  <header className="st-area-h">
                    <span className="st-area-i">{String(idx + 1).padStart(2, '0')}</span>
                    <div>
                      <h2>{a.name}</h2>
                      <p>{meta}</p>
                    </div>
                  </header>
                  <div className="st-grid">
                    {visible.map((i) => (
                      <Link key={i.slug} to={`/journal/${i.note}`} className="st-card">
                        <span className="st-ph">
                          <img
                            src={i.image}
                            alt={`${i.name}, Reykjavík`}
                            loading="lazy"
                            style={{ objectPosition: crop(i.focus) }}
                          />
                        </span>
                        <span className="st-b">
                          <span className="st-k">
                            {i.type}
                            <i>·</i>
                            {i.stop ? `Stop ${i.stop} on the walk` : 'Off the walk'}
                          </span>
                          <span className="st-n">{i.name}</span>
                          <span className="st-w">
                            <PinIcon /> {i.where}
                          </span>
                          <span className="st-l">{i.line}</span>
                          {(i.by || i.year) && <span className="st-m">{[i.by, i.year].filter(Boolean).join(' · ')}</span>}
                          <span className="st-go">
                            Read the note <b>→</b>
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  {filter === 'all' && a.also.length > 0 && (
                    <div className="st-also">
                      <span>Also on this stretch of the walk</span>
                      {a.also.map((x) =>
                        x.note ? (
                          <Link key={x.slug} to={`/journal/${x.note}`}>
                            Stop {x.stop} · {x.name}
                          </Link>
                        ) : (
                          <span key={x.slug} className="st-also-x">
                            Stop {x.stop} · {x.name}
                          </span>
                        ),
                      )}
                    </div>
                  )}
                </section>
              );
            })
          ) : (
            <div className="st-tbl">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Made by</th>
                    <th>Year</th>
                    <th>Where</th>
                    <th>Walk stop</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted
                    .filter((i) => shows(i.type))
                    .map((i) => (
                      <tr key={i.slug}>
                        <td>
                          <Link to={`/journal/${i.note}`}>{i.name}</Link>
                        </td>
                        <td>{i.type}</td>
                        {/* where a note does not say, a dot, not a guess */}
                        <td className={i.by ? undefined : 'e'}>{i.by || <span className="nil">·</span>}</td>
                        <td className={i.year ? 'y' : 'e'}>{i.year || <span className="nil">·</span>}</td>
                        <td>{i.where}</td>
                        <td className={i.stop ? 's' : 'off'}>{i.stop ?? 'Not on the walk'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <section className="st-band">
        <div className="wrap">
          <div className="st-band-k">Who made them</div>
          <h2>
            Three sculptors made {madeByMakers} of the works on this page.
          </h2>
          <div className="st-makers">
            {makers.map((m) => (
              <div className="st-maker" key={m.name}>
                <div className="st-maker-n">{m.items.length}</div>
                <div>
                  <div className="st-maker-who">{m.name}</div>
                  {m.line && <p>{m.line}</p>}
                  <div className="st-maker-l">
                    {m.items.map((i) => (
                      <Link key={i.slug} to={`/journal/${i.note}`}>
                        {i.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="hm-walk st-walk">
          <Link to="/walk" className="hm-walk-in">
            <span className="hm-walk-ph" style={{ backgroundImage: `url("/photos/Hallgrimskirkja.jpeg")` }} />
            <span className="hm-walk-tx">
              <span className="d-label" style={{ color: 'var(--glacier)' }}>
                kyrrð walks · no. 1 · free
              </span>
              <span className="hm-walk-h">See {onWalk} of them in one line, on foot.</span>
              <span className="hm-walk-p">
                The Long Walk passes {onWalk} of the works on this page in the order you meet them: 30 stops, 5.5 km,
                3 to 4 hours, with the distances measured on foot.
              </span>
              <span className="hm-walk-cta">Walk it →</span>
            </span>
          </Link>
        </div>

        <section className="st-faq">
          <h2>Before you go</h2>
          {faq.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  );
}
