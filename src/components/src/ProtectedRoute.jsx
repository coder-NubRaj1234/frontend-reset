// src/components/src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Optionally, check the role if required
  const decodedToken = jwtDecode(token);
  if (requiredRole && !decodedToken.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
