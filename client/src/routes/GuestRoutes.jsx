import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "../views/auth/SignUp";
import Login from "../views/auth/Login";

function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default GuestRoutes;
