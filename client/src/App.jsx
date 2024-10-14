import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./views/landing-page";
import GuestRoutes from "./routes/GuestRoutes";
import AccountRoutes from "./routes/AccountRoutes";
import ScrollToTop from "./components/utils/ScrollToTop";
import CheckAuth from "./middlewares/checkAuth";
import AccountNavbar from "./views/account/AccountNavbar";
import MainNavbar from "./views/landing-page/MainNavbar";
import authStore from "./store/user/authStore";

function App() {
  const { isAuthenticated, isProfileCompleted } = authStore();

  return (
    <>
      {isAuthenticated && isProfileCompleted ? (
        <AccountNavbar />
      ) : (
        <MainNavbar />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<GuestRoutes />} />
        <Route
          path="account/*"
          element={
            <CheckAuth>
              <AccountRoutes />
            </CheckAuth>
          }
        />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
