import React from "react";
import Joi from "joi-browser";

import useForm from "./common/useForm";
import courseService from "./../services/courseservices";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
function CourseForm(props) {
  let history = useHistory();
  const initialValues = {
    courseName: "",
    courseDept: "",
    description: "",
    courseRoom: "",
    waitlistCapacity: "",
    courseTeam: "",
  };
  const schema = {
    courseName: Joi.string().min(5).max(255).required().label("Course Name"),
    courseDept: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("Course Department"),
    description: Joi.string()
      .min(5)
      .max(500)
      .required()
      .label("Course description"),
    courseRoom: Joi.number()
      .min(5)
      .max(255)
      .required()
      .label("Course Room number"),
    waitlistCapacity: Joi.number().min(0).label("Course waitlist capacity"),
    courseTeam: Joi.string().required().label("Course Team"),
  };
  const onSubmit = async (values, setErrors) => {
    const ref_values = { ...values };
    try {
      await courseService.addCourse(ref_values);
      history.replace("/");
      toast.success("Course added");
    } catch (error) {
      setErrors((err) => {
        const ref = { ...err };
        ref.courseName = error.response.data;
        return ref;
      });
    }
  };
  const { handleSubmit, renderInput, renderSubmit } = useForm(
    initialValues,
    onSubmit,
    schema
  );
  return (
    <div className="container m-5">
      <div className="bg-white text-info text-uppercase display-4 m-4 font-weight-bold">
        New course
      </div>
      <form onSubmit={handleSubmit}>
        {renderInput("courseName", "Course Name")}
        {renderInput("courseDept", "Course Department")}
        {renderInput("description", "Course description")}
        {renderInput("courseRoom", "Course Room", "number")}
        {renderInput("waitlistCapacity", "Course waitlist capacity", "number")}
        {renderInput("courseTeam", "Course Team")}
        {renderSubmit("Add Course")}
      </form>
    </div>
  );
}

export default CourseForm;
