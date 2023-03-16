import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = 'reviews/SPOT_REVIEWS';
const USER_REVIEWS = 'reviews/USER_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// actions
const spotReviews = reviews => {
  return {
    type: SPOT_REVIEWS,
    reviews
  }
};
const userReviews = reviews => {
  return {
    type: USER_REVIEWS,
    reviews
  }
};
// const addReview = reviewObj => {
//   return {
//     type: ADD_REVIEW,
//     reviewObj
//   }
// };
// const updateReview = reviewId => {
//   return {
//     type: UPDATE_REVIEW,
//     reviews
//   }
// };
// const deleteReview = reviewId => {
//   return {
//     type: DELETE_REVIEW,
//     reviews
//   }
// };

// thunks 

export const thunkGetSpotReviews = spotId => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await res.json();

  dispatch(spotReviews(reviews));
};

export const thunkGetUserReviews = () => async dispatch => {
  const res = await csrfFetch(`/api/reviews/current`);
  const reviews = await res.json();
  

  dispatch(userReviews(reviews))
}

const initialState = { spot: {}, user: {} }

const reviewsReducer = (state = initialState, action) => {
  let newState = {...state};

  switch(action.type) {
    case SPOT_REVIEWS:
        const spotReviews = {}
        action.reviews.Reviews.map(rev=>{
            spotReviews[rev.id] = rev
        })
        return {...newState, spot: {...spotReviews}}
    case USER_REVIEWS:
        const userReviews = {}
        action.reviews.Reviews.map(rev=>{
            userReviews[rev.id] = rev
        })
        return {...newState, user: {...userReviews}}
    default:
        return state;
  };
}

export default reviewsReducer;