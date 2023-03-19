import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUserSpots } from "../../store/spots";
import SpotCard from "../AllSpots/SpotCard";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";


function CurrentUserSpots () {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector(state => state.spots.currentUserSpots);

  useEffect(() => {
    dispatch(thunkUserSpots());
  }, [dispatch]);

  return (
    <div className="user-dash-page-content">
      <h2 id="manage-spots-title">Manage Spots</h2>
      <div className="all-spots-div">
        {spots &&
          Object.values(spots).map((spot) => (
            <div key={`0${spot.id}`}>
              <SpotCard key={`1${spot.id}`} spot={spot} />
              <div key={`2${spot.id}`} className="update-delete-card-div">
                <button
                  className="standard-button"
                  onClick={() => history.push(`/spots/${spot.id}/edit`)}
                  key={`3${spot.id}`}
                >
                  Update
                </button>
                {/* <OpenModalButton
                  key={`3${spot.id}`}
                  buttonText="Update"
                  modalComponent={<UpdateSpotModal spot={spot} />}
                /> */}
                <OpenModalButton
                  key={`4${spot.id}`}
                  buttonText="Delete"
                  modalComponent={<DeleteSpotModal spotId={spot.id} />}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CurrentUserSpots;