import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "../views/auth/SignUp";
import Login from "../views/auth/Login";
import Error from "../components/Error";

function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default GuestRoutes;
