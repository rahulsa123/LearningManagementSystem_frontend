import React, { useEffect } from "react";
import { useState } from "react";
import courseService from "./../services/courseservices";
import _ from "lodash";
import CourseList from "./courseList";
function Home(props) {
  const [courses, setcourses] = useState([]);
  useEffect(() => {
    async function fetch() {
      try {
        const ref_courses = await courseService.getAllCourse();

        setcourses(ref_courses);
      } catch (err) {
        alert("Some erro occurred.");
      }
    }
    fetch();
  }, []);
  return <>{!_.isEmpty(courses) && <CourseList courses={courses} />}</>;
}

export default Home;
