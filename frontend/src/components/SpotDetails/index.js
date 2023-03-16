// will need to add ReserveSpot, SpotReviews, ImageGallery
import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkOneSpot } from '../../store/spots'
import './SpotDetails.css'
import ImageGallery from "./ImageGallery";
// TODO ReserveSpot Component

function SingleSpot () { 
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkOneSpot(spotId))
  }, [dispatch, spotId]);

  if(!Object.values(spot).length) return null;

  const spotImages = spot.SpotImages;

  return (
    <div className="spot-container">
      <div className="spot-detail-container">
        <div className="location-details">
          <h1>{spot.name}</h1>
          <h2>{spot.city}, {spot.state}, {spot.country}</h2>
        </div>
          <ImageGallery spotImages={spotImages}/>
        <div className="description-reserve-container">
          <div className="description">
            <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
            <p>{spot.description}</p>
          </div>
          {/* TODO add reserve spot link here */}
          <button>Reserve Spot</button>
        </div>
        <div className="reviews-container">
          {/* TODO add reviews link here */}
          <p>REVIEWS WILL GO HERE</p>
        </div>
      </div>
    </div>
  )
};

export default SingleSpot;