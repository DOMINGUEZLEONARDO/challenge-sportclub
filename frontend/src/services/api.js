import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: url,
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const getProfile = () =>
  API.get("/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
export const updateProfile = (data) =>
  API.put("/update", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
export const listUsers = () =>
  API.get("/users", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
