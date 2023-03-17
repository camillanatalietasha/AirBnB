function ImageGallery ({ spotImages }) {
  return (
    <div className="images-div">
      {spotImages.map(i => (
        <div key={i.id} className={i.isPreview ? "main-img-tile" : "small-img-tile"}>
          <img key={i.id} className="gallery-img" src={i.imgUrl} alt="spot-details" />
        </div>
      ))}
    </div>
  )
};

export default ImageGallery;