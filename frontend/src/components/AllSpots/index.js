import SpotCard from "./SpotCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './AllSpots.css'
import { thunkGetSpots } from "../../store/spots"; 

function AllSpots () { 
  const spots = useSelector(state => state.spots.allSpots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetSpots())
  }, [dispatch]);

  return (
    <div id="all-spots-div">
      <section id="all-spots-section">
        {spots && Object.values(spots).map(spot => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </section>
    </div>
  )
}

export default AllSpots;