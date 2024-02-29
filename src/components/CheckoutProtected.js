import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = localStorage.getItem("auth_token");
  const cart_user = localStorage.getItem("cart_token");
  if (user || cart_user) {
    return true;
  } else {
    return false;
  }
};

const CheckoutProtected = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default CheckoutProtected;
