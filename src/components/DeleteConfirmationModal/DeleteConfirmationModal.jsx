import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ activeModal, onClose, handleCardDelete }) {
  return (
    <div
      className={`modal  ${
        activeModal === "delete-confirmation" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_type_delete-confirmation">
        <p className="modal__text">
          Are you sure you want to delete this item? <br></br>This action is
          irreversible.
        </p>

        <p
          className="modal__text modal__text_delete"
          onClick={handleCardDelete}
        >
          Yes, delete item
        </p>
        <p className="modal__text modal__text_cancel" onClick={onClose}>
          Cancel
        </p>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;
