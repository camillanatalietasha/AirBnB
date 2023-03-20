import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkOneSpot } from "../../store/spots";
import { thunkAddReview } from "../../store/reviews";
import { useState, useEffect } from 'react';
import StarRating from "./StarRating";
import './NewReviewModal.css'

function NewReviewModal () {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.singleSpot);

  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({ hasErr: false });
  const [disableButton, setDisableButton] = useState(true);
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (stars > 0 && reviewText.length >= 10) {
      setDisableButton(false)
    };
  }, [stars, reviewText])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(errors.hasErr === true) return null;
    setSubmitted(true);
    
    const submitObj = {
      spotId: spot.id,
      userId: user.id,
      review: reviewText,
      stars: stars
    };
    await dispatch(thunkAddReview(submitObj, spot.id));
    await dispatch(thunkOneSpot(spot.id));

    closeModal();
  };


  return (
    <div className="review-modal">
      <h3 className="review-header">How was your stay?</h3>
      <textarea 
        rows={10}
        cols={25}
        value={reviewText}
        onChange={(e => setReviewText(e.target.value))}
        placeholder="Share your thoughts here..." 
      />
      <div id="stars-pick">

      <StarRating stars={stars} onChange={setStars} value={stars} />
      </div>
      <button
        disabled={disableButton}
        onClick={handleSubmit}
        id="review-submit-button">
          Submit Your Review
        </button>
    </div>
  );
};

export default NewReviewModal;