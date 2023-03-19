import './SpotCard.css';
import { Link } from 'react-router-dom';


function SpotCard({ spot }) {

  return (
    <div className="spot-card">
      <Link key={spot.id} to={`/spots/${spot.id}`}>
        <div className="spot-card-img">
          <img src={`${spot.previewImage}`} alt={spot.name} />
        </div>
        <div className="spot-preview-info">
          <h3>{spot.name}</h3>
          <h3>{spot.price} per night</h3>
          <span className="spot-card-ratings">{spot.avgRating}</span>
        </div>
      </Link>
    </div>
  );
}

export default SpotCard;