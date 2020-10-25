import React from "react";
import Course from "./course";

function CourseList({ courses }) {
  return (
    <div className="container m-5">
      {courses.map((course, key) => (
        <Course {...course} key={key} />
      ))}
    </div>
  );
}

export default CourseList;
