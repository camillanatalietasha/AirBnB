import { thunkUpdateSpot, thunkOneSpot } from '../../store/spots';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { validateSpot } from '../../Utilities/SpotValidation';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { findObjInObj, nonPreviewImages } from '../../Utilities/Find';
import '../CreateSpot/CreateSpot.css';

function UpdateSpotForm () {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const routeParams = useParams();
  const spotId = Number(routeParams.spotId);
  // const spotId = useParams();
  const allUserSpots = useSelector((state) => state.spots.currentUserSpots)
  if(!user) history.push('/');
  // const spotsObj = Object.values(allUserSpots)[spotId - 1];
  // const spot = spotsObj.find(obj => obj.id === spotId)
  const spot = findObjInObj(allUserSpots, spotId);
  const imgObj = spot.SpotImages;
  const imgArray = nonPreviewImages(imgObj);


  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [description, setDescription] = useState(spot.description);
  const [previewImage, setPreviewImage] = useState(spot.previewImage);
  const [imageOne, setImageOne] = useState(imgArray[0] ? imgArray[0].imgUrl : "");
  const [imageTwo, setImageTwo] = useState(imgArray[1] ? imgArray[1].imgUrl : "");
  const [imageThree, setImageThree] = useState(imgArray[2] ? imgArray[2].imgUrl : "");
  const [imageFour, setImageFour] = useState(imgArray[3] ? imgArray[3].imgUrl : "");
  

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState();

  // useEffect to monitor inputs for errors
  useEffect(() => {
    const spot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      price,
      description,
      previewImage,
      imageOne,
      imageTwo,
      imageThree,
      imageFour,
    };
    setErrors(validateSpot(spot))
  }, [      
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      price,
      description,
      previewImage,
      imageOne,
      imageTwo,
      imageThree,
      imageFour,])

      console.log(errors)

  // submit changes
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitted(true);
    if(errors.hasErr === true) return null;


    const submitObj = {
      newSpot: {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price,
        description,
      },
      previewImage,
      images: {
        imageOne,
        imageTwo,
        imageThree,
        imageFour
      },
    };

    const spotUpdated = dispatch(thunkUpdateSpot(submitObj, spotId));


      dispatch(thunkOneSpot(spotId))
      history.push(`/spots/${spotId}`)

  };

  return (
    <div className="update-spot-container">
      <form id="update-spot-form">
        <h1>Update Spot</h1>
        <div>
          <h3>Where's your place located?</h3>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        <label>
          Country {(submitted === true && errors.country) ? <p className="errors">{errors.country}</p> : (<></>)}
          <input
            name="country"
            type="text"

            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Street Address {(submitted === true && errors.address) ? <p className="errors">{errors.address}</p> : (<></>)}
          <input
            name="address"
            type="text"

            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          City {(submitted === true && errors.city) ? <p className="errors">{errors.city}</p> : (<></>)}
          <input
            name="city"
            type="text"

            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State {(errors.state) ? <p className="errors">{errors.state}</p> : (<></>)}
          <input
            name="state"
            type="text"

            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Latitude
          <input
            name="lat"
            type="number"

            value={lat}
            onChange={(e) => setLat(e.target.value)}
             />
        </label>
        <label>
          Longitude
          <input
            name="lng"
            type="number"

            value={lng}
            onChange={(e) => setLng(e.target.value)}
             />
        </label>
        <label>
          <div>
            <h3>Describe your place to guests</h3>
            <p>
              Mention the best features of your space, any special amentities
              like fast wif or parking, and what you love about the
              neighborhood.
            </p>
            {(errors.description) ? <p className="errors">{errors.description}</p> : (<></>)}
          </div>
          <textarea
            name="description"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div>
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          {(errors.name) ? <p className="errors">{errors.name}</p> : (<></>)}
        </div>
        <input
          name="name"
          type="text"

          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          {(errors.price) ? <p className="errors">{errors.price}</p> : (<></>)}
        </div>
        <input
          name="price"
          type="text"

          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
        </div>
        {(errors.previewImage) ? <p className="errors">{errors.previewImage}</p> : (<></>)}
        <input
          name="previewImage"
          type="text"

          value={previewImage}
          required={true}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
        {(errors.imageOne) ? <p className="errors">{errors.imageOne}</p> : (<></>)}
        <input
          name="imageOne"
          type="text"

          value={imageOne}
          onChange={(e) => setImageOne(e.target.value)}
        />
        {(errors.imageTwo) ? <p className="errors">{errors.imageTwo}</p> : (<></>)}
        <input
          name="imageTwo"
          type="text"

          value={imageTwo}
          onChange={(e) => setImageTwo(e.target.value)}
        />
        {(errors.imageThree) ? <p className="errors">{errors.imageThree}</p> : (<></>)}
        <input
          name="imageThree"
          type="text"

          value={imageThree}
          onChange={(e) => setImageThree(e.target.value)}
        />
        {(errors.imageFour) ? <p className="errors">{errors.imageFour}</p> : (<></>)}
        <input
          name="imageFour"
          type="text"

          value={imageFour}
          onChange={(e) => setImageFour(e.target.value)}
        />
        <button type="submit" className="standard-button" onClick={handleSubmit}>Update</button>
      </form>
    </div>
  );
};
export default UpdateSpotForm;