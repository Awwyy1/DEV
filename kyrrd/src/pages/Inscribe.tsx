import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findPlate, LIMITED } from '../plates';
import { Photo } from '../components/Photo';

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
  const plate = findPlate(id);

  const [text, setText] = useState('for Anna');
  const [preset, setPreset] = useState<Preset>('Dedication');
  const [align, setAlign] = useState<Align>('Center');

  const alignClass = preset === 'Title' ? (align === 'Left' ? 'al-left' : align === 'Right' ? 'al-right' : '') : '';

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

  return (
    <div className="wrap section">
      <div className="editor">
        <div className="stage">
          <div className="frame">
            <Photo gradient={plate.gradient} image={plate.image}>
              <div className={`insc ${PRESET_CLASS[preset]} ${alignClass}`}>{rendered}</div>
            </Photo>
          </div>
        </div>
        <div className="panel">
          <div className="d-label">Inscription</div>
          <input className="field" value={text} onChange={(e) => setText(e.target.value)} />

          <div className="d-label" style={{ margin: '18px 0 8px' }}>
            Preset
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

          <div className="edition" style={{ marginTop: 20 }}>
            <div>
              <div className="nm">
                {LIMITED.name}
                <span style={{ color: 'var(--glacier-ink)' }}>&nbsp;ð</span>
              </div>
              <div className="ds">{LIMITED.desc}</div>
            </div>
            <div className="pr">{LIMITED.price}</div>
          </div>

          <button
            className="btn btn-primary"
            style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
            onClick={() =>
              navigate(
                `/checkout?plate=${plate.id}&insc=${encodeURIComponent(text)}&preset=${encodeURIComponent(preset)}`,
              )
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
