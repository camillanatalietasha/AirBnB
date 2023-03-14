import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot } from "../../store/spots";

function DeleteSpotModal({spotId}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(thunkDeleteSpot(spotId));
    closeModal();
  };

  return (
    <div className="delete-container">
      <h2 className="modal-title">Confirm Delete</h2>
      <p className="modal-text">Are you sure you want to delete this spot?</p>
      <button 
        className="standard-button" 
        id="delete"
        onClick={handleDelete}
      >
          Yes (Delete Spot)
      </button>
      <button 
        className="standard-button" 
        id="keep"
        onClick={closeModal}
      >
        No (Keep Spot)
      </button>
    </div>
  )
};

export default DeleteSpotModal;