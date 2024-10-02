import {
  CompassOutlined,
  TeamOutlined,
  BellOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import Navbar from "../../components/static/navbar";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../components/dynamic/Avatar";
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
      icon: <FormOutlined />,
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
    <Link to={"/profile"} className="leading-[.5rem]">
      <ProfileAvatar username={username} gender={gender} size={40} />
    </Link>
  );

  return <Navbar startBtn={profile} items={links} endBtn={<Logout />} />;
}

export default AccountNavbar;
