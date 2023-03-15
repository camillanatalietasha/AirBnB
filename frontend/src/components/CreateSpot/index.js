import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { thunkCreateSpot } from "../../store/spots";

function CreateSpot () {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  if(!user) history.push('/');

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");

  const [validationErrors, setValidationErrors] = useState();
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
    setValidationErrors()
    // TODO create spot form validation
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

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitted(true);

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
  // dispatch for new spot id
    const newSpotId = await dispatch(thunkCreateSpot(submitObj));
  // reset fields?
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

    history.push(`/spots/${newSpotId}`)
  }

  return (
    <div>
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
          Country
          <input
            name="country"
            type="text"
            placeholder="..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Street Address
          <input
            name="address"
            type="text"
            placeholder="..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            name="city"
            type="text"
            placeholder="..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            name="state"
            type="text"
            placeholder="..."
            value={state}
            onChange={(e) => setState(e.target.value)}
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
        <input
          name="previewImage"
          type="text"
          placeholder="preview image url"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
        <input
          name="imageOne"
          type="text"
          placeholder="image url"
          value={imageOne}
          onChange={(e) => setImageOne(e.target.value)}
        />
        <input
          name="imageTwo"
          type="text"
          placeholder="image url"
          value={imageTwo}
          onChange={(e) => setImageTwo(e.target.value)}
        />
        <input
          name="imageThree"
          type="text"
          placeholder="image url"
          value={imageThree}
          onChange={(e) => setImageThree(e.target.value)}
        />
        <input
          name="imageFour"
          type="text"
          placeholder="image url"
          value={imageFour}
          onChange={(e) => setImageFour(e.target.value)}
        />
        <button type="submit" className="standard-button" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
};

export default CreateSpot;