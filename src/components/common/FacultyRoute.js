import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "./../../services/authservices";
const FacultyRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser() || !auth.getCurrentUser().isfaculty) {
          auth.logout();
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default FacultyRoute;
