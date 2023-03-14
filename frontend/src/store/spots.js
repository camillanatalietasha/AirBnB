import { csrfFetch } from "./csrf";
import thunk from "redux-thunk";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const ONE_SPOT = 'spots/ONE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';

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

const deleteSpot = spotId => {
  return {
    type: DELETE_SPOT,
    spotId
  };
};

// thunks

export const thunkGetSpots = () => async dispatch => {
  const res = await csrfFetch('api/spots');
  const spots = await res.json();
  dispatch(loadAllSpots(spots));
};

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  dispatch(deleteSpot(spotId));
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
        return newState.allSpots[spot.id] = {...spot}
      });
      newState = {...newState, allSpots: {...newState.allSpots}}
      return newState;
    case DELETE_SPOT:
        delete newState.allSpots[action.spotId]
        newState = {...newState, allSpots: {...newState.allSpots}}
        return newState
    default:
        return state;
  }
};


export default spotsReducer;