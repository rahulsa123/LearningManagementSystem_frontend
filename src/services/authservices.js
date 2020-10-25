import http from "./httpservice";

import jwtDecode from "jwt-decode";

const apiEndPoint = "/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, data["key"]);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
const ref = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
export default ref;
