import { useEffect, useRef, useState, type CSSProperties } from 'react';
import html2canvas from 'html2canvas';
import { PLATES } from '../plates';
import PostcardPreview, { StyleId, CardPhoto } from '../components/PostcardPreview';
import { useSeo } from '../seo';
import '../cards.css';

const STYLES: StyleId[] = ['editorial', 'polaroid', 'minimal', 'vintage'];

type FormatId = 'post' | 'story' | 'square';
const FORMATS: { id: FormatId; label: string; w: number; h: number }[] = [
  { id: 'post', label: 'Post 4:5', w: 1080, h: 1350 },
  { id: 'story', label: 'Story 9:16', w: 1080, h: 1920 },
  { id: 'square', label: 'Square 1:1', w: 1080, h: 1080 },
];

const PHOTOS: CardPhoto[] = PLATES.filter((p) => p.image).map((p) => ({
  url: p.image as string,
  location: p.title,
}));

export default function Cards() {
  useSeo('Card styles (preview) — kyrrð', 'A sandbox for trying new postcard designs.');

  const [styleId, setStyleId] = useState<StyleId>('editorial');
  const [format, setFormat] = useState<FormatId>('post');
  const [photoIdx, setPhotoIdx] = useState(0);
  const [message, setMessage] = useState('Wish you were here.');
  const [sender, setSender] = useState('Anna');
  const [imgData, setImgData] = useState('');
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const fmt = FORMATS.find((f) => f.id === format) ?? FORMATS[0];

  // Inline the chosen photo as a data URL so the PNG export always contains it.
  // html2canvas can silently drop <img> it has to fetch over the network.
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
      const canvas = await html2canvas(node, {
        width: fmt.w,
        height: fmt.h,
        scale: 1,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        // render at full size: drop the on-screen preview scale on the clone
        onclone: (doc) => {
          doc.querySelectorAll('.pc').forEach((el) => {
            (el as HTMLElement).style.transform = 'none';
          });
        },
      });
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `kyrrd-${styleId}-${format}.png`;
      a.click();
    } catch (err) {
      console.error('Card export failed', err);
    } finally {
      setBusy(false);
    }
  }

  const stageStyle = { '--pc-w': `${fmt.w}px`, '--pc-h': `${fmt.h}px` } as CSSProperties;

  return (
    <div className="wrap section">
      <h1 className="d-h2 cards-title">Postcard styles</h1>

      <div className="cards-editor">
        <div className="ce-chips cards-chips">
          <div className="ce-chipgroup">
            <div className="d-label">Format</div>
            <div className="cards-chips-row">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={'chip-sel' + (f.id === format ? ' on' : '')}
                  onClick={() => setFormat(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ce-chipgroup">
            <div className="d-label">Style</div>
            <div className="cards-chips-row">
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
        </div>

        <div className="ce-preview">
          <div className="pc-stage" style={stageStyle}>
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
