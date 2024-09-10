import {
  CompassOutlined,
  TeamOutlined,
  BellOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import Navbar from "../../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import ProfileAvatar from "../../components/Avatar";
import Cookies from "js-cookie";
import authStore from "../../store/user/authStore"; // Adjust the path as necessary
import MainButton from "../../components/Button";
import { useEffect } from "react";

function AccountNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthState, setProfileCompletedState } =
    authStore(); // Use the authStore to update state

  const links = [
    {
      title: "explore",
      href: "/explore",
      icon: <CompassOutlined />,
    },
    {
      title: "my matches",
      href: "/matches",
      icon: <TeamOutlined />,
    },
    {
      title: "blog",
      href: "/blog",
      icon: <MessageOutlined />,
    },
    {
      title: "notifications",
      href: "/notifications",
      icon: (
        <Badge dot offset={[5, -5]}>
          <BellOutlined style={{ color: "white" }} />
        </Badge>
      ),
    },
  ];

  const profile = (
    <Link to={"/profile"}>
      <ProfileAvatar username="seifAaza 37" gender="male" size={40} />
    </Link>
  );

  const handleLogout = () => {
    // Clear authentication and profile completion cookies
    Cookies.remove("token");
    Cookies.remove("isProfileCompleted");

    // Update auth store state
    setAuthState(false);
    setProfileCompletedState(null);

    // Explicitly trigger a redirect after the state is updated
    navigate("/account/login");
  };

  // Effect to handle redirection after logout
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to landing page after logout
    }
  }, [isAuthenticated, navigate]);

  const logoutBtn = (
    <MainButton
      onClick={handleLogout}
      text="logout"
      type="primary"
      shape="round"
      bgColor="light"
    />
  );

  return <Navbar startBtn={profile} items={links} endBtn={logoutBtn} />;
}

export default AccountNavbar;
