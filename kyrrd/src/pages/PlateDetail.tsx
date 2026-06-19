import { Link, useParams } from 'react-router-dom';
import { findPlate } from '../plates';
import { Photo } from '../components/Photo';
import { useSeo } from '../seo';

export default function PlateDetail() {
  const { id } = useParams();
  const plate = findPlate(id);
  useSeo(`${plate.title} — kyrrð`, plate.description);
  return (
    <div className="wrap section">
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <Photo
          gradient={plate.gradient}
          image={plate.image}
          alt={plate.title}
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

          <div className="edition">
            <div>
              <div className="nm">A signed card</div>
              <div className="ds">Add your words and keep it, or send it to anyone, anywhere.</div>
            </div>
          </div>

          <Link
            to={`/inscribe/${plate.slug ?? plate.id}`}
            className="btn btn-primary"
            style={{ marginTop: 22, width: '100%' }}
          >
            Sign &amp; send
          </Link>
        </div>
      </div>
    </div>
  );
}
