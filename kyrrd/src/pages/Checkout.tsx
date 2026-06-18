import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { findPlate, PRICE } from '../plates';
import { Photo } from '../components/Photo';
import { useOrder, type Order } from '../order';

export default function Checkout() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { order, setOrder } = useOrder();

  const plate = findPlate(order?.plateId ?? params.get('plate') ?? undefined);
  const current: Order =
    order ?? {
      plateId: plate.id,
      title: plate.title,
      place: plate.place,
      coords: plate.coords,
      date: plate.date,
      gradient: plate.gradient,
      image: plate.image,
      inscription: params.get('insc') ?? '',
      preset: params.get('preset') ?? 'Dedication',
      align: 'Center',
    };

  const [recipient, setRecipient] = useState('');

  const pay = () => {
    setOrder({ ...current, recipient });
    navigate('/done');
  };

  return (
    <div className="wrap section">
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <div>
          <div className="d-h2">Your card</div>
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
              gradient={current.gradient}
              image={current.image}
              sun={false}
              style={{ width: 84, aspectRatio: '4/5', flex: '0 0 auto' }}
            />
            <div>
              <div className="d-label">Plate {plate.no} · Digital card</div>
              <div className="d-h2" style={{ fontSize: 20, marginTop: 3 }}>
                {current.title}
              </div>
              <div className="d-cap">
                Signed: “{current.inscription}” · {current.preset}
              </div>
            </div>
            <div className="pr" style={{ marginLeft: 'auto', fontFamily: 'var(--disp)', fontWeight: 500 }}>
              {PRICE}
            </div>
          </div>
        </div>
        <div>
          <div className="d-label">Send</div>
          <input className="field" placeholder="Your email — receipt &amp; download link" />
          <input
            className="field"
            placeholder="Recipient's email — optional, we'll send it for you"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
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
            <span>{PRICE}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={pay}>
            Pay {PRICE}
          </button>
          <p className="d-cap" style={{ textAlign: 'center', marginTop: 10 }}>
            Secured by Stripe · instant download
          </p>
        </div>
      </div>
    </div>
  );
}
