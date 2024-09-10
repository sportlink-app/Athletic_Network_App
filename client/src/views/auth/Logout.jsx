import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authStore from "../../store/user/authStore";
import MainButton from "../../components/Button";
import { useEffect } from "react";
import mainStore from "../../store/mainStore";

function Logout() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthState, setProfileCompletedState } =
    authStore();
  const { closeNavbar } = mainStore();

  const handleLogout = () => {
    // Clear authentication and profile completion cookies
    Cookies.remove("token");
    Cookies.remove("isProfileCompleted");

    // Update auth store state
    setAuthState(false);
    setProfileCompletedState(null);

    closeNavbar();
    // Explicitly trigger a redirect after the state is updated
    navigate("/account/login");
  };

  // Effect to handle redirection after logout
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to landing page after logout
    }
  }, [isAuthenticated, navigate]);

  return (
    <MainButton
      onClick={handleLogout}
      text="logout"
      type="primary"
      shape="round"
      bgColor="light"
    />
  );
}

export default Logout;
