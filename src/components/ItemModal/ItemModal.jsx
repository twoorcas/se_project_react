import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  activeModal,
  onClose,
  selectedCard,
  openConfirmationModal,
}) {
  const selectOpenConfirmation = () => {
    openConfirmationModal(selectedCard);
  };
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const { _id } = currentUser;
  const isOwn = selectedCard.owner === _id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    activeModal === "preview-card" && isOwn
      ? "modal__delete-button_visible"
      : "modal__delete-button_hidden"
  }`;
  return (
    <div
      className={`modal ${activeModal === "preview-card" && "modal_opened"}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close modal__close_content_type_image"
          onClick={onClose}
        />
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
      </div>
    </div>
  );
}
export default ItemModal;
