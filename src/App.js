import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NotFound from "./components/notFound";
import UserRegister from "./components/userRegister";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Home from "./components/home";
import NavBar from "./components/navbar";
import Profile from "./components/profile";
import CourseForm from "./components/courseForm";
import CourseRegister from "./components/courseRegister";
import EnrolledCourse from "./components/enrolledCourse";
import FacultyRoute from "./components/common/FacultyRoute";
import StudentRoute from "./components/common/StudentRoute";
import ProtectedRoute from "./components/common/ProtechedRoute";

function App() {
  return (
    <main>
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/login" component={LoginForm} />
        <ProtectedRoute path="/profile" component={Profile} />
        <FacultyRoute path="/course/new" component={CourseForm} />
        <StudentRoute path="/course/enroll" component={EnrolledCourse} />
        <StudentRoute path="/course/register/:id" component={CourseRegister} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/register" exact component={UserRegister} />
        <Route path="/not-found" exact component={NotFound} />
        <Route path="/home" exact component={Home} />
        <Redirect from="/" to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
