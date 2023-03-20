import './SpotCard.css';
import { Link } from 'react-router-dom';
import Tooltip from '../../Utilities/Tooltip/Tooltip';


function SpotCard({ spot }) {

  return (
    <div className="spot-card">
      <Link className="link" key={spot.id} to={`/spots/${spot.id}`}>
        <div>
          <Tooltip content={spot.name}>
            <img src={spot.previewImage} alt={spot.name} className="prev-img" />
          </Tooltip>
        </div>
        <div className="spot-preview-info">
          <p className="city-state">{spot.city}, {spot.state}</p>
          <div className="spot-card-ratings">
             {spot.avgRating !== null ? <p className="fa fa-star">{spot.avgRating}</p> : <p id="new">New!</p>}
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


