// Import React and CSS for styling
import React from "react";
import "./modal.css";

// Modal component for displaying a confirmation dialog
const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal title */}
        <h2>{title}</h2>
        {/* Modal message */}
        <p>{message}</p>
        <div className="modal-actions">
          {/* Confirm button if onConfirm is provided */}
          {onConfirm && (
            <button className="confirm-btn" onClick={onConfirm}>
              {confirmText || "Confirm"}
            </button>
          )}
          {/* Cancel button */}
          <button className="cancel-btn" onClick={onClose}>
            {cancelText || "Ok"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
