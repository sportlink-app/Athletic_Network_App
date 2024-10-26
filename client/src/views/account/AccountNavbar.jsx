import {
  AppstoreAddOutlined,
  TeamOutlined,
  FormOutlined,
} from "@ant-design/icons";
import Navbar from "../../components/static/navbar";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../components/dynamic/Avatar";
import Logout from "../auth/Logout";
import userInfoStore from "../../store/user/userInfoStore";
import NotificationBadge from "./notifications/NotificationBadge";

function AccountNavbar() {
  const links = [
    {
      title: "teams",
      href: "/teams",
      icon: <TeamOutlined />,
    },
    {
      title: "my hub",
      href: "/hub",
      icon: <AppstoreAddOutlined />,
    },
    {
      title: "blog",
      href: "/blog",
      icon: <FormOutlined />,
    },
  ];

  const { username, gender } = userInfoStore();

  const profile = (
    <div className="flex items-center gap-4">
      <Link to={"/profile"} className="leading-[.5rem]">
        <ProfileAvatar
          username={username}
          gender={gender}
          size={40}
          className="overflow-hidden"
        />
      </Link>
      <NotificationBadge />
    </div>
  );

  return <Navbar startBtn={profile} items={links} endBtn={<Logout />} />;
}

export default AccountNavbar;
