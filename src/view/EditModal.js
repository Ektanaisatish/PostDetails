import React, { useState } from "react";
import './EditModal.css'

const EditModal = ({ isOpen, user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [website, setWebsite] = useState(user.website);

  const handleSave = () => {
    onSave({
      id: user.id,
      name,
      email,
      phone,
      website,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={onCancel}>
          &times;
        </span>
        <h2>Basic Modal</h2>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Website:</label>
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <div className="button-container">
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
