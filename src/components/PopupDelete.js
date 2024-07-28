import React from 'react';
import '../css/PopupModal.css';

const PopupDelete = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Confirm Deletion</h2>
        <p>This action cannot be undone. Are you sure you want to delete?</p>
        <div className="popup-actions">
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="confirm-button" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default PopupDelete;
