import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthUsers(props) {
  const user = JSON.parse(localStorage.getItem("token"));

  const { children } = props;
  if (user) {
    return children ? children : <Outlet />;
  }
  return <Navigate to="/" replace />;
}

export default AuthUsers;
