
function ReviewDetails ({ spot }) {
  const { numReviews } = spot;
  
    return (
      <div className="review-rating">
        <i className="fa-sharp fa-solid fa-star marg-right-5px"></i>
        {numReviews > 0 ? (
          <p>
            {spot?.avgStarRating} · {spot?.numReviews}{" "}
            {numReviews > 1 ? "Reviews" : "Review"}
          </p>
        ) : (<></>)}
      </div>
    );
};

export default ReviewDetails;