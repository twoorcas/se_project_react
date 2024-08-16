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
    <div className={`modal ${isOpen && "modal_opened "}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button type="button" className="modal__close" onClick={onClose} />
        <form className="modal__form" onSubmit={onSubmit}>
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
      </div>
    </div>
  );
}
export default ModalWithForm;
