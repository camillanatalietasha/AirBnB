// will need to add ReserveSpot, SpotReviews, ImageGallery
import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteSpot, thunkOneSpot } from '../../store/spots'
import './SingleSpot.css'

function SingleSpot () { 
  const { spotId } = useParams();
  const history = useHistory();
  const spot = useSelector(state => state.spots.SingleSpot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkOneSpot(spotId))
  }, [dispatch, spotId]);

  if(!Object.values(spot).length) return null;

  const spotImages = spot.SpotImages;
  const prevImage = spot.SpotImages[0];
  const spotOwner = spot.Owner

  return (
    <>
      <div className="spot-detail-container">
        <div className=""></div>
      </div>
    </>
  )
}