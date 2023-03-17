import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUserSpots, thunkDeleteSpot, thunkUpdateSpot } from "../../store/spots";
import SpotCard from "../AllSpots/SpotCard";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";

function CurrentUserSpots () {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user)
  const spots = useSelector(state => state.spots.currentUserSpots);

  useEffect(() => {
    dispatch(thunkUserSpots());
  }, [dispatch]);

  return (
    <div className="user-dash-page-content">
      <h2 id="manage-spots-title">Manage Spots</h2>
      <div className="all-spots-div">
        {spots && Object.values(spots).map(spot => (
          <>
          <SpotCard key={spot.id} spot={spot} />
        <div className='update-delete-card-div'>
        <button className='standard-button' onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
        <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpotModal spotId={spot.id} />} />
      </div>
          </>
        ))}
      </div>
    </div>
  )
};

export default CurrentUserSpots;