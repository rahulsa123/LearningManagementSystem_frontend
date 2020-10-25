import React from "react";
import auth from "./../services/authservices";
import { Link } from "react-router-dom";
function Course({
  _id,
  courseName,
  courseDept,
  description,
  courseRoom,
  courseTeam,
  faculty,
}) {
  return (
    <div className="card m-2">
      <div className="card-header">
        <img
          src={faculty.image}
          className="card-img-right img-thumbnail mr-2"
          width="70"
          height="70"
          alt="no profile"
        />
        <b>{courseName}</b> by {faculty.name}
      </div>
      <div className="card-body">
        <h5 className="card-title">{description}</h5>
        <span className="card-text">
          <h6>
            <b>Department</b> : {courseDept}
          </h6>
          <h6>
            <b>Room number</b> :{courseRoom}
          </h6>
          <h6>
            <b>Team</b> : {courseTeam}
          </h6>
        </span>
      </div>
      {auth.getCurrentUser() && !auth.getCurrentUser().isfaculty && (
        <div className="card-footer">
          <Link className="btn btn-success" to={`/course/register/${_id}`}>
            {" "}
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Course;
