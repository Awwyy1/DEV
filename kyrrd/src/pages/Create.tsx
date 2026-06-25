import { Link, useParams } from 'react-router-dom';
import { findPlate } from '../plates';
import CardEditor from '../components/CardEditor';
import { useSeo } from '../seo';

export default function Create() {
  const { id } = useParams();
  const plate = findPlate(id);
  useSeo(`Sign ${plate.title} — kyrrð`, 'Add your words and save your signed photo-card.');

  const photo = { url: plate.image ?? '', location: plate.title };

  return (
    <div className="wrap section">
      <Link to={`/plate/${plate.slug ?? plate.id}`} className="create-back">
        ← {plate.title}
      </Link>
      <div className="d-label" style={{ marginTop: 14 }}>
        Sign &amp; send
      </div>
      <h1 className="d-h2 cards-title" style={{ marginTop: 4 }}>
        Make your card
      </h1>

      <CardEditor photos={[photo]} />
    </div>
  );
}
