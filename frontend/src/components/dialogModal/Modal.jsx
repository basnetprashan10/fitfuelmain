import React from "react";
import "./modal.css";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          {onConfirm && (
            <button className="confirm-btn" onClick={onConfirm}>
              {confirmText || "Confirm"}
            </button>
          )}
          <button className="cancel-btn" onClick={onClose}>
            {cancelText || "Ok"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
