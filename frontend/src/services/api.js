import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api/auth",
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
