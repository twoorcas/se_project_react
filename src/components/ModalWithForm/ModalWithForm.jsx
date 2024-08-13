import "./ModalWithForm.css";
function ModalWithForm({
  children,
  buttonText,
  titleText,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button type="button" className="modal__close" onClick={onClose} />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button className="modal__save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
