import { Link } from 'react-router-dom';
import type { Plate } from '../plates';
import { Photo } from './Photo';

export default function PlateCard({ plate }: { plate: Plate }) {
  return (
    <Link to={`/plate/${plate.id}`} className="plate">
      <Photo gradient={plate.gradient} image={plate.image} />
      <div className="cap">
        <div className="pn">
          {plate.no} — {plate.series}
        </div>
        <div className="ttl">{plate.title}</div>
      </div>
    </Link>
  );
}
