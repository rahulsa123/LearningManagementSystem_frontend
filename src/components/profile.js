import React, { useEffect } from "react";
import { useState } from "react";
import userservices from "./../services/userservices";
import authservices from "./../services/authservices";
import _ from "lodash";
import Tr from "./common/tr";

import Modal from "react-modal";
import UpdateProfile from "./updateProfile";
function Profile(props) {
  const [user, setuser] = useState({});
  const [EditForm, setEditForm] = React.useState(false);
  const keys = [
    "name",
    "email",
    "phone_number",
    "about_me",
    "city",
    "country",
    "company",
    "school",
    "hometown",
    "languages",
    "gender",
  ];
  function openModal() {
    setEditForm(true);
  }
  function closeModal() {
    setEditForm(false);
  }
  useEffect(() => {
    Modal.setAppElement("body");
    async function fetch() {
      if (!authservices.getCurrentUser()) {
        alert("don't access permission");
        window.location = "/";
      }
      const { data: ref_user } = await userservices.getUser(
        authservices.getCurrentUser()._id
      );
      setuser(ref_user);
    }
    fetch();
  }, []);

  return (
    <div className="container m-5">
      {!_.isEmpty(user) && (
        <div className="row w-100">
          <div className="col-3">
            <div className="card p-2 bg-muted border border-info">
              <img
                src={user.image}
                className="card-img-top img-thumbnail border border-secondary"
                alt="No profile"
              />
              <div className="card-footer bg-white text-info text-uppercase font-weight-bold">
                {user.name}
              </div>

              <button className="btn btn-success" onClick={openModal}>
                Update Profile
              </button>
              <Modal
                isOpen={EditForm}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
              >
                <UpdateProfile
                  user={user}
                  closeModal={closeModal}
                  setuser={setuser}
                />
              </Modal>
            </div>
          </div>
          <div className="col-5 ml-2 mt-0">
            <div className="bg-white text-info text-uppercase display-4 m-4 font-weight-bold">
              Profile
            </div>
            <table className="table ">
              <tbody>
                {keys.map((k, i) => (
                  <Tr key={i} label={k} value={user[k] || ""} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
