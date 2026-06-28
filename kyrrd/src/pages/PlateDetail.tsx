import { Link, useParams } from 'react-router-dom';
import { findPlate } from '../plates';
import { Photo } from '../components/Photo';
import MapLink from '../components/MapLink';
import { useSeo, useJsonLd } from '../seo';

const SITE = 'https://kyrrd.pics';

export default function PlateDetail() {
  const { id } = useParams();
  const plate = findPlate(id);
  useSeo(`${plate.title} — kyrrð`, plate.description, { image: plate.image });
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'kyrrð', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'The Archive', item: `${SITE}/archive` },
      { '@type': 'ListItem', position: 3, name: plate.title },
    ],
  });
  return (
    <div className="wrap section">
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <Photo
          gradient={plate.gradient}
          image={plate.image}
          alt={plate.title}
          style={{ aspectRatio: '4/5', border: 'var(--hair) solid var(--fog)' }}
        />
        <div>
          <div className="d-label">
            Plate {plate.no} · {plate.series}
            {plate.date && <span className="pd-date-m"> · {plate.date}</span>}
          </div>
          <div className="d-h1" style={{ margin: '6px 0 4px' }}>
            {plate.title}
          </div>
          <div className="d-cap pd-cap">
            <span>{plate.place}</span>
            {plate.coords && <span className="pd-coords"> · {plate.coords}</span>}
            <span className="pd-date-d"> · {plate.date}</span>
            <span className="pd-map-inline">
              {' · '}
              <MapLink plate={plate} />
            </span>
          </div>
          <div className="pd-map-block">
            <MapLink plate={plate} />
          </div>

          <p className="d-body" style={{ color: 'var(--steel-d)', margin: '16px 0 8px' }}>
            {plate.description}
          </p>

          <div className="edition">
            <div>
              <div className="nm">A signed card</div>
              <div className="ds">Add your words and keep it, or send it to anyone, anywhere.</div>
            </div>
          </div>

          <Link
            to={`/create/${plate.slug ?? plate.id}`}
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
