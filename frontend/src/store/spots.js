import { csrfFetch } from "./csrf";
import thunk from "redux-thunk";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const ONE_SPOT = 'spots/ONE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const UPDATE_SPOT = '/spots/UDPATE_SPOT'

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

const updateSpot = spot => {
  return {
    type: UPDATE_SPOT,
    spot
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

export const thunkUpdateSpot = (updateObj, spotId) => async dispatch => {
  const { newSpot, previewImage, images } = updateObj;
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(updateObj)
  });

  const updateSpotPage = await csrfFetch(`/api/spots/${spotId}`);
  const updateSpot = await updateSpotPage.json();  
  const { SpotImages } = updateSpot;
  
  for (let img of SpotImages) {
    await csrfFetch(`/api/spot-images/${img.id}`, {method: "DELETE"})
  };

  const prevImg = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify({
      url: previewImage,
      preview: true,
    }),
  });

  if(images.imageOne) {
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.imageOne,
        preview: false
      })
    })
  }
  if(images.imageTwo) {
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.imageTwo,
        preview: false
      })
    })
  }
  if(images.imageThree) {
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.imageThree,
        preview: false
      })
    })
  }
  if(images.imageFour) {
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.imageFour,
        preview: false
      })
    })
  }

  const doneUpdatedSpotPage = await csrfFetch(`/api/spots/${spotId}`);
  const doneUpdatedSpot = await doneUpdatedSpotPage.json();
  dispatch(updateSpot(doneUpdatedSpot));
};

/* ============================================================================= */

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