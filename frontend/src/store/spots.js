import { csrfFetch } from "./csrf";


const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const SINGLE_SPOT = 'spots/SINGLE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const UPDATE_SPOT = '/spots/UDPATE_SPOT';
const CREATE_SPOT = '/spots/CREATE_SPOT';

// action 
const loadAllSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  };
};

const loadSingleSpot = (spot) => {
  return {
    type: SINGLE_SPOT,
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

const createSpot = spot => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

// thunks

export const thunkGetSpots = () => async dispatch => {
  const res = await csrfFetch('api/spots');
  const spots = await res.json();
  dispatch(loadAllSpots(spots));
};

export const thunkOneSpot = (spotId) => async dispatch => {
  const res = await fetch(`/api/spots/${spotId}`);
  const spot = await res.json();
  dispatch(loadSingleSpot(spot));
  return spot;
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
    body: JSON.stringify(newSpot)
  });

  const updatedSpotPage = await csrfFetch(`/api/spots/${spotId}`);
  const updatedSpot = await updatedSpotPage.json();  
  const { SpotImages } = updatedSpot;
  
  for (let img of SpotImages) {
    await csrfFetch(`/api/spot-images/${img.id}`, {method: "DELETE"})
  };

  await csrfFetch(`/api/spots/${spotId}/images`, {
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

export const thunkCreateSpot = (submitObj) => async dispatch => {
  const { newSpot, previewImage, images } = submitObj;
  // add new spot to database
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(newSpot)
  })
  const spot = await res.json();
  const spotId = spot.id;

  // add new preview image to database
  await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify({
      url: previewImage,
      isPreview: true
    })
  })

  // add other images
  if (images.imageOne) {
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.imageOne,
        isPreview: false
      })
    })
  };
  if (images.imageTwo) {
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.imageTwo,
        isPreview: false
      })
    })
  };
  if (images.imageThree) {
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.imageThree,
        isPreview: false
      })
    })
  };
  if (images.imageFour) {
    await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: images.imageFour,
        isPreview: false
      })
    })
  };

  // get new spot's id and return
  const newSpotRes = await csrfFetch(`/api/spots/${spotId}`);
  const completedSpot = newSpotRes.json();
  dispatch(createSpot(completedSpot));
  return completedSpot;
}

/* ============================================================================= */

const initialState = {
  allSpots: {},
  singleSpot: {},
  currentUserSpots: {},
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
    case SINGLE_SPOT:
        newState.singleSpot = action.spot
        newState = {...state, singleSpot: {...action.spot}}
        return newState;
    case CREATE_SPOT:
        newState = {...newState, allSpots: {...state.allSpots}}
        newState.allSpots[action.spot.id] = action.spot
        return newState;
    case UPDATE_SPOT:
        delete newState.allSpots[action.spot.id]
        newState = {...newState, allSpots: {...newState.allSpots}, singleSpot: {...newState.singleSpot}}
        newState.allSpots[action.spot.id] = {...action.spot}
        newState.singleSpot[action.spot.id] = {...action.spot,SpotImages: [...action.spot.SpotImages]}
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