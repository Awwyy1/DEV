import { useEffect, useRef, useState, type CSSProperties } from 'react';
import html2canvas from 'html2canvas';
import PostcardPreview, { StyleId, CardPhoto } from './PostcardPreview';
import '../cards.css';

const STYLES: { id: StyleId; label: string; locked?: boolean }[] = [
  { id: 'editorial', label: 'Editorial' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'polaroid', label: 'Polaroid', locked: true },
];

type FormatId = 'post' | 'story' | 'square';
const FORMATS: { id: FormatId; label: string; w: number; h: number }[] = [
  { id: 'post', label: 'Post 4:5', w: 1080, h: 1350 },
  { id: 'story', label: 'Story 9:16', w: 1080, h: 1920 },
  { id: 'square', label: 'Square 1:1', w: 1080, h: 1080 },
];

function LockIcon() {
  return (
    <svg
      className="chip-lock"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <rect x="4.5" y="11" width="15" height="9" rx="1.6" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

interface CardEditorProps {
  /** Photos the editor can use. Usually one (the chosen plate). */
  photos: CardPhoto[];
  /** Show the thumbnail photo picker. Off in production, handy for testing. */
  showPicker?: boolean;
}

export default function CardEditor({ photos, showPicker = false }: CardEditorProps) {
  const [styleId, setStyleId] = useState<StyleId>('editorial');
  const [format, setFormat] = useState<FormatId>('post');
  const [photoIdx, setPhotoIdx] = useState(0);
  const [message, setMessage] = useState('Wish you were here.');
  const [sender, setSender] = useState('Anna');
  const [imgData, setImgData] = useState('');
  const [busy, setBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const fmt = FORMATS.find((f) => f.id === format) ?? FORMATS[0];
  const current = photos[Math.min(photoIdx, photos.length - 1)];

  // Inline the chosen photo as a data URL so the PNG export always contains it.
  useEffect(() => {
    if (!current) return;
    let cancelled = false;
    setImgData('');
    fetch(current.url)
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
        if (!cancelled) setImgData(current.url);
      });
    return () => {
      cancelled = true;
    };
  }, [current?.url]);

  const photo: CardPhoto = {
    url: imgData || current?.url || '',
    location: current?.location || '',
  };

  async function download() {
    const node = cardRef.current;
    if (!node) return;
    setBusy(true);
    // Capture an off-screen, full-size, untransformed clone. Capturing the
    // on-screen (CSS-scaled) node makes html2canvas leave a stray edge stripe.
    const holder = document.createElement('div');
    holder.style.cssText = `position:fixed;left:-100000px;top:0;width:${fmt.w}px;height:${fmt.h}px;overflow:hidden;`;
    try {
      if (document.fonts) await document.fonts.ready;
      const clone = node.cloneNode(true) as HTMLElement;
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.setProperty('--pc-w', `${fmt.w}px`);
      clone.style.setProperty('--pc-h', `${fmt.h}px`);
      holder.appendChild(clone);
      document.body.appendChild(holder);

      const canvas = await html2canvas(clone, {
        width: fmt.w,
        height: fmt.h,
        scale: 1,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      if (!blob) throw new Error('export produced no image');

      const filename = `kyrrd-${styleId}-${format}.png`;
      const file = new File([blob], filename, { type: 'image/png' });

      // On phones the share sheet ("Save to Photos") is reliable in both
      // Safari and Chrome; <a download> is flaky on mobile.
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file] });
          return;
        } catch (e) {
          if ((e as Error).name === 'AbortError') return;
        }
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (err) {
      console.error('Card export failed', err);
    } finally {
      if (holder.parentNode) document.body.removeChild(holder);
      setBusy(false);
    }
  }

  const stageStyle = { '--pc-w': `${fmt.w}px`, '--pc-h': `${fmt.h}px` } as CSSProperties;
  const picker = showPicker && photos.length > 1;

  return (
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
                key={s.id}
                type="button"
                className={'chip-sel' + (s.id === styleId ? ' on' : '') + (s.locked ? ' locked' : '')}
                onClick={() => !s.locked && setStyleId(s.id)}
                disabled={s.locked}
              >
                {s.label}
                {s.locked && <LockIcon />}
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
        {picker && (
          <div className="cards-thumbs">
            {photos.map((p, i) => (
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
        )}

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
          {busy ? 'Rendering…' : 'Save card'}
        </button>
      </div>
    </div>
  );
}
