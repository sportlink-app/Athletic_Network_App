import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authStore from "../../store/user/authStore";
import userInfoStore from "../../store/user/userInfoStore"; // Import userInfoStore
import MainButton from "../../components/Button";
import { useEffect } from "react";
import mainStore from "../../store/mainStore";
import { LogoutOutlined } from "@ant-design/icons";

function Logout() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthState, setProfileCompletedState } =
    authStore();
  const { clearUserInfo } = userInfoStore(); // Get the clearUserInfo method
  const { closeNavbar } = mainStore();

  const handleLogout = () => {
    // Clear authentication and profile completion cookies
    Cookies.remove("token");

    // Clear user info from userInfoStore
    clearUserInfo();

    // Update auth store state
    setAuthState(false);
    setProfileCompletedState(null);

    closeNavbar();

    // Redirect to login
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
      icon={<LogoutOutlined />}
      iconPosition="end"
    />
  );
}

export default Logout;
