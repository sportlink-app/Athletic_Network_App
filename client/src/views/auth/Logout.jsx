import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authStore from "../../store/user/authStore";
import userInfoStore from "../../store/user/userInfoStore";
import { useEffect } from "react";
import mainStore from "../../store/mainStore";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Logout() {
  const navigate = useNavigate();
  const { setAuthState, setProfileCompletedState } = authStore();
  const { clearUserInfo } = userInfoStore(); // Get the clearUserInfo method
  const { closeNavbar } = mainStore();

  const handleLogout = () => {
    // Clear authentication and profile completion cookies
    Cookies.remove("token");

    // Clear user info from userInfoStore
    clearUserInfo();

    // Update auth store state
    setAuthState(false);
    setProfileCompletedState(false); // Reset profile completion

    closeNavbar();

    // Clear any other relevant cookies or local storage
    localStorage.clear();

    // Redirect to login
    navigate("/account/login");
  };

  useEffect(() => {
    // Redirect to landing page if not authenticated
    if (!authStore.getState().isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Button
      onClick={handleLogout}
      type="primary"
      shape="round"
      size="large"
      icon={<LogoutOutlined />}
      className="!bg-white !text-green hover:!bg-white/90 duration-300"
    >
      Logout
    </Button>
  );
}

export default Logout;
