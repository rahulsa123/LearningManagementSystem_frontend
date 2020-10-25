import React from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import auth from "../services/authservices";
function LoginForm(props) {
  const intialvalues = {
    email: "",
    password: "",
  };
  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
  };
  const onSubmit = async (values, setError) => {
    try {
      const { email, password } = values;
      await auth.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError((err) => {
          const errors = { ...err };
          errors.email = ex.response.data;
          return errors;
        });
      }
    }
  };
  const { handleSubmit, renderInput, renderSubmit } = useForm(
    intialvalues,
    onSubmit,
    schema
  );
  return (
    <div className="container m-5">
      <div className="bg-white text-info text-uppercase display-4 m-4 font-weight-bold">
        Login
      </div>
      <form onSubmit={handleSubmit}>
        {renderInput("email", "Email", "email")}
        {renderInput("password", "Password", "password")}
        {renderSubmit("login")}
      </form>
    </div>
  );
}

export default LoginForm;
