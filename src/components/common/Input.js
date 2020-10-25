import React from "react";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="class-form">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        label={label}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
