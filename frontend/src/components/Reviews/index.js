// TODO 
// create reviews reducers add get all reviews for spot
// add modal for post review
// add edit review modal

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetSpotReviews, thunkGetUserReviews } from '../../store/reviews';
import ReviewDetails from './ReviewDetails';

function Reviews({ spotId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots.singleSpot);
  const spotReviews = useSelector(state => state.reviews.spot);
  const reviews = Object.values(spotReviews);
  
  useEffect(() => {
    dispatch(thunkGetSpotReviews(spot.id));
    dispatch(thunkGetUserReviews());
  }, [dispatch])

  return (
    <>
    <div className='rating-div'>
      <ReviewDetails spot={spot} />
    </div>
    <div className='reviews-div'>
      {/* add post review button here */}
        {spotReviews && reviews.map(r => (
          <div key="r.id" className='one-review'>
            <h3>{r?.User?.firstName}</h3>
            <p className='review-date'>{r.createdAt}</p>
            <p className='review-text'>
              {r.review}
            </p>
            {/* add delete review for logged in user */}
            {/* add edit review for logged in user */}
          </div>
        ))}
        {user && user.id !== spot.ownerId && !reviews.length ? (<h3>Be the first to post a review!</h3>) : (<></>)}
    </div>
  </>
  );
}

export default Reviews;