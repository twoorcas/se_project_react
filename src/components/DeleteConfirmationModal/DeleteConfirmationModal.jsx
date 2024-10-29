import { Modal } from "../Modal/Modal";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  onClose,
  handleCardDelete,
  isLoading,
  isOpen,
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} name="delete-confirmation">
      <p className="modal__text">
        Are you sure you want to delete this item? <br></br>This action is
        irreversible.
      </p>
      <p className="modal__text modal__text_delete" onClick={handleCardDelete}>
        {`${isLoading ? "Deleting" : "Yes, delete"}`}
      </p>
      <p className="modal__text modal__text_cancel" onClick={onClose}>
        Cancel
      </p>
    </Modal>
  );
}
export default DeleteConfirmationModal;
