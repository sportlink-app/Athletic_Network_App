import { Route, Routes } from "react-router-dom";
import Profile from "../views/account/profile";
import Explore from "../views/account/explore";
import Matches from "../views/account/matches";
import Notifications from "../views/account/notifications";

function AccountRoutes() {
  return (
    <Routes>
      <Route path="explore" element={<Explore />} />
      <Route path="matches" element={<Matches />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}

export default AccountRoutes;
