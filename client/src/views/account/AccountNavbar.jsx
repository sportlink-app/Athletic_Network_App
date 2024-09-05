import { CompassOutlined, TeamOutlined, BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import Navbar from "../../components/navbar";

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
      title: "notifications",
      href: "/notifications",
      icon: (
        <Badge dot offset={[5, -5]}>
          <BellOutlined style={{ color: "white" }} />
        </Badge>
      ),
    },
  ];

  return <Navbar items={links} />;
}

export default AccountNavbar;
