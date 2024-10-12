import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./LoginModal.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
const LoginModal = ({
  isOpen,
  onCloseModal,
  isLoading,
  isSubmitted,
  onLogin,
}) => {
  const { values, setValues, handleValueChange, errors, isValid, resetForm } =
    useFormAndValidation(["email", "password"]);
  const [submitButtonState, setSubmitButtonState] = useState(true);
  function toggleSubmitDisabled() {
    isValid ? setSubmitButtonState(false) : setSubmitButtonState(true);
  }
  function handleChange(e) {
    handleValueChange(e);
    console.log(values);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
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
      buttonText={`${isLoading ? "Saving" : "Login"}`}
      titleText="Log In"
      onClose={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
    >
      <div className="form__login">
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
        <button className="modal__register">or Register</button>
      </div>
    </ModalWithForm>
  );
};
export default LoginModal;
