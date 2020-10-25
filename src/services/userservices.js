import http from "./httpservice";
const apiEndpoint = "/users";

async function register(user) {
  const form = new FormData();
  for (let key in user) {
    form.set(key, user[key]);
  }
  const config = {
    headers: {
      "content-type": `multipart/form-data;`,
      "Access-Control-Allow-Origin": "*",
    },
  };
  return await http.post(apiEndpoint, form, config);
}
async function updateUser(user, id) {
  const form = new FormData();
  for (let key in user) {
    form.set(key, user[key]);
  }
  const config = {
    headers: {
      "content-type": `multipart/form-data;`,
      "Access-Control-Allow-Origin": "*",
    },
  };
  return http.put(`${apiEndpoint}/${id}`, form, config);
}
async function getUser(id) {
  return http.get(`${apiEndpoint}/${id}`);
}
const ref = {
  register,
  getUser,
  updateUser,
};
export default ref;
