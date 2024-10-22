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
  handleRegisterClick,
  logInError,
}) => {
  const { values, setValues, handleValueChange, errors, isValid, resetForm } =
    useFormAndValidation(["email", "password"]);
  const [submitButtonState, setSubmitButtonState] = useState(true);
  function toggleSubmitDisabled() {
    isValid ? setSubmitButtonState(false) : setSubmitButtonState(true);
  }
  function handleChange(e) {
    handleValueChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  useEffect(() => {
    if (!isSubmitted) {
      resetForm();
      //   setSubmitButtonState(true);
    }
  }, [isSubmitted]);
  useEffect(() => {
    toggleSubmitDisabled();
  }, [isValid]);

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
          } ${logInError && "modal__error_visible"}`}
        >
          Email{" "}
          {errors.email || (logInError && "lncorrect email or password") || ""}
          <input
            type="email"
            className={`modal__input ${
              !errors.email ? "" : "modal__input_error"
            } ${logInError && "modal__input_error"}`}
            onChange={handleChange}
            value={values.email}
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
          } ${logInError && "modal__error_visible"}`}
        >
          Password{" "}
          {errors.password ||
            (logInError && "lncorrect email or password") ||
            ""}
          <input
            type="password"
            className={`modal__input ${
              !errors.password ? "" : "modal__input_error"
            } ${logInError && "modal__input_error"}`}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            required
            id="password"
            value={values.password}
          />
        </label>
        <button
          className="modal__register"
          onClick={handleRegisterClick}
          type="button"
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};
export default LoginModal;
