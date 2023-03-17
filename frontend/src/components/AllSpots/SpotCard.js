import './SpotCard.css';
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
        </div>
      </Link>
        <p className='spot-card-ratings'>{spot.avgRating}</p>
      <div className='update-delete-card-div'>
        {/* TODO build out edit spots page */}
        <button className='standard-button' onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
        <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpotModal spotId={spot.id} />} />
      </div>
    </div>
  )
}

export default SpotCard;