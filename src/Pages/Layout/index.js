import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthUsers from "../AuthUsers";
import Home from "../Home";
import Loadable from "../../Component/Loader/Loadable";
import Welcome from "../Welcome";

const Login = Loadable(lazy(() => import("../Login")));
const Register = Loadable(lazy(() => import("../Register")));

function Layout() {
  return (
    <div>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthUsers />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Layout;
