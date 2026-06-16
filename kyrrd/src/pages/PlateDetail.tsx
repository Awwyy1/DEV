import { Link, useParams } from 'react-router-dom';
import { EDITIONS, findPlate } from '../plates';
import { Photo } from '../components/Photo';

export default function PlateDetail() {
  const { id } = useParams();
  const plate = findPlate(id);
  return (
    <div className="wrap section">
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <Photo
          gradient={plate.gradient}
          image={plate.image}
          style={{ aspectRatio: '4/5', border: '1px solid var(--fog)' }}
        />
        <div>
          <div className="d-label">
            Plate {plate.no} · {plate.series}
          </div>
          <div className="d-h1" style={{ margin: '6px 0 4px' }}>
            {plate.title}
          </div>
          <div className="d-cap">
            {plate.place} · {plate.coords ? `${plate.coords} · ` : ''}
            {plate.date}
          </div>
          <p className="d-body" style={{ color: 'var(--steel-d)', margin: '14px 0 8px' }}>
            {plate.description}
          </p>

          {EDITIONS.map((e) => (
            <div className="edition" key={e.name}>
              <div>
                <div className="nm">
                  {e.name}
                  {e.mark && <span style={{ color: 'var(--glacier-ink)' }}>&nbsp;ð</span>}
                </div>
                <div className="ds">{e.desc}</div>
              </div>
              <div className="pr">{e.price}</div>
            </div>
          ))}

          <Link
            to={`/inscribe/${plate.id}`}
            className="btn btn-primary"
            style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
          >
            Inscribe this plate
          </Link>
        </div>
      </div>
    </div>
  );
}
