// In AccountRoutes.jsx
import { Route, Routes } from "react-router-dom";
import MyProfile from "../views/account/profile";
import Explore from "../views/account/explore";
import Matches from "../views/account/matches";
import Notifications from "../views/account/notifications";
import Error from "../components/static/Error";
import UserProfile from "../views/account/explore/profile";
import Blogs from "../views/account/blog";
import UserBlogs from "../views/account/blog/profile";

function AccountRoutes() {
  return (
    <Routes>
      <Route path="explore" element={<Explore />} />
      <Route path="explore/:username" element={<UserProfile />} />
      <Route path="matches" element={<Matches />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="blog" element={<Blogs />} />
      <Route path="blog/:username" element={<UserBlogs />} />
      <Route path="profile" element={<MyProfile />} />
      <Route path="404" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AccountRoutes;
