import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../components/static/errors/NotFound";
import CheckAuth from "../middlewares/checkAuth";
import ServerError from "../components/static/errors/ServerError";
import Upcoming from "../views/account/hub/upcoming";
import Achievements from "../views/account/hub/achievements";

function HubRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="upcoming" replace />} />
      <Route
        path="upcoming"
        element={
          <CheckAuth>
            <Upcoming />
          </CheckAuth>
        }
      />
      <Route
        path="achievements"
        element={
          <CheckAuth>
            <Achievements />
          </CheckAuth>
        }
      />
      <Route path="server-error" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default HubRoutes;
