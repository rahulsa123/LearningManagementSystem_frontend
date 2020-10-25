import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "./../../services/authservices";
const StudentRoute = ({ component: Component, render, ...rest }) => {
  let history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) {
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
        if (auth.getCurrentUser().isfaculty) {
          history.replace("/");
          toast.error("Not allowed");
          return;
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default StudentRoute;
