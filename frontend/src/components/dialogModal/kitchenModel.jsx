// Modal.js
import React from "react";
import "./kitchenModel.css";

const CartModal = ({
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
    <div className="cart-modal-overlay">
      <div className="cart-modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="cart-modal-actions">
          {onConfirm && (
            <button className="cart-confirm-btn" onClick={onConfirm}>
              {confirmText || "Confirm"}
            </button>
          )}
          <button className="cart-cancel-btn" onClick={onClose}>
            {cancelText || "Ok"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
