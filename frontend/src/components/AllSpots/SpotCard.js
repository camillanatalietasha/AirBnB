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
          <p className="city-state">{spot.city}, {spot.state}</p>
          <div className="spot-card-ratings">
             {spot.avgRating !== null ? <p className="fa fa-star">{spot.avgRating}</p> : <p>'No reviews yet'</p>}
          </div>
          <div className="per-night">
            ${spot.price} night
            </div>
        </div>
      </Link>
    </div>
  );
}

export default SpotCard;