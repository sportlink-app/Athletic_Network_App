import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import MyProfile from "../views/account/profile"; // Make sure MyProfile is the right component
import Matches from "../views/account/matches";
import Notifications from "../views/account/notifications";
import NotFound from "../components/static/errors/NotFound";
import Users from "../views/account/explore/users";
import UserProfile from "../views/account/explore/users/profile";
import Blogs from "../views/account/blog";
import UserBlogs from "../views/account/blog/profile";
import Teams from "../views/account/explore/teams";

function AccountRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/account/profile" replace />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="explore" element={<Teams />} />
      <Route path="explore/users" element={<Users />} />
      <Route path="explore/:username" element={<UserProfile />} />
      <Route path="matches" element={<Matches />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="blog" element={<Blogs />} />
      <Route path="blog/:username" element={<UserBlogs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AccountRoutes;
