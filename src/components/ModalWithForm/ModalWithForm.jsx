import "./ModalWithForm.css";
function ModalWithForm({
  children,
  buttonText,
  titleText,
  onClose,
  isOpen,
  onSubmit,
  toggleSubmitButtonState,
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
              !toggleSubmitButtonState && "modal__save_active "
            }`}
            type="submit"
            disabled={toggleSubmitButtonState}
          >
            {/* css modal__save_active */}
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
