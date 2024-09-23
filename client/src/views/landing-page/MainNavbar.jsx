import { Link } from "react-router-dom";
import Navbar from "../../components/static/navbar";
import authStore from "../../store/user/authStore";
import Logout from "../auth/Logout";
import { UserOutlined } from "@ant-design/icons";
import mainStore from "../../store/mainStore";
import { Button } from "antd";

function MainNavbar() {
  const { isAuthenticated, isProfileCompleted } = authStore();

  const links = [
    { title: "discover", id: "discover" },
    { title: "testimonials", id: "testimonials" },
    { title: "features", id: "features" },
    { title: "newsletter", id: "newsletter" },
  ];

  const logo = (
    <Link to="/">
      <img className="h-9 w-auto" src="/logo.svg" alt="Logo" />
    </Link>
  );

  const { closeNavbar } = mainStore();
  const account = (
    <Link to="/account">
      <Button
        onClick={() => closeNavbar()}
        type="primary"
        shape="round"
        size="large"
        icon={<UserOutlined />}
        iconPosition="end"
        className="!bg-white !text-green hover:!bg-white/90 duration-300"
      >
        Account
      </Button>
    </Link>
  );

  const endBtn = (
    <>{isAuthenticated && !isProfileCompleted ? <Logout /> : account}</>
  );

  return <Navbar startBtn={logo} items={links} endBtn={endBtn} />;
}

export default MainNavbar;
