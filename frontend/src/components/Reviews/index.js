// TODO 
// add get all reviews for spot to spot reducer
// add modal for post review
// add edit review modal

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Reviews({ spotId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots.singleSpot);
  const spotReviews = useSelector(state => state.reviews.spot);
  
  useEffect(() => {
    
  })
}