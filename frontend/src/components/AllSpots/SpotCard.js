import './SpotCard.css';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'

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
      <div className='update-delete-card'>
        {/* TODO build out edit spots page */}
        <button className='standard-button' onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
      </div>
    </div>
  )
}

export default SpotCard;