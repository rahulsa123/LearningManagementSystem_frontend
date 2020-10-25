import React from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import userservices from "../services/userservices";
import auth from "../services/authservices";
function UserRegister(props) {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    about_me: "",
    city: "",
    country: "",
    company: "",
    school: "",
    hometown: "",
    languages: "",
    gender: "",
    isfaculty: "",
    image: {},
  };
  const schema = {
    name: Joi.string().min(5).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    phone_number: Joi.string()
      .regex(/^[0-9]+$/, { name: "numbers" })
      .min(10)
      .max(10)
      .required()
      .error(() => {
        return {
          message: "Phone number must be 10 digit long",
        };
      }),
    about_me: Joi.string().min(15).required().label("About me"),
    city: Joi.string().min(3).required().label("City"),
    country: Joi.string().min(3).required().label("Country"),
    company: Joi.string().min(3).required().label("Company"),
    school: Joi.string().min(3).required().label("School"),
    hometown: Joi.string().min(3).required().label("Hometown"),
    languages: Joi.string().min(3).required().label("Languages"),
    gender: Joi.string().valid("male", "female", "others").required(),
    isfaculty: Joi.string().valid("yes", "no").required(),
    image: Joi.object()
      .required()
      .error(() => {
        return {
          message: "please upload image",
        };
      }),
  };
  const onSubmit = async (values, setErrors) => {
    const ref_values = { ...values };

    ref_values.isfaculty = ref_values.isfaculty === "yes";
    try {
      const response = await userservices.register(ref_values);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      setErrors((err) => {
        const ref = { ...err };
        ref.name = error.response.data;
        return ref;
      });
    }
  };
  const { handleSubmit, renderInput, renderSubmit, renderFileInput } = useForm(
    initialValues,
    onSubmit,
    schema
  );
  return (
    <div className="container m-5">
      <div className="bg-white text-info text-uppercase display-4 m-4 font-weight-bold">
        Register
      </div>
      <form onSubmit={handleSubmit}>
        {renderInput("name", "Name")}
        {renderInput("email", "Email", "email")}
        {renderInput("password", "Password", "password")}
        {renderInput("phone_number", "Phone Number")}
        {renderInput("about_me", "About me")}
        {renderInput("city", "city")}
        {renderInput("country", "Country")}
        {renderInput("company", "Company")}
        {renderInput("school", "School")}
        {renderInput("hometown", "Hometown")}
        {renderInput("languages", "Languages(comma seprated values)")}
        {renderInput("gender", "Gender")}
        {renderInput("isfaculty", "Are you faculty?")}
        {renderFileInput("image", "Image *", "image/*")}
        {renderSubmit("Register")}
      </form>
    </div>
  );
}

export default UserRegister;
