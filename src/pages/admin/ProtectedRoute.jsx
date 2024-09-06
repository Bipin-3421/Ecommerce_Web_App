import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken || role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
