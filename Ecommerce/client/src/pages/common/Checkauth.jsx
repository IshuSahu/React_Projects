import { LocateIcon } from "lucide-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function Checkauth({ isAuthenticated, user, children }) {
  const location = useLocation();
  if (location.pathname == "/") {
    if (!isAuthenticated) {
      return <Navigate to={"/auth/login"} />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to={"/admin/dashboard"} />;
      } else {
        return <Navigate to={"/user/home"} />;
      }
    }
  }

  // Redirect unauthenticated users to login
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  // Redirect authenticated users trying to access login/register to appropriate page
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/user/home"} />;
    }
  }

  // If an authenticated non-admin user tries to access admin pages, redirect them
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Admin trying to access a non-admin page should stay on their current page
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("user")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Allow authenticated users to access the requested page without redirection
  return <>{children}</>;
}

export default Checkauth;
