import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";

const isAuthenticated = !!localStorage.getItem("token");

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Login/>}/>
    </Routes>
  );
};

export default AppRoutes;
