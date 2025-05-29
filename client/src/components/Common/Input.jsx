import React from 'react';

export const Input = ({ label, type = 'text', ...props }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input type={type} className="input-field" {...props} />
    </div>
  );
};

export default Input;