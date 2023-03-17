import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkOneSpot } from "../../store/spots";
import { thunkAddReview } from "../../store/reviews";

function NewReviewModal ({ spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.session.singleSpot);

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
      review: reviewText,
      stars: stars
    };
    await dispatch(thunkAddReview(submitObj, spot.id));
    await dispatch(thunkOneSpot(spot.id));

    closeModal();
  };

  const starsOnHover = e => {
    const chooseStars = {};

    for(let i = 0; i < 6; i++) {
      if (i <= e.target.id) {
        chooseStars[i] = 'fa-solid fa-star picked';
      } else {
        chooseStars[i] = 'fa-regular fa-star';
      }
    };
    let starCount = Object.values(chooseStars).length;
    setStars(starCount);
  };

  const starsOff = e => {
    const chooseStars = {};

    for(let i = 0; i < 6; i++) {
      if(i <= stars) {
        chooseStars[i] = 'fa-solid fa-star picked'
      } else {
        chooseStars[i] = 'fa-regular fa-star'
      }
    }
    let starCount = Object.values(chooseStars).length;
    setStars(starCount);
  };

  
}