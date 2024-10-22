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
  useEffect(() => {
    if (!isSubmitted) {
      resetForm();
      //   setSubmitButtonState(false);
    }
  }, [isSubmitted]);
  useEffect(() => {
    toggleSubmitDisabled();
  }, [isValid]);
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
          htmlFor="register-email"
          className={`modal__label ${
            !errors.email ? "" : "modal__error_visible"
          }`}
        >
          Email {errors.email || ""}
          <input
            type="email"
            className="modal__input"
            onChange={handleChange}
            name="email"
            placeholder="Email"
            required
            id="register-email"
            value={values.email}
          />
        </label>
        <label
          htmlFor="register-password"
          className={`modal__label ${
            !errors.password ? "" : "modal__error_visible"
          }`}
        >
          Password {errors.password || ""}
          <input
            type="password"
            className="modal__input"
            onChange={handleChange}
            name="password"
            placeholder="Password"
            required
            id="register-password"
            value={values.password}
          />
        </label>
        <label
          htmlFor="register-name"
          className={`modal__label ${
            !errors.name ? "" : "modal__error_visible"
          }`}
        >
          Name {errors.name || ""}
          <input
            type="text"
            className="modal__input"
            onChange={handleChange}
            name="name"
            placeholder="Name"
            required
            id="register-name"
            value={values.name}
          />
        </label>
        <label
          htmlFor="register-avatar"
          className={`modal__label ${
            !errors.avatar ? "" : "modal__error_visible"
          }`}
        >
          Avatar URL {errors.avatar || ""}
          <input
            type="url"
            className="modal__input"
            onChange={handleChange}
            name="avatar"
            placeholder="Avatar URL"
            required
            id="register-avatar"
            value={values.avatar}
          />
        </label>
        <button
          className="modal__login"
          onClick={handleLogInClick}
          type="button"
        >
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;
