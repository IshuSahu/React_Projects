import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function Checkauth({ isAuthenticate, user, children }) {
  const location = useLocation();
  if (
    !isAuthenticate &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }
  if (
    isAuthenticate &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/user/home"} />;
    }
  }
  if (
    isAuthenticate &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticate &&
    user?.role == "admin" &&
    location.pathname.includes("user")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return  <>{children}</>
}

export default Checkauth;
