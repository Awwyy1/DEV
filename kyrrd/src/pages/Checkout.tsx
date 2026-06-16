import { useSearchParams } from 'react-router-dom';
import { findPlate, LIMITED } from '../plates';
import { Photo } from '../components/Photo';

export default function Checkout() {
  const [params] = useSearchParams();
  const plate = findPlate(params.get('plate') ?? undefined);
  const insc = params.get('insc') ?? '';
  const preset = params.get('preset') ?? 'Dedication';

  return (
    <div className="wrap section">
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <div>
          <div className="d-h2">Your edition</div>
          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 16,
              border: '1px solid var(--fog)',
              padding: 14,
              borderRadius: 2,
            }}
          >
            <Photo
              gradient={plate.gradient}
              image={plate.image}
              sun={false}
              style={{ width: 84, aspectRatio: '4/5', flex: '0 0 auto' }}
            />
            <div>
              <div className="d-label">Plate {plate.no} · Limited /100</div>
              <div className="d-h2" style={{ fontSize: 20, marginTop: 3 }}>
                {plate.title}
              </div>
              <div className="d-cap">
                Inscription: “{insc}” · {preset}
              </div>
            </div>
            <div className="pr" style={{ marginLeft: 'auto', fontFamily: 'var(--disp)', fontWeight: 500 }}>
              {LIMITED.price}
            </div>
          </div>
        </div>
        <div>
          <div className="d-label">Delivery</div>
          <input className="field" placeholder="Email — for file & certificate" />
          <input className="field" placeholder="Shipping address" />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '16px 0',
              fontFamily: 'var(--disp)',
              fontWeight: 500,
              fontSize: 18,
            }}
          >
            <span>Total</span>
            <span>{LIMITED.price}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Pay with card
          </button>
          <p className="d-cap" style={{ textAlign: 'center', marginTop: 10 }}>
            Secured by Stripe · printed &amp; shipped via Gelato/Prodigi
          </p>
        </div>
      </div>
    </div>
  );
}
