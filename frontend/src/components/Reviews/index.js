// TODO 
// create reviews reducers add get all reviews for spot
// add modal for post review
// add edit review modal

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetSpotReviews, thunkGetUserReviews } from '../../store/reviews';
import ReviewDetails from './ReviewDetails';
import OpenModalButton from "../OpenModalButton"
import NewReviewModal from '../NewReviewModal';

function Reviews({ spotId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots.singleSpot);
  const spotReviews = useSelector(state => state.reviews.spot);
  const reviews = Object.values(spotReviews);
  
  useEffect(() => {
    dispatch(thunkGetUserReviews());
    dispatch(thunkGetSpotReviews(spot.id));
  }, [dispatch, spot.id])

  return (
    <>
    {user && user.id !== spot.ownerId && !reviews.find(r => r.userId === user.id) ? 
    (<OpenModalButton
      modalComponent={<NewReviewModal spot={spot} />}
      nameClass="new-review-button"
      buttonText={'Post Your Review'}
    />) : (<></>)}
    <div className='rating-div'>
      <ReviewDetails spot={spot}/>
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