import { useEffect, useRef, useState } from 'react';
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
  const [imgData, setImgData] = useState('');
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Inline the chosen photo as a data URL so the PNG export always contains it.
  // html-to-image can silently drop <img> elements it has to fetch over the
  // network, so we hand it an already-embedded image instead.
  useEffect(() => {
    let cancelled = false;
    setImgData('');
    fetch(PHOTOS[photoIdx].url)
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result as string);
            fr.onerror = reject;
            fr.readAsDataURL(blob);
          }),
      )
      .then((data) => {
        if (!cancelled) setImgData(data);
      })
      .catch(() => {
        if (!cancelled) setImgData(PHOTOS[photoIdx].url);
      });
    return () => {
      cancelled = true;
    };
  }, [photoIdx]);

  const photo: CardPhoto = {
    url: imgData || PHOTOS[photoIdx].url,
    location: PHOTOS[photoIdx].location,
  };

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
      <h1 className="d-h2 cards-title">Postcard styles</h1>

      <div className="cards-editor">
        <div className="ce-chips cards-styles">
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

        <div className="ce-preview">
          <div className="pc-stage">
            <PostcardPreview
              ref={cardRef}
              photo={photo}
              message={message}
              sender={sender}
              styleId={styleId}
            />
          </div>
        </div>

        <div className="ce-rest">
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

          <div className="cards-field">
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

          <div className="cards-field">
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

          <button
            type="button"
            className="btn btn-primary cards-dl"
            onClick={download}
            disabled={busy || !imgData}
          >
            {busy ? 'Rendering…' : 'Download PNG'}
          </button>
        </div>
      </div>
    </div>
  );
}
