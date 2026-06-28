import { useState, type FormEvent } from 'react';
import { track } from '@vercel/analytics';

// To collect for real: make a free form at https://formspree.io and paste its
// id here (e.g. 'xanbqkpz'). Until then the card still works and thanks the
// reader; nothing is stored.
const FORMSPREE_ID = '';

/** A quiet email capture for the journal sidebar. Self-contained. */
export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'err'>('idle');

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return;
    setState('busy');
    track('newsletter_signup');
    try {
      if (FORMSPREE_ID) {
        const r = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!r.ok) throw new Error('failed');
      }
      setState('done');
    } catch {
      setState('err');
    }
  }

  if (state === 'done') {
    return (
      <div className="aside-card nl">
        <div className="aside-h">
          On the list <span className="dot">·</span>
        </div>
        <p className="nl-done">Thank you. We will write only when a new plate lands in the archive.</p>
      </div>
    );
  }

  return (
    <div className="aside-card nl">
      <div className="aside-h">
        A quiet note <span className="dot">·</span>
      </div>
      <p className="nl-p">One short email when a new plate lands in the archive, and nothing else.</p>
      <form className="nl-row" onSubmit={submit}>
        <input
          className="nl-input"
          type="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary nl-btn" type="submit" disabled={state === 'busy'}>
          {state === 'busy' ? '…' : 'Join'}
        </button>
      </form>
      {state === 'err' && <p className="nl-err">Something went wrong. Please try again.</p>}
    </div>
  );
}
