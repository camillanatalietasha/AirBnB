import '../CreateSpot/CreateSpot.css';
import { useState, useEffect } from 'react';
import { validateSpot } from '../../Utilities/SpotValidation';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateSpot } from '../../store/spots';


function UpdateSpot () {
  const allSpots = useSelector((state) => state.spots.currentUserSpots);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const spotId = useParams();
  const spot = Object.values(allSpots)[spotId];
  console.log(` ======= ALLSPOT ${allSpots}`)
  if(!user) history.push('/');


  // start the form off with the spot's current data
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [description, setDescription] = useState(spot.description);
  const [previewImage, setPreviewImage] = useState(spot.SpotImages[0].imgUrl);
  const [imageOne, setImageOne] = useState(spot.SpotImages[1].imgUrl);
  const [imageTwo, setImageTwo] = useState(spot.SpotImages[2].imgUrl);
  const [imageThree, setImageThree] = useState(spot.SpotImages[3].imgUrl);
  const [imageFour, setImageFour] = useState(spot.SpotImages[4].imgUrl);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState();

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
      setErrors(validateSpot(spot));
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
      imageFour,
    ]);
   const handleSubmit = async (e) => {
     e.preventDefault();
     setSubmitted(true);
     if (errors.hasErr === true) return null;

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
         imageFour,
       },
     };
     
     const updateDone = await dispatch(thunkUpdateSpot(submitObj));
     // reset fields
     setAddress("");
     setCity("");
     setState("");
     setCountry("");
     setLat("");
     setLng("");
     setName("");
     setPrice("");
     setDescription("");
     setPreviewImage("");
     setImageOne("");
     setImageTwo("");
     setImageThree("");
     setImageFour("");
     // go to new spot page

      if(updateDone) {
        history.push(`/spots/${spot.id}`);
      }
   };

   return (
     <div className="create-spot-container">
      <form id="create-spot-form">
        <h1>Create a New Spot</h1>
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
            placeholder="..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Street Address {(submitted === true && errors.address) ? <p className="errors">{errors.address}</p> : (<></>)}
          <input
            name="address"
            type="text"
            placeholder="..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          City {(submitted && errors.city) ? <p className="errors">{errors.city}</p> : (<></>)}
          <input
            name="city"
            type="text"
            placeholder="..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State {(submitted && errors.state) ? <p className="errors">{errors.state}</p> : (<></>)}
          <input
            name="state"
            type="text"
            placeholder="..."
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Latitude
          <input
            name="lat"
            type="number"
            placeholder="..."
            value={lat}
            onChange={(e) => setLat(e.target.value)}
             />
        </label>
        <label>
          Longitude
          <input
            name="lng"
            type="number"
            placeholder="..."
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
            {(submitted === true && errors.description) ? <p className="errors">{errors.description}</p> : (<></>)}
          </div>
          <textarea
            name="description"
            rows="10"
            placeholder="..."
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
          {(submitted === true && errors.title) ? <p className="errors">{errors.title}</p> : (<></>)}
        </div>
        <input
          name="name"
          type="text"
          placeholder="..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          {(submitted === true && errors.price) ? <p className="errors">{errors.price}</p> : (<></>)}
        </div>
        <input
          name="price"
          type="text"
          placeholder="price per night (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
        </div>
        {(submitted === true && errors.previewImage) ? <p className="errors">{errors.previewImage}</p> : (<></>)}
        <input
          name="previewImage"
          type="text"
          placeholder="preview image url"
          value={previewImage}
          required={true}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
        {(submitted === true && errors.imageOne) ? <p className="errors">{errors.imageOne}</p> : (<></>)}
        <input
          name="imageOne"
          type="text"
          placeholder="image url"
          value={imageOne}
          onChange={(e) => setImageOne(e.target.value)}
        />
        {(submitted === true && errors.imageTwo) ? <p className="errors">{errors.imageTwo}</p> : (<></>)}
        <input
          name="imageTwo"
          type="text"
          placeholder="image url"
          value={imageTwo}
          onChange={(e) => setImageTwo(e.target.value)}
        />
        {(submitted === true && errors.imageThree) ? <p className="errors">{errors.imageThree}</p> : (<></>)}
        <input
          name="imageThree"
          type="text"
          placeholder="image url"
          value={imageThree}
          onChange={(e) => setImageThree(e.target.value)}
        />
        {(submitted === true && errors.imageFour) ? <p className="errors">{errors.imageFour}</p> : (<></>)}
        <input
          name="imageFour"
          type="text"
          placeholder="image url"
          value={imageFour}
          onChange={(e) => setImageFour(e.target.value)}
        />
        <button type="submit" className="standard-button" onClick={handleSubmit}>Update</button>
      </form>
    </div>
  );
};

export default UpdateSpot;