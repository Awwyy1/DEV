import { useState, type FormEvent } from 'react';
import { track } from '@vercel/analytics';

// Emails land in a Google Sheet via an Apps Script web app. We hit it with a
// GET and the email in the query string (?email=...&source=...): no CORS
// preflight, no request body, and Apps Script populates e.parameter reliably —
// the sturdiest path. no-cors makes the response opaque, so the write is
// fire-and-forget and the reader is thanked optimistically. The /exec URL is
// not a secret — it is called from the public site by design.
const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxNGwWhL2anK0kc2uP_lkc4opgeIs-FO3ztEqEVxgr19ag63_iLRHlhlIZrMS3Bv_gc/exec';

/** Email capture for the journal sidebar. Self-contained. */
export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'err'>('idle');

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return;
    setState('busy');
    track('newsletter_signup');
    try {
      const q = new URLSearchParams({ email, source: 'journal' }).toString();
      await fetch(`${SHEET_ENDPOINT}?${q}`, { method: 'GET', mode: 'no-cors' });
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
        New in the archive <span className="dot">·</span>
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
