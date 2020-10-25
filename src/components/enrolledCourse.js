import React, { useEffect, useState } from "react";
import courseService from "./../services/courseservices";

import _ from "lodash";
function EnrolledCourse(props) {
  const [courses, setcourses] = useState([]);
  useEffect(() => {
    async function fetch() {
      try {
        const { data: ref_courses } = await courseService.getEnrollCourse();

        setcourses(ref_courses);
      } catch (err) {
        console.log(err);
        alert("Some erro occurred.");
      }
    }
    fetch();
  }, []);

  return (
    <div className="container">
      <div className="bg-white text-info text-uppercase display-4 m-4 font-weight-bold">
        Enrolled Courses
      </div>
      <>
        {!_.isEmpty(courses) && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Description</th>
                <th>Course Room</th>
                <th>Course Team</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, key) => (
                <tr key={key}>
                  <td>{c.course.courseName}</td>
                  <td>{c.course.courseDept}</td>
                  <td>{c.course.description}</td>
                  <td>{c.course.courseRoom}</td>
                  <td>{c.course.courseTeam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    </div>
  );
}

export default EnrolledCourse;
