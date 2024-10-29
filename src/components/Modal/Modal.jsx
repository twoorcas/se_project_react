import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({ onClose, children, isOpen, name }) => {
  useEffect(() => {
    //  define  handler inside `useEffect`=not lose the reference to be able to remove it
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // remove the listener in the `clean-up` function
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={`modal  ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div className={`modal__content modal__content_type_${name}`}>
        {children}
        <button
          className={`modal__close modal__close_type_${name}`}
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
