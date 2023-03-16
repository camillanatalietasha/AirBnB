const urlTest = url => {
  const allowed = ['png', 'jpg', 'jpeg'];
  let urlParts = url.split('');
  let passed = false;
  if (urlParts.length > 1 && allowed.includes(urlParts[urlParts.length - 1])) passed = false;
  
  return passed;
}

export const validateSpot = (spot) => {
  try{
    const errors = { hasErr: false }

    if(!spot.address.length) {
      errors.address = 'Address is required'
      errors.hasErr = true
    };
    if(!spot.country.length) {
      errors.country = 'Country is required'
      errors.hasErr = true
    };
    if(!spot.city.length) {
      errors.city = 'City is required'
      errors.hasErr = true
    };
    if(!spot.state.length) {
      errors.state = 'State is required'
      errors.hasErr = true
    };
    if(!spot.name.length) {
      errors.name = 'Name is required'
      errors.hasErr = true
    };
    if(!spot.description.length) {
      errors.description = 'Description is required'
      errors.hasErr = true
    };
    if(!spot.price.length) {
      errors.price = 'Price is required'
      errors.hasErr = true
    };
    if(spot.address.length >= 50) {
      errors.address = "Address must be less than 50 characters"
      errors.hasErr = true
    };
    if(spot.country.length >= 30) {
      errors.country = "Country must be less than 30 characters"
      errors.hasErr = true
    };
    if(spot.city.length >= 30) {
      errors.city = "City must be less than 30 characters"
      errors.hasErr = true
    };
    if(spot.state.length >= 30) {
      errors.state = "State must be less than 30 characters"
      errors.hasErr = true
    };
    if(spot.name.length >= 50) {
      errors.name = "Name must be less than 50 characters"
      errors.hasErr = true
    };
    if(spot.description.length >= 5000) {
      errors.name = "Name must be less than 5000 characters"
      errors.hasErr = true
    };
    if(isNaN(spot.price) || spot.price < 1) {
      errors.price = "Price must be a number greater than 1"
      errors.hasErr = true
    }
    if(spot.previewImage.length && !urlTest(spot.previewImage) === false) {
      errors.previewImage = 'Images must be in one of these formats: .png, .jpeg, .jpg'
      errors.hasErr = true
    }
    if(spot.imageOne.length && !urlTest(spot.imageOne) === false) {
      errors.imageOne = 'Images must be in one of these formats: .png, .jpeg, .jpg'
      errors.hasErr = true
    }
    if(spot.imageTwo.length && !urlTest(spot.imageTwo) === false) {
      errors.imageTwo = 'Images must be in one of these formats: .png, .jpeg, .jpg'
      errors.hasErr = true
    }
    if(spot.imageThree.length && !urlTest(spot.imageThree) === false) {
      errors.imageThree = 'Images must be in one of these formats: .png, .jpeg, .jpg'
      errors.hasErr = true
    }
    if(spot.imageFour.length && !urlTest(spot.imageFour) === false) {
      errors.imageFour = 'Images must be in one of these formats: .png, .jpeg, .jpg'
      errors.hasErr = true
    }
    return errors;
  }
  catch {
    console.log('no errrors caught')
  }
}