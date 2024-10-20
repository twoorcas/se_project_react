import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
const EditProfileModal = ({
  isOpen,
  onCloseModal,
  isLoading,
  isSubmitted,
  onSaveChanges,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, setValues, handleValueChange, errors, isValid, resetForm } =
    useFormAndValidation(["name", "avatar"]);
  const [submitButtonState, setSubmitButtonState] = useState(true);
  function toggleSubmitDisabled() {
    isValid ? setSubmitButtonState(false) : setSubmitButtonState(true);
  }
  function handleChange(e) {
    handleValueChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSaveChanges(values);
  }

  useEffect(() => {
    resetForm();
    setSubmitButtonState(true);
  }, [isSubmitted, resetForm]);
  useEffect(() => {
    toggleSubmitDisabled();
  }, [isValid]);

  return (
    <ModalWithForm
      buttonText={`${isLoading ? "Saving" : "Save Changes"}`}
      titleText="Edit Profile"
      onClose={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
    >
      <div className="form__edit-profile">
        <label
          htmlFor="name"
          className={`modal__label ${
            !errors.name ? "" : "modal__error_visible"
          } `}
        >
          Name {errors.name}
          <input
            type="text"
            className={`modal__input ${
              !errors.email ? "" : "modal__input_error"
            } `}
            defaultValue={currentUser.name}
            onChange={handleChange}
            name="name"
            placeholder="name"
            required
            id="name"
            minLength={2}
            maxLength={30}
          />
        </label>
        <label
          htmlFor="avatar"
          className={`modal__label ${
            !errors.avatar ? "" : "modal__error_visible"
          } `}
        >
          Avatar {errors.avatar}
          <input
            type="url"
            className={`modal__input ${
              !errors.avatar ? "" : "modal__input_error"
            } `}
            defaultValue={currentUser.avatar}
            onChange={handleChange}
            name="avatar"
            placeholder="avatar"
            required
            id="avatar"
          />
        </label>
      </div>
    </ModalWithForm>
  );
};
export default EditProfileModal;
