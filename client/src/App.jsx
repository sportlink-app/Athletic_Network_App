import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import MainNavbar from "./views/landing-page/MainNavbar";
import AccountNavbar from "./views/account/AccountNavbar";
import LandingPage from "./views/landing-page";
import GuestRoutes from "./routes/GuestRoutes";
import AccountRoutes from "./routes/AccountRoutes";

import ScrollToTop from "./components/utils/ScrollToTop";
import CheckAuth from "./middlewares/checkAuth";
import authStore from "./store/user/authStore";

function App() {
  const { isAuthenticated } = authStore();
  const location = useLocation();

  return (
    <>
      {!isAuthenticated || location.pathname === "/" ? (
        <MainNavbar />
      ) : (
        <AccountNavbar />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            <CheckAuth>
              <AccountRoutes />
            </CheckAuth>
          }
        />
        <Route path="account/*" element={<GuestRoutes />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
