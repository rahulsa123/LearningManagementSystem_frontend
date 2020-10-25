import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import courseService from "../services/courseservices";
function CourseRegister(props) {
  const id = props.match.params.id;

  let history = useHistory();
  useEffect(() => {
    async function call() {
      try {
        const { data } = await courseService.registerCoures(id);
        console.log(data);
        history.replace("/");
        toast.success("Course registerd");
      } catch (err) {
        history.replace("/");
        console.log(err);
        toast.error("Unable to register in  course");
      }
    }
    call();
  });
  return (
    <div className="bg-white text-info text-uppercase display-4 m-4 font-weight-bold">
      Registering ...
    </div>
  );
}

export default CourseRegister;
