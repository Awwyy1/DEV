import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PLATES, findPlate } from '../plates';
import { findPartner } from '../partners';
import CardEditor from '../components/CardEditor';
import { useSeo } from '../seo';

export default function Create() {
  const { id } = useParams();
  const plate = findPlate(id);
  useSeo(`Sign ${plate.title} — kyrrð`, 'Add your words and save your signed photo-card.');

  const key = plate.slug ?? plate.id;
  const photo = { url: plate.image ?? '', location: plate.title };
  const [params] = useSearchParams();
  const hotel = findPartner(params.get('partner'));
  const suggestions = PLATES.filter((p) => p.image && (p.slug ?? p.id) !== key)
    .slice(0, 4)
    .map((p) => ({ slug: p.slug ?? p.id, url: p.image as string, title: p.title }));

  return (
    <div className="wrap section">
      {hotel && (
        <div className="create-cobrand">
          <b>{hotel.name}</b> <span className="sep">×</span>{' '}
          <span className="km">
            kyrr<span className="eth">ð</span>
          </span>{' '}
          · a guest gift
        </div>
      )}
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/archive">Archive</Link>
        <span className="sep" aria-hidden="true">
          ▸
        </span>
        <Link to={`/plate/${key}`} className="crumb-name">
          {plate.title}
        </Link>
        <span className="sep" aria-hidden="true">
          ▸
        </span>
        <span className="here">Make your card</span>
      </nav>

      <div className="d-label" style={{ marginTop: 16 }}>
        Sign &amp; send
      </div>
      <h1 className="d-h2 cards-title" style={{ marginTop: 4 }}>
        Make your card
      </h1>

      <CardEditor photos={[photo]} suggestions={suggestions} partnerName={hotel?.name} />
    </div>
  );
}
