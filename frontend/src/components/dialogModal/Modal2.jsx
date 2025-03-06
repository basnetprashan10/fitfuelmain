import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
