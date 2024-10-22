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
      href: "/account/explore?page=1",
      icon: <CompassOutlined />,
    },
    {
      title: "my team",
      href: "/account/team",
      icon: <TeamOutlined />,
    },
    {
      title: "blog",
      href: "/account/blog",
      icon: <FormOutlined />,
    },
    {
      title: "notifications",
      href: "/account/notifications",
      icon: (
        <Badge dot offset={[5, -5]}>
          <BellOutlined style={{ color: "white" }} />
        </Badge>
      ),
    },
  ];

  const { username, gender, availability } = userInfoStore();

  const profile = (
    <Link to={"/account/profile"} className="leading-[.5rem]">
      <ProfileAvatar
        username={username}
        gender={gender}
        size={40}
        className="overflow-hidden"
      />
    </Link>
  );

  return <Navbar startBtn={profile} items={links} endBtn={<Logout />} />;
}

export default AccountNavbar;
