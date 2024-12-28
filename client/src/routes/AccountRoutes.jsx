import { Route, Routes, Navigate } from "react-router-dom";
import MyProfile from "../views/account/profile";
import Hub from "../views/account/hub";
import Notification from "../views/account/notifications";
import NotFound from "../components/static/errors/NotFound";
import Users from "../views/account/teams/users";
import UserProfile from "../views/account/teams/users/profile";
import Blogs from "../views/account/blog";
import UserBlogs from "../views/account/blog/profile";
import Teams from "../views/account/teams/teams";
import CheckAuth from "../middlewares/checkAuth";
import ServerError from "../components/static/errors/ServerError";
import Team from "../views/account/teams/teams/team";

function AccountRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/account/profile" replace />} />
      <Route
        path="/profile"
        element={
          <CheckAuth>
            <MyProfile />
          </CheckAuth>
        }
      />
      <Route
        path="teams"
        element={
          <CheckAuth>
            <Teams />
          </CheckAuth>
        }
      />
      <Route
        path="team/:teamId"
        element={
          <CheckAuth>
            <Team />
          </CheckAuth>
        }
      />
      <Route
        path="team/:teamId/users"
        element={
          <CheckAuth>
            <Users />
          </CheckAuth>
        }
      />
      <Route
        path="user/:username"
        element={
          <CheckAuth>
            <UserProfile />
          </CheckAuth>
        }
      />
      <Route
        path="hub"
        element={
          <CheckAuth>
            <Hub />
          </CheckAuth>
        }
      />
      <Route
        path="notification/:id"
        element={
          <CheckAuth>
            <Notification />
          </CheckAuth>
        }
      />
      <Route
        path="blog"
        element={
          <CheckAuth>
            <Blogs />
          </CheckAuth>
        }
      />
      <Route
        path="blog/:username"
        element={
          <CheckAuth>
            <UserBlogs />
          </CheckAuth>
        }
      />
      <Route path="server-error" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AccountRoutes;
