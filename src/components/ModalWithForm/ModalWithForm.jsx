import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  onClose,
  isOpen,
  onSubmit,
  submitButtonState,
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} name="form">
      <h2 className="modal__title">{titleText}</h2>
      <form className="modal__form form" onSubmit={onSubmit}>
        {children}
        <button
          className={`modal__save ${
            !submitButtonState && "modal__save_active "
          }`}
          type="submit"
          disabled={submitButtonState}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}
export default ModalWithForm;
