import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../views/auth/sign-in";
import Error from "../components/static/Error";
import SignUp from "../views/auth/sign-up";
import CompleteProfile from "../views/account/profile/complete-profile";

function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="complete-profile" element={<CompleteProfile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default GuestRoutes;
