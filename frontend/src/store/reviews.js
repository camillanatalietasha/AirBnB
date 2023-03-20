import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = 'reviews/SPOT_REVIEWS';
// const USER_REVIEWS = 'reviews/USER_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
// const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';


// actions
const spotReviews = reviews => {
  return {
    type: SPOT_REVIEWS,
    reviews
  }
};
// const userReviews = reviews => {
//   return {
//     type: USER_REVIEWS,
//     reviews
//   }
// };
const addReview = reviewObj => {
  return {
    type: ADD_REVIEW,
    reviewObj
  }
};
// const updateReview = reviewId => {
//   return {
//     type: UPDATE_REVIEW,
//     reviews
//   }
// };
const deleteReview = reviewId => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
};

// thunks 

export const thunkGetSpotReviews = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await res.json();

  dispatch(spotReviews(reviews));
};

export const thunkGetUserReviews = () => async dispatch => {
  const res = await csrfFetch(`/api/reviews/current`);
  const reviews = await res.json();
  
  return reviews;
};
export const thunkDeleteReview = (reviewId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  dispatch(deleteReview(reviewId));
};

export const thunkAddReview = (revObj, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(revObj),
    });

    const review = res.json();

    if (res.ok) {
      dispatch(addReview(review))
      const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
      const reviews = await res.json();
      dispatch(spotReviews(reviews));
    };
};




/*======================================================*/ 
const initialState = { spot: {}, user: {} }

const reviewsReducer = (state = initialState, action) => {
  let newState = {...state};

  switch(action.type) {
    case SPOT_REVIEWS:
        const spotReviews = {}
        action.reviews.Reviews.map(rev=>{
            return spotReviews[rev.id] = rev
        })
        return {...newState, spot: {...spotReviews}};
    case DELETE_REVIEW:
        delete newState.spot[action.reviewId];
        newState = {...newState, spot: {...newState.singleSpot[action.reviewId]}}
        return newState;
    default:
        return state;
  };
}

export default reviewsReducer;