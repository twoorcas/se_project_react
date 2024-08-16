import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./AddItemModal.css";
import updateForm from "../../hooks/updateFormData.js";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  //error test
  const formData = {
    nameValue: "",
    urlValue: "",
    type: "",
  };
  const { values, handleValueChange, setValues } = updateForm(formData);
  const [errors, setErrors] = useState({
    nameValue: "",
    urlValue: "",
    type: "",
  });

  const validateForm = (data) => {
    if (!data.nameValue.trim()) {
      errors.nameValue = "Username is required";
    } else if (data.nameValue.length < 2) {
      errors.nameValue = "Username must be at least 2 characters long";
    } else {
      errors.nameValue = "";
    }
    if (!data.urlValue.trim()) {
      errors.urlValue = "Email is required";
    } else if (data.urlValue.search("https://") === -1) {
      errors.urlValue = "Email is invalid";
    } else {
      errors.urlValue = "";
    }

    if (!data.type.trim()) {
      errors.type = "Select a weather type";
    } else {
      errors.type = "";
    }
    return errors;
  };

  // const newErrors = validateForm(values);

  function toggleSubmitButtonState(newErrors) {
    if (Object.keys(newErrors).length === 0) {
      return false;
    } else {
      return true;
    }
  }

  const handleChange = (e) => {
    const newErrors = validateForm(values);
    handleValueChange(e.target);
    toggleSubmitButtonState(newErrors);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }
  const checkRadioButton = (value) => {
    if (values.type === value) {
      return true;
    } else return false;
  };
  const resetInputs = () => {
    setValues({
      nameValue: "",
      urlValue: "",
      type: "",
    });
    setErrors({});
  };
  // useEffect
  useEffect(() => {
    resetInputs();
  }, [isOpen]);
  // useEffect(() => {
  //   validateForm(values);
  // }, [values]);

  //css modal__error_visible

  return (
    <>
      <ModalWithForm
        buttonText="Add garment"
        titleText="New garment"
        onClose={onCloseModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        toggleSubmitButtonState={toggleSubmitButtonState}
      >
        <div className="form__add-item">
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              value={values.nameValue}
              onChange={handleChange}
              name="nameValue"
              placeholder="Name"
              minlength="2"
              maxlength="30"
              required
            />
            <span
              className="modal__error modal__error_nameValue"
              name="nameValue"
            >
              {errors.nameValue}
            </span>
          </label>
          <label htmlFor="imageURL" className="modal__label">
            image{" "}
            <input
              type="url"
              className="modal__input"
              value={values.urlValue}
              onChange={handleChange}
              name="urlValue"
              placeholder="image URL"
              required
            />
            <span
              className="modal__error modal__error_urlValue"
              name="urlValue"
            >
              {errors.urlValue}
            </span>
          </label>
          <fieldset className="modal__radio-fieldset">
            <div className="raio-fieldset__texts">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <span className="modal__error modal__error_type" name="type">
                {errors.type}
              </span>
            </div>
            <label htmlFor="hot" className=" modal__radio-label">
              <input
                type="radio"
                className=" modal__input_type_radio"
                name="type"
                value="hot"
                onChange={handleChange}
                checked={checkRadioButton("hot")}
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
              />
              Cold
            </label>
          </fieldset>
        </div>
      </ModalWithForm>
    </>
  );
};

export default AddItemModal;
