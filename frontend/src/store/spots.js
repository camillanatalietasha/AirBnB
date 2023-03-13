import { csrfFetch } from "./csrf";
import thunk from "redux-thunk";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const ONE_SPOT = 'spots/ONE_SPOT';

// action creators
const loadAllSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  };
};

const loadOneSpot = (spot) => {
  return {
    type: ONE_SPOT,
    spot
  };
};

export const thunkGetSpots = () => async dispatch => {
  const res = await csrfFetch('api/spots');
  const spots = await res.json();
  dispatch(loadAllSpots(spots));
};



const initialState = {
  allSpots: {},
  oneSpot: {},
};

const spotsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch(action.type){
    case LOAD_SPOTS:
      action.spots.Spots.map(spot => {
        newState.allSpots[spot.id] = {...spot}
      });
      newState = {... newState, allSpots: {...newState.allSpots}}
      return newState;
    default:
        return state;
  }
};


export default spotsReducer;