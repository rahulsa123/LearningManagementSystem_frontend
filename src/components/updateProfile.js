import React from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import userservices from "../services/userservices";

import { toast } from "react-toastify";
function UpdateProfile(props) {
  const { user, closeModal, setuser } = props;
  const initialValues = {
    name: user.name || "",
    phone_number: user.phone_number || "",
    about_me: user.about_me || "",
    city: user.city || "",
    country: user.country || "",
    company: user.company || "",
    school: user.school || "",
    hometown: user.hometown || "",
    languages: (user.languages && user.languages.join(", ")) || "",
    gender: user.gender || "",
    image: {},
  };
  const schema = {
    name: Joi.string().min(5).required().label("Name"),
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
    image: Joi.object().error(() => {
      return {
        message: "Image is not compulsory",
      };
    }),
  };
  const onSubmit = async (values, setErrors) => {
    const ref_values = { ...values };

    if (!(ref_values.image && ref_values.image.name)) delete ref_values.image;

    try {
      const { data: updated_user } = await userservices.updateUser(
        ref_values,
        user._id
      );
      closeModal();
      toast.success("Profile updated(image will be updated after some time)");
      setuser(updated_user);
    } catch (error) {
      setErrors((err) => {
        const ref = { ...err };
        ref.name = error.response.data;
        return ref;
      });
    }
  };
  const { handleSubmit, renderInput, renderFileInput, renderSubmit } = useForm(
    initialValues,
    onSubmit,
    schema
  );
  return (
    <div className="card">
      <div className="card-header">
        Update Profile
        <button className="btn btn-secondary ml-5" onClick={closeModal}>
          Close
        </button>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {renderInput("name", "Name")}
          {renderInput("phone_number", "Phone Number")}
          {renderInput("about_me", "About me")}
          {renderInput("city", "city")}
          {renderInput("country", "Country")}
          {renderInput("company", "Company")}
          {renderInput("school", "School")}
          {renderInput("hometown", "Hometown")}
          {renderInput("languages", "Languages(comma seprated values)")}
          {renderInput("gender", "Gender")}
          {renderFileInput("image", "Image ", "image/*")}
          {renderSubmit("Update")}
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
