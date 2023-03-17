import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUserSpots, thunkDeleteSpot, thunkUpdateSpot } from "../../store/spots";
import SpotCard from "../AllSpots/SpotCard";

function CurrentUserSpots () {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector(state => state.spots.CurrentUserSpots);

  useEffect(() => {
    dispatch(thunkUserSpots());
  }, [dispatch]);

  return (
    <div className="user-dash-page-content">
      <h2 id="manage-spots-title">Manage Spots</h2>
      <div className="all-spots-div">
        {spots && Object.values(spots).map(spot => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  )
};

export default CurrentUserSpots;