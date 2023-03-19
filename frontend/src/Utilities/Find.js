export const findObjInObj = (spotsObj, spotId) => {
  const spotsArray = Object.values(spotsObj)
  return spotsArray.find((el) => {
    return el.id = spotId;
  });
};

// export const findPreview = (imageArray) => {
//   return imageArray.find((img) => {
//     return imageArray.isPreview === true;
//   });
// };

export const nonPreviewImages = (imgObj) => {
  let array = Object.values(imgObj);
  let imageArray = []
  array.map((img) => {
    if(img.isPreview !== true) {
      imageArray.push(img)
    } 
  })
  return imageArray;
}