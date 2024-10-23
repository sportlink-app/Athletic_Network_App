import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import authStore from "./store/user/authStore";
import Preloader from "./components/static/Preloader";
import AccountNavbar from "./views/account/AccountNavbar";
import MainNavbar from "./views/landing-page/MainNavbar";
import { preloadAssets } from "./components/utils/preloadAssets";

// Lazy load components
const AccountRoutes = lazy(() => import("./routes/AccountRoutes"));
const LandingPage = lazy(() => import("./views/landing-page"));
const GuestRoutes = lazy(() => import("./routes/GuestRoutes"));

function App() {
  const { isAuthenticated, isProfileCompleted } = authStore();
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  useEffect(() => {
    // Call preloadAssets to preload fonts, images, etc.
    const preload = async () => {
      await preloadAssets();
      setIsAssetsLoaded(true); // Set assets as loaded after everything is done
    };
    preload();
  }, []);

  if (!isAssetsLoaded) {
    return <Preloader />; // Display the preloader until all assets are loaded
  }

  return (
    <Suspense fallback={<Preloader />}>
      {isAuthenticated && isProfileCompleted ? (
        <AccountNavbar />
      ) : (
        <MainNavbar />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="account/*" element={<GuestRoutes />} />
        <Route path="/*" element={<AccountRoutes />} />
      </Routes>

      <ScrollToTop />
    </Suspense>
  );
}

export default App;
