import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { PLATES } from '../plates';
import PostcardPreview, { StyleId, CardPhoto } from '../components/PostcardPreview';
import { useSeo } from '../seo';
import '../cards.css';

const STYLES: StyleId[] = ['editorial', 'polaroid', 'minimal', 'vintage'];

const PHOTOS: CardPhoto[] = PLATES.filter((p) => p.image).map((p) => ({
  url: p.image as string,
  location: p.title,
}));

export default function Cards() {
  useSeo('Card styles (preview) — kyrrð', 'A sandbox for trying new postcard designs.');

  const [styleId, setStyleId] = useState<StyleId>('editorial');
  const [photoIdx, setPhotoIdx] = useState(0);
  const [message, setMessage] = useState('Wish you were here.');
  const [sender, setSender] = useState('Anna');
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  async function download() {
    const node = cardRef.current;
    if (!node) return;
    setBusy(true);
    try {
      if (document.fonts) await document.fonts.ready;
      const dataUrl = await toPng(node, {
        width: 1080,
        height: 1350,
        pixelRatio: 1,
        cacheBust: true,
        // capture the canvas at full size, ignoring the on-screen preview scale
        style: { transform: 'none', transformOrigin: 'top left', margin: '0' },
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `kyrrd-${styleId}.png`;
      a.click();
    } catch (err) {
      console.error('Card export failed', err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="wrap section">
      <div className="d-label">Preview / alternative</div>
      <h1 className="d-h2" style={{ marginTop: 4 }}>
        Postcard styles
      </h1>
      <p className="cards-note">
        A sandbox to try the new card designs. Nothing here is wired to the live archive, the
        current cards stay exactly as they are.
      </p>

      <div className="cards-layout">
        <div className="cards-controls">
          <div className="cards-group">
            <div className="d-label">Style</div>
            <div className="cards-styles">
              {STYLES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={'chip-sel' + (s === styleId ? ' on' : '')}
                  onClick={() => setStyleId(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="cards-group">
            <div className="d-label">Photo</div>
            <div className="cards-thumbs">
              {PHOTOS.map((p, i) => (
                <button
                  key={p.url}
                  type="button"
                  className={'cards-thumb' + (i === photoIdx ? ' on' : '')}
                  onClick={() => setPhotoIdx(i)}
                  aria-label={p.location}
                >
                  <img src={p.url} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="cards-group">
            <label className="d-label" htmlFor="pc-msg">
              Message
            </label>
            <textarea
              id="pc-msg"
              className="field"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="cards-group">
            <label className="d-label" htmlFor="pc-from">
              Signed by
            </label>
            <input
              id="pc-from"
              className="field"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
          </div>
        </div>

        <div className="cards-previewcol">
          <div className="pc-stage">
            <PostcardPreview
              ref={cardRef}
              photo={PHOTOS[photoIdx]}
              message={message}
              sender={sender}
              styleId={styleId}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary cards-dl"
            onClick={download}
            disabled={busy}
          >
            {busy ? 'Rendering…' : 'Download PNG'}
          </button>
        </div>
      </div>
    </div>
  );
}
