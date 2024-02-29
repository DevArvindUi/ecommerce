import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = localStorage.getItem("auth_token");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoute = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
