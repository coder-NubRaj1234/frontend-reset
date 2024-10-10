// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Use jwt-decode directly

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedUser = jwtDecode(token);
      if (decodedUser.isAdmin === requiredRole) {
        return children; // Render the children components if authorized
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return <Navigate to="/" />; // Redirect to home if not authorized
};

export default ProtectedRoute;
