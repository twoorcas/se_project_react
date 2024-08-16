import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./AddItemModal.css";
import updateFormData from "../../hooks/updateFormData.js";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal, isLoading }) => {
  //error test
  const formData = {
    nameValue: "",
    urlValue: "",
    type: "",
  };
  const { values, handleValueChange, setValues } = updateFormData(formData);
  const [errors, setErrors] = useState({});
  const [radioChecked, setRadioChecked] = useState(false);
  const validateForm = (data) => {
    let newErrors = { ...errors }; // a new object to hold the errors
    //inputEl.validity.valid
    //inputEl.validationMessage
    if ("nameValue" in data) {
      if (!data.nameValue.trim()) {
        newErrors.nameValue = "Username is required";
      } else if (data.nameValue.length < 2) {
        newErrors.nameValue = "Username must be at least 2 characters long";
      } else {
        newErrors.nameValue = "";
      }
    }
    if ("urlValue" in data) {
      if (!data.urlValue.trim()) {
        newErrors.urlValue = "Email is required";
      } else if (data.urlValue.search("https://") === -1) {
        newErrors.urlValue = "Email is invalid";
      } else {
        newErrors.urlValue = "";
      }
    }
    if ("type" in data) {
      if (!data.type.trim()) {
        setRadioChecked(false);
        newErrors.type = "Select a weather type";
      } else {
        newErrors.type = "";
        setRadioChecked(true);
        console.log("raiochecked");
      }
    }
    if (!data["type"]) {
      setRadioChecked(false);
    }
    setErrors(newErrors); // Update error state
    console.log(errors); //one too slow
    console.log(newErrors); //latest
    return newErrors;
  };

  function submitDisabled({ errors, values }) {
    if (Object.keys(errors).length === 0 && Object.keys(values).length === 3) {
      return false;
    }
    return true;
  }

  const handleChange = (e) => {
    //handleChange first updates the form values by calling handleValueChange.
    //Then, it immediately calls validateForm to validate the form with the updated values.
    //validateForm now updates the state of errors directly using setErrors,
    //ensuring the state is always in sync with latest input values.
    handleValueChange(e.target);
    const allErrors = validateForm({
      ...values,
      [e.target.name]: e.target.value,
    });
    submitDisabled({ allErrors, values });
    validateForm({
      [e.target.name]: e.target.value,
    });
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

  //css modal__error_visible

  return (
    <>
      <ModalWithForm
        buttonText={`${isLoading ? "Saving" : "Add garment"}`}
        titleText="New garment"
        onClose={onCloseModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        submitDisabled={submitDisabled}
      >
        <div className="form__add-item">
          <label
            htmlFor="name"
            className={`modal__label ${
              !errors.nameValue ? "" : "modal__error_visible"
            }`}
          >
            Name {errors.nameValue}
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
          </label>
          <label
            htmlFor="imageURL"
            className={`modal__label ${
              !errors.urlValue ? "" : "modal__error_visible"
            }`}
          >
            image {errors.urlValue}
            <input
              type="url"
              className="modal__input"
              value={values.urlValue}
              onChange={handleChange}
              name="urlValue"
              placeholder="image URL"
              required
            />
          </label>
          <fieldset className="modal__radio-fieldset">
            <div className="raio-fieldset__texts">
              <legend
                className={`modal__legend ${
                  !errors.type ? "" : "modal__error_visible"
                }`}
              >
                Select the weather type:
              </legend>
              <span className="modal__error modal__error_type">
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
