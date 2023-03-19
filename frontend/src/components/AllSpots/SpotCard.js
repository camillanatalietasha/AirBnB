import './SpotCard.css';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import DeleteSpotModal from '../DeleteSpotModal';
import OpenModalButton from '../OpenModalButton'


function SpotCard({ spot }) {
  const history = useHistory();

  return (
    <div className='spot-card'>
      <Link key={spot.id} to={`/spots/${spot.id}`}>
        <img className='spot-card-img' src={spot.previewImage} alt={spot.name} />
        <div className='spot-preview-info'>
          <h3>{spot.name}</h3>
          <h3>{spot.price} per night</h3>
          <span className='spot-card-ratings'>{spot.avgRating}</span>
        </div>
      </Link>
    </div>
  )
}

export default SpotCard;