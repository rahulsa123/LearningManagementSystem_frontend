import http from "./httpservice";

import auth from "./authservices";
const apiEndPoint = "/courses";
async function getAllCourse() {
  let { data: courses } = await http.get(apiEndPoint);
  //   console.log(courses);
  if (auth.getCurrentUser()) {
    let { data: enrolledCourse } = await http.get(`/enrolled`);
    enrolledCourse = enrolledCourse.map((enroll) => enroll.course._id);
    // console.log(enrolledCourse);
    courses = courses.filter((c) => !enrolledCourse.includes(c._id));
    // console.log(courses);
  }

  return courses;
}
function addCourse(course) {
  return http.post(apiEndPoint, course);
}
function registerCoures(courseID) {
  return http.post(`/enrolled`, { courseId: courseID });
}
function getEnrollCourse() {
  return http.get(`/enrolled`);
}
const ref = {
  getAllCourse,
  addCourse,
  registerCoures,
  getEnrollCourse,
};
export default ref;
