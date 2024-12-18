import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isLoading }) => {
  console.log('pro isLoading: ',isLoading)
console.log('pro isAuthenticated : ',isAuthenticated)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;