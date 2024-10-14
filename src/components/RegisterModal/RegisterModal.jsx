import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./RegisterModal.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
const RegisterModal = ({
  isOpen,
  onCloseModal,
  isLoading,
  isSubmitted,
  onRegister,
  handleLogInClick,
}) => {
  const { values, setValues, handleValueChange, errors, isValid, resetForm } =
    useFormAndValidation(["email", "password", "name", "avatar"]);
  const [submitButtonState, setSubmitButtonState] = useState(true);
  function toggleSubmitDisabled() {
    isValid ? setSubmitButtonState(false) : setSubmitButtonState(true);
  }
  function handleChange(e) {
    handleValueChange(e);
  }
  //values={email: 'juliechenmedicine@gmail.com', password: '1111', name: 'd', avatar: 'http://www.1233.com'}
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  // useEffect
  useEffect(() => {
    resetForm();
    setSubmitButtonState(true);
  }, [isSubmitted, resetForm]);
  useEffect(() => {
    toggleSubmitDisabled();
  }, [values]);
  return (
    <ModalWithForm
      buttonText={`${isLoading ? "Saving" : "Next"}`}
      titleText="Sign up"
      onClose={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
    >
      <div className="form__signup">
        <label
          htmlFor="email"
          className={`modal__label ${
            !errors.email ? "" : "modal__error_visible"
          }`}
        >
          Email {errors.email || ""}
          <input
            type="email"
            className="modal__input"
            value={values.email || ""}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            required
            id="email"
          />
        </label>
        <label
          htmlFor="password"
          className={`modal__label ${
            !errors.password ? "" : "modal__error_visible"
          }`}
        >
          Password {errors.password || ""}
          <input
            type="password"
            className="modal__input"
            value={values.password || ""}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            required
            id="password"
          />
        </label>
        <label
          htmlFor="name"
          className={`modal__label ${
            !errors.name ? "" : "modal__error_visible"
          }`}
        >
          Name {errors.name || ""}
          <input
            type="text"
            className="modal__input"
            value={values.name || ""}
            onChange={handleChange}
            name="name"
            placeholder="Name"
            required
            id="name"
          />
        </label>
        <label
          htmlFor="avatar"
          className={`modal__label ${
            !errors.avatar ? "" : "modal__error_visible"
          }`}
        >
          Avatar URL {errors.avatar || ""}
          <input
            type="url"
            className="modal__input"
            value={values.avatar || ""}
            onChange={handleChange}
            name="avatar"
            placeholder="Avatar URL"
            required
            id="avatar"
          />
        </label>
        <button className="modal__login" onClick={handleLogInClick}>
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;
