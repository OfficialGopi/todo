import { lazy } from "react";
import { Route, Routes } from "react-router";

//IMPORT ELEMENTS
const Login = lazy(() => import("../app/Login"));
const SignUp = lazy(() => import("../app/SignUp"));

function Router() {
  //ROUTES
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export { Router };
