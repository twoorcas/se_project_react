import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [nameValue, setNameValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [type, setType] = useState("");

  const resetInputs = () => {
    setNameValue("");
    setUrlValue("");
    setType("");
  };
  useEffect(() => {
    resetInputs();
  }, [isOpen]);
  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };
  const onUrlChange = (e) => {
    setUrlValue(e.target.value);
  };
  const onRadioClick = (e) => {
    setType(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ nameValue, urlValue, type });
    onCloseModal();
  }

  return (
    <ModalWithForm
      buttonText="Add garment"
      titleText="New garment"
      onClose={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          value={nameValue}
          onChange={onNameChange}
          id="name"
          placeholder="Name"
          required
        />
        <span class="modal__error" id="modal-name-input-error"></span>
      </label>
      <label htmlFor="imageURL" className="modal__label">
        image{" "}
        <input
          type="url"
          className="modal__input"
          value={urlValue}
          onChange={onUrlChange}
          id="imageURL"
          placeholder="image URL"
          required
        />
        <span class="modal__error" id="modal-url-input-error"></span>
      </label>
      <fieldset className="modal__radio-fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className=" modal__radio-label">
          <input
            type="radio"
            className=" modal__input_type_radio"
            id="hot"
            name="weather-type"
            value="hot"
            onClick={onRadioClick}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__radio-label">
          <input
            type="radio"
            className=" modal__input_type_radio"
            id="warm"
            name="weather-type"
            value="warm"
            onClick={onRadioClick}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__radio-label">
          <input
            type="radio"
            className=" modal__input_type_radio"
            id="cold"
            name="weather-type"
            value="cold"
            onClick={onRadioClick}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
