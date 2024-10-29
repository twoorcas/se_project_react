import { Modal } from "../Modal/Modal";
import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ onClose, selectedCard, openConfirmationModal, isOpen }) {
  const selectOpenConfirmation = () => {
    openConfirmationModal(selectedCard);
  };
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const { _id } = currentUser;
  const isOwn = selectedCard.owner === _id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOpen && isOwn
      ? "modal__delete-button_visible"
      : "modal__delete-button_hidden"
  }`;
  return (
    <Modal onClose={onClose} isOpen={isOpen} name="image">
      <img
        src={selectedCard.imageUrl}
        alt={selectedCard.name}
        className="modal__image"
      />
      <div className="modal__content_type_image_info">
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
        <button
          type="button"
          className={itemDeleteButtonClassName}
          onClick={selectOpenConfirmation}
        >
          Delete item
        </button>
      </div>
    </Modal>
  );
}
export default ItemModal;
