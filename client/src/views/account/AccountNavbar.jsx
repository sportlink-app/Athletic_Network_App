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

function AccountNavbar() {
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

  return <Navbar startBtn={profile} items={links} endBtn={<Logout />} />;
}

export default AccountNavbar;
