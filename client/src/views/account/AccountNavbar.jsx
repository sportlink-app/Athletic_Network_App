import {
  CompassOutlined,
  TeamOutlined,
  BellOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../components/Avatar";
import Logout from "../auth/Logout";
import userInfoStore from "../../store/user/userInfoStore";

function AccountNavbar() {
  const links = [
    {
      title: "explore",
      href: "/explore?page=1",
      icon: <CompassOutlined />,
    },
    {
      title: "blog",
      href: "/blog",
      icon: <MessageOutlined />,
    },
    {
      title: "my team",
      href: "/team",
      icon: <TeamOutlined />,
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

  const { username, gender } = userInfoStore();

  const profile = (
    <Link to={"/profile"}>
      <ProfileAvatar username={username} gender={gender} size={40} />
    </Link>
  );

  return <Navbar startBtn={profile} items={links} endBtn={<Logout />} />;
}

export default AccountNavbar;
