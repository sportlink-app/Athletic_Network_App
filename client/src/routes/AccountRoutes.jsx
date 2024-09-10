import { Route, Routes } from "react-router-dom";
import MyProfile from "../views/account/profile";
import Explore from "../views/account/explore";
import Matches from "../views/account/matches";
import Notifications from "../views/account/notifications";
import Error from "../components/Error";
import UserProfile from "../views/account/explore/profile";
import Blog from "../views/account/blog";

function AccountRoutes() {
  return (
    <Routes>
      <Route path="explore" element={<Explore />} />
      <Route path="explore/:username" element={<UserProfile />} />
      <Route path="matches" element={<Matches />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="blog" element={<Blog />} />
      <Route path="profile" element={<MyProfile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AccountRoutes;
