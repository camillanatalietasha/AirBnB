import { useState, useEffect} from 'react';
import "./NewReviewModal.css"

const StarRating = ({ stars, onChange }) => {
  const [chosenStars, setChosenStars] = useState(stars);

  useEffect(() => {
    setChosenStars(stars)
  }, [stars]);

  return (
    <div className="stars-div">
      <p>Stars</p>
      <span
        id={1}
        className="star"
        onMouseEnter={() => setChosenStars(1)}
        onMouseLeave={() => setChosenStars(stars)}
        onClick={() => onChange(1)}
      >
        <i className={chosenStars >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
      </span>
      <span
        id={2}
        className="star"
        onMouseEnter={() => setChosenStars(2)}
        onMouseLeave={() => setChosenStars(stars)}
        onClick={() => onChange(2)}
      >
        <i className={chosenStars >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
      </span>
      <span
        id={3}
        className="star"
        onMouseEnter={() => setChosenStars(3)}
        onMouseLeave={() => setChosenStars(stars)}
        onClick={() => onChange(3)}
      >
        <i className={chosenStars >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
      </span>
      <span
        id={4}
        className="star"
        onMouseEnter={() => setChosenStars(4)}
        onMouseLeave={() => setChosenStars(stars)}
        onClick={() => onChange(4)}
      >
        <i className={chosenStars >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
      </span>
      <span
        id={5}
        className="star"
        onMouseEnter={() => setChosenStars(5)}
        onMouseLeave={() => setChosenStars(stars)}
        onClick={() => onChange(5)}
      >
        <i className={chosenStars >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
      </span>
    </div>
  );
};

export default StarRating;