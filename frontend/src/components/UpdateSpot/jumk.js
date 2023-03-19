useEffect(() => {
  async function inputsFiller() {
    const spot = await dispatch(getSingleSpot(spotId));
    if (Number(spot.ownerId) !== Number(user.id)) {
      return history.push("/");
    }
    const spotFiller = {
      ...spotObject,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: Number(spot.price),
    };
    let index = 1;
    spot.SpotImages.map((img) => {
      if (img.preview === true) {
        spotFiller.previewImage = img.url;
      } else {
        spotFiller[`image${index}`] = img.url;
        index++;
      }
    });
    setSpotObject(spotFiller);
  }

  inputsFiller();
}, [dispatch]);
