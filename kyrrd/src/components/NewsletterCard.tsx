import { useState, type FormEvent } from 'react';
import { track } from '@vercel/analytics';

// Emails land in a Google Sheet via an Apps Script web app (doPost appends a
// row: timestamp, email, source). Posted as form-urlencoded in no-cors mode so
// there is no CORS preflight and no opaque-response handling; the write is
// fire-and-forget and we thank the reader optimistically. The /exec URL is not
// a secret — it is called from the public site by design.
const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbw0DQU-tneWMdzKi4eLuf-XVhoO4X464N0xUCiFoDsGLRTA03BEDZFr-GwZNhYrtJZa/exec';

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
      await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams({ email, source: 'journal' }).toString(),
      });
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
