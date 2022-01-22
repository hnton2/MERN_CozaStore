import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const auth = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = auth && JSON.parse(auth).currentUser;
const token = currentUser?.accessToken;

export const publicRequest = axios.create({ baseURL: BASE_URL });

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
