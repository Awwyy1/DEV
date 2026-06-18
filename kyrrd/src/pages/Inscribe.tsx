import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findPlate, PRICE } from '../plates';
import { Photo } from '../components/Photo';
import { useOrder } from '../order';

const PRESETS = ['Title', 'Dedication', 'Field Plate', 'Margin Note'] as const;
const ALIGNS = ['Center', 'Left', 'Right'] as const;
type Preset = (typeof PRESETS)[number];
type Align = (typeof ALIGNS)[number];

const PRESET_CLASS: Record<Preset, string> = {
  Title: 'title',
  Dedication: 'dedication',
  'Field Plate': 'field',
  'Margin Note': 'note',
};

export default function Inscribe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setOrder } = useOrder();
  const plate = findPlate(id);

  const [text, setText] = useState('for Anna');
  const [preset, setPreset] = useState<Preset>('Dedication');
  const [align, setAlign] = useState<Align>('Center');
  const [customImage, setCustomImage] = useState<string | undefined>();

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCustomImage(reader.result as string); // data URL — survives navigation + canvas
    reader.readAsDataURL(file);
  };

  const image = customImage ?? plate.image;
  const alignClass =
    preset === 'Title' ? (align === 'Left' ? 'al-left' : align === 'Right' ? 'al-right' : '') : '';

  const rendered = (() => {
    switch (preset) {
      case 'Title':
        return text;
      case 'Dedication':
        return `— ${text} —`;
      case 'Field Plate':
        return `${plate.coords ? plate.coords + ' · ' : ''}${plate.date}`.toUpperCase();
      case 'Margin Note':
        return text;
    }
  })();

  const toCheckout = () => {
    setOrder({
      plateId: plate.id,
      title: plate.title,
      place: plate.place,
      coords: plate.coords,
      date: plate.date,
      gradient: plate.gradient,
      image,
      inscription: text,
      preset,
      align,
    });
    navigate('/checkout');
  };

  return (
    <div className="wrap section">
      <div className="editor">
        <div className="stage">
          <div className="frame">
            <Photo gradient={plate.gradient} image={image}>
              <div className={`insc ${PRESET_CLASS[preset]} ${alignClass}`}>{rendered}</div>
            </Photo>
          </div>
        </div>
        <div className="panel">
          <div className="d-label">Photo</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <label className="chip-sel" style={{ cursor: 'pointer' }}>
              Upload your own
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onPick} />
            </label>
            {customImage && (
              <button className="chip-sel" onClick={() => setCustomImage(undefined)}>
                Reset
              </button>
            )}
          </div>

          <div className="d-label" style={{ margin: '20px 0 8px' }}>
            Your words
          </div>
          <input className="field" value={text} onChange={(e) => setText(e.target.value)} />

          <div className="d-label" style={{ margin: '18px 0 8px' }}>
            Style
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PRESETS.map((p) => (
              <button key={p} className={`chip-sel ${preset === p ? 'on' : ''}`} onClick={() => setPreset(p)}>
                {p}
              </button>
            ))}
          </div>

          <div className="d-label" style={{ margin: '18px 0 8px' }}>
            Alignment
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {ALIGNS.map((a) => (
              <button key={a} className={`chip-sel ${align === a ? 'on' : ''}`} onClick={() => setAlign(a)}>
                {a}
              </button>
            ))}
          </div>

          <div className="edition" style={{ marginTop: 22 }}>
            <div>
              <div className="nm">Signed digital card</div>
              <div className="ds">Instant download · send to anyone</div>
            </div>
            <div className="pr">{PRICE}</div>
          </div>

          <button className="btn btn-primary" style={{ marginTop: 16, width: '100%' }} onClick={toCheckout}>
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  );
}
