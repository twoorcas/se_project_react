import "./ItemModal.css";
function ItemModal({ activeModal, onClose, selectedCard }) {
  return (
    <div
      className={`modal ${activeModal === "preview-card" && "modal_opened"}`}
      id="preview-card"
    >
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <img src={selectedCard.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
