import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetSpotReviews, thunkGetUserReviews } from '../../store/reviews';
import OpenModalButton from "../OpenModalButton"
import NewReviewModal from '../NewReviewModal';
import getDateFormat from '../../Utilities/GetDateFormat';
import './Reviews.css'
import { thunkDeleteReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';

function Reviews({ spotId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots.singleSpot);
  const spotReviews = useSelector(state => state.reviews.spot);
  const reviews = Object.values(spotReviews);
  const history = useHistory();
  
  useEffect(() => {
    dispatch(thunkGetUserReviews());
    dispatch(thunkGetSpotReviews(spot.id));
  }, [dispatch, spot.id])

  const deleteReview = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteReview(e.target.name));
    history.push(`/spots/${spot.id}`)
  }

  return (
    <>
      <div className="review-summary">
        {spot.avgStarRating !== null ? (
          <i id="total-review" className="fa fa-star">
            {spot.avgStarRating}
          </i>
        ) : (
          <i id="no-reviews" className="fa fa-star">
            New!
          </i>
        )}

        <span id="dot">&#183;</span>

        {spot.numReviews === 1 ? (
          <i className="review-counter">{spot.numReviews} review</i>
        ) : (
          <i className="review-counter">{spot.numReviews} reviews</i>
        )}
      </div>

      {user &&
      user.id !== spot.ownerId &&
      !reviews.find((r) => r.userId === user.id) ? (
        <OpenModalButton
          modalComponent={<NewReviewModal spot={spot} />}
          nameClass="new-review-button"
          buttonText={"Post Your Review"}
          class="review-modal-button"
        />
      ) : (
        <></>
      )}
      <div className="reviews-div">
        {/* add post review button here */}
        {spotReviews &&
          reviews.map((r) => (
            <div key={r.id} className="one-review">
              <h3>{r?.User?.firstName}</h3>
              <p className="review-date">{getDateFormat(r.createdAt)}</p>
              <p className="review-text">{r.review}</p>
              {/* add delete review for logged in user */}
              {/* add edit review for logged in user */}
              {user && user.id === r.userId?(
                <div className='edit-delete-review'>
                  <button name={r.id} className='standard-button' onClick={deleteReview}>Delete</button>
                  </div>
                  ):(<></>)}
              <hr id="line-rev"></hr>
            </div>
          ))}
        {user && user.id !== spot.ownerId && !reviews.length ? (
          <h3>Be the first to post a review!</h3>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Reviews;