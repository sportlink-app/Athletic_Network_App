import { Link } from "react-router-dom";
import MainButton from "../../components/Button";
import Navbar from "../../components/navbar";
import authStore from "../../store/user/authStore";
import Logout from "../auth/Logout";
import { UserOutlined } from "@ant-design/icons";
import mainStore from "../../store/mainStore";

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
    <MainButton
      onClick={() => closeNavbar()}
      href="/account"
      text="account"
      type="primary"
      shape="round"
      bgColor="light"
      icon={<UserOutlined />}
      iconPosition="end"
    />
  );

  const endBtn = (
    <>{isAuthenticated && !isProfileCompleted ? <Logout /> : account}</>
  );

  return <Navbar startBtn={logo} items={links} endBtn={endBtn} />;
}

export default MainNavbar;
