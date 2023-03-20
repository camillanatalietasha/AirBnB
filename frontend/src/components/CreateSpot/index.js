import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { thunkCreateSpot } from "../../store/spots";
import { validateSpot } from "../../Utilities/SpotValidation";
import './CreateSpot.css'

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
  // dispatch for new spot id
    const newSpotCreated = await dispatch(thunkCreateSpot(submitObj));
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

    if(newSpotCreated)history.push(`/spots/${newSpotCreated.id}`)
  };

  return (
    <div className="create-spot-container">
      <form id="create-spot-form">
        <h1 id="create-spot-title">Create a New Spot</h1>
        <div>
          <h3 className="form-section">Where's your place located?</h3>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </div>
        <label className="stretch">
          Country{" "}
          {submitted === true && errors.country ? (
            <p className="errors">{errors.country}</p>
          ) : (
            <></>
          )}
          <input
            name="country"
            type="text"
            placeholder="..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label className="stretch">
          Street Address{" "}
          {submitted === true && errors.address ? (
            <p className="errors">{errors.address}</p>
          ) : (
            <></>
          )}

          <input
            name="address"
            type="text"
            placeholder="..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <div className="double">
        <label>
          City{" "}
          {submitted === true && errors.city ? (
            <p className="errors">{errors.city}</p>
          ) : (
            <></>
          )}
          <input
            name="city"
            type="text"
            placeholder="..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State{" "}
          {submitted && errors.state ? (
            <p className="errors">{errors.state}</p>
          ) : (
            <></>
          )}
          <input
            name="state"
            type="text"
            placeholder="..."
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
          </div>
        <div className="double">
          
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
        </div>
        <label>
          <hr class="line"></hr>
          <div>
            <h3 className="form-section">Describe your place to guests</h3>
            <p className="stretch">
              Mention the best features of your space, any special amentities
              like fast wif or parking, and what you love about the
              neighborhood.
            </p>
            {submitted === true && errors.description ? (
              <p className="errors">{errors.description}</p>
            ) : (
              <></>
            )}
          </div>
          <textarea
            className="stretch"
            name="description"
            rows="10"
            placeholder="..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <hr class="line"></hr>
        <div className="stretch">
          <h3 className="form-section">Create a title for your spot</h3>
          <p className="stretch">
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          {submitted === true && errors.title ? (
            <p className="errors">{errors.title}</p>
          ) : (
            <></>
          )}
        </div>
        <input
          className="stretch"
          name="name"
          type="text"
          placeholder="..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <hr class="line"></hr>
        <div>
          <h3 className="form-section">Set a base price for your spot</h3>
          <p className="stretch">
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          {submitted === true && errors.price ? (
            <p className="errors">{errors.price}</p>
          ) : (
            <></>
          )}
        </div>
        <p id="dollar-sign">$</p>
        <input
          className="stretch"
          name="price"
          type="text"
          placeholder="price per night (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <hr class="line"></hr>
        <div className>
          <h3 className="form-section">Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
        </div>
        {submitted === true && errors.previewImage ? (
          <p className="errors">{errors.previewImage}</p>
        ) : (
          <></>
        )}
        <input
          className="stretch"
          name="previewImage"
          type="text"
          placeholder="preview image url"
          value={previewImage}
          required={true}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
        {submitted === true && errors.imageOne ? (
          <p className="errors">{errors.imageOne}</p>
        ) : (
          <></>
        )}
        <input
          className="stretch"
          name="imageOne"
          type="text"
          placeholder="image url"
          value={imageOne}
          onChange={(e) => setImageOne(e.target.value)}
        />
        {submitted === true && errors.imageTwo ? (
          <p className="errors">{errors.imageTwo}</p>
        ) : (
          <></>
        )}
        <input
          className="stretch"
          name="imageTwo"
          type="text"
          placeholder="image url"
          value={imageTwo}
          onChange={(e) => setImageTwo(e.target.value)}
        />
        {submitted === true && errors.imageThree ? (
          <p className="errors">{errors.imageThree}</p>
        ) : (
          <></>
        )}
        <input
          className="stretch"
          name="imageThree"
          type="text"
          placeholder="image url"
          value={imageThree}
          onChange={(e) => setImageThree(e.target.value)}
        />
        {submitted === true && errors.imageFour ? (
          <p className="errors">{errors.imageFour}</p>
        ) : (
          <></>
        )}
        <input
          className="stretch"
          name="imageFour"
          type="text"
          placeholder="image url"
          value={imageFour}
          onChange={(e) => setImageFour(e.target.value)}
        />
        <button
          type="submit"
          className="standard-button"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateSpot;