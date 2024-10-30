import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./AddItemModal.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation.js";
const AddItemModal = ({
  isOpen,
  onAddItem,
  onCloseModal,
  isLoading,
  isSubmitted,
}) => {
  const { values, setValues, handleValueChange, errors, isValid, resetForm } =
    useFormAndValidation(["nameValue", "urlValue", "type"]);
  const [submitButtonState, setSubmitButtonState] = useState(true);
  function toggleSubmitDisabled() {
    isValid &&
    (checkRadioButton("hot") ||
      checkRadioButton("cold") ||
      checkRadioButton("warm"))
      ? setSubmitButtonState(false)
      : setSubmitButtonState(true);
  }

  const handleChange = (e) => {
    handleValueChange(e);
  };
  //handleChange first updates the form values by calling handleValueChange.
  //Then, it immediately calls validateForm to validate the form with the updated values.
  //validateForm now updates the state of errors directly using setErrors,
  //ensuring the state is always in sync with latest input values.
  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }
  const checkRadioButton = (value) => {
    if (values.type === value) {
      return true;
    } else return false;
  };
  const [radioErrorActive, setRadioErrorActive] = useState(false);

  useEffect(() => {
    if (!isSubmitted) {
      resetForm();
      //   setSubmitButtonState(true);
    }
  }, [isSubmitted]);
  useEffect(() => {
    toggleSubmitDisabled();
  }, [values]);
  return (
    <ModalWithForm
      buttonText={`${isLoading ? "Saving" : "Add garment"}`}
      titleText="New garment"
      onClose={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
    >
      <div className="form__add-item">
        <label
          htmlFor="nameValue"
          className={`modal__label ${
            !errors.nameValue ? "" : "modal__error_visible"
          }`}
        >
          Name {errors.nameValue || ""}
          <input
            type="text"
            className="modal__input"
            onChange={handleChange}
            name="nameValue"
            placeholder="Name"
            minLength={2}
            maxLength={30}
            required
            id="nameValue"
            value={values.nameValue}
          />
        </label>
        <label
          htmlFor="imgURL"
          className={`modal__label ${
            !errors.urlValue ? "" : "modal__error_visible"
          }`}
        >
          image {errors.urlValue || ""}
          <input
            type="url"
            className="modal__input"
            onChange={handleChange}
            name="urlValue"
            placeholder="image URL"
            required
            id="imgURL"
            value={values.urlValue}
          />
        </label>
        <fieldset className="modal__radio-fieldset">
          <div className="raio-fieldset__texts">
            <legend
              className={`modal__legend
                    ${!radioErrorActive ? "" : "modal__error_visible"}`}
            >
              Select the weather type:{" "}
              {!radioErrorActive ? "" : "Please select"}
            </legend>
            <span className="modal__error modal__error_type"></span>
          </div>
          <label htmlFor="hot" className=" modal__radio-label">
            <input
              type="radio"
              className=" modal__input_type_radio"
              name="type"
              value="hot"
              onChange={handleChange}
              checked={checkRadioButton("hot")}
              id="hot"
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__radio-label">
            <input
              type="radio"
              className=" modal__input_type_radio"
              name="type"
              value="warm"
              onChange={handleChange}
              checked={checkRadioButton("warm")}
              id="warm"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__radio-label">
            <input
              type="radio"
              className=" modal__input_type_radio"
              name="type"
              value="cold"
              onChange={handleChange}
              checked={checkRadioButton("cold")}
              id="cold"
            />
            Cold
          </label>
        </fieldset>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
