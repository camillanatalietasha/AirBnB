// will need to add ReserveSpot, SpotReviews, ImageGallery
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkOneSpot } from "../../store/spots";
import "./SpotDetails.css";
import ImageGallery from "./ImageGallery";
import Reviews from "../Reviews";
// TODO ReserveSpot Component

function SingleSpot() {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!Object.values(spot).length) return null;

  const spotImages = spot.SpotImages;

  return (
    <div className="spot-container">
      <div className="spot-detail-container">
        <div className="location-details">
          <h1 id="spot-title">{spot.name}</h1>
          <h2>
            {spot.city}, {spot.state}, {spot.country}
          </h2>
        </div>
        <ImageGallery spotImages={spotImages} />
        <div className="description-reserve-container">
          <div className="description">
            <h3 id="host-name">
              Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
            </h3>
            <p id="spot-description">{spot.description}</p>
          </div>
          <div id="price-reserve-bordered">
            <span id="top-row">
              <i id="price-line"><span id="price-big">${spot.price}</span> night</i>
              <div id="rating-star">
                {(spot.avgStarRating !== null) ? (<p className="fa fa-star">{spot.avgStarRating}</p>) 
                : (<p className="fa fa-star">New!</p>)}
              </div>
            </span>
            <button 
              id="reserve"
              onClick={() => window.alert("Feature Coming Soon...")}
            >Reserve</button>
          </div>
        </div>
        <hr id="line"></hr>
        <div id="reviews-container">
          <Reviews spot={spot} />
        </div>
      </div>
    </div>
  );
}

export default SingleSpot;
