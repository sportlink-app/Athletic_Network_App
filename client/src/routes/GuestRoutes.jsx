import { Route, Routes, Navigate } from "react-router-dom";

import Login from "../views/auth/sign-in";
import Error from "../components/Error";
import SignUp from "../views/auth/sign-up";

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
