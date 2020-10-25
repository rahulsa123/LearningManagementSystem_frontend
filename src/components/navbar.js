import React from "react";
import { Link, NavLink } from "react-router-dom";
import auth from "../services/authservices";
function NavBar(props) {
  return (
    <nav className="navbar  navbar-expand-lg navbar-dark bg-dark ">
      <Link className="navbar-brand ml-5" to="/">
        <strong>
          <i>Learning HUB</i>
        </strong>
      </Link>

      <div className="navbar-expand-sm" id="">
        <ul className="navbar-nav mr-auto ">
          {auth.getCurrentUser() && (
            <>
              <li className="nav-item ">
                <NavLink className="nav-link" to="/profile">
                  profile
                </NavLink>
              </li>
              {auth.getCurrentUser().isfaculty && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/course/new">
                    New Course
                  </NavLink>
                </li>
              )}
              {!auth.getCurrentUser().isfaculty && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/course/enroll">
                    Enrolled courses
                  </NavLink>
                </li>
              )}

              <li className="nav-item ">
                <NavLink className="nav-link" to="/logout">
                  logout
                </NavLink>
              </li>

              <li className="nav-item active">
                <div className="nav-link">
                  <b>{auth.getCurrentUser().email}</b>
                </div>
              </li>
            </>
          )}
          {!auth.getCurrentUser() && (
            <>
              <li className="nav-item ">
                <NavLink className="nav-link" to="/login">
                  login
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
