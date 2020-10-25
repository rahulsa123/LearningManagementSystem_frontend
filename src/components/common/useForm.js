import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./Input";
function useForm(initialValues, onSubmit, schema) {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(values, schema, option);
    if (!error) return null;
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const ref_schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, ref_schema);
    return error ? error.details[0].message : null;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    onSubmit(values, setErrors);
  };
  const handleChange = ({ target: input }) => {
    const ref_errors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) ref_errors[input.name] = errorMessage;
    else delete ref_errors[input.name];

    const data = { ...values };
    data[input.name] = input.value;
    setValues(data);
    setErrors(ref_errors);
  };
  const handleFileChange = ({ target: input }) => {
    const ref_errors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) ref_errors[input.name] = errorMessage;
    else delete ref_errors[input.name];

    const data = { ...values };
    data[input.name] = input.files[0];
    setValues(data);
    setErrors(ref_errors);
  };
  const renderFileInput = (name, label, accept) => {
    return (
      <div className="class-form">
        <label htmlFor={name}>{label}</label>
        <input
          type="file"
          label={label}
          name={name}
          id={name}
          className="form-control"
          accept={accept}
          onChange={handleFileChange}
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </div>
    );
  };
  const renderInput = (name, label, type, ...rest) => {
    return (
      <Input
        name={name}
        type={type}
        label={label}
        value={values[name]}
        onChange={handleChange}
        error={errors[name]}
        {...rest[0]}
      />
    );
  };

  const renderSubmit = (label) => {
    return (
      <div className="class-form mt-2">
        <button disabled={validate()} type="submit" className="btn btn-primary">
          {label}
        </button>
      </div>
    );
  };

  return {
    handleSubmit,
    renderInput,
    renderSubmit,
    renderFileInput,
  };
}

export default useForm;
