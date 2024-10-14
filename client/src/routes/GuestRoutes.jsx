import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../views/auth/sign-in";
import SignUp from "../views/auth/sign-up";
import CompleteProfile from "../views/account/profile/complete-profile";
import NotFound from "../components/static/errors/NotFound";
import ServerError from "../components/static/errors/ServerError";

function GuestRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="complete-profile" element={<CompleteProfile />} />
      <Route path="server-error" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default GuestRoutes;
