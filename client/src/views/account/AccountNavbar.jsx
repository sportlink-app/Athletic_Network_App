import {
  CompassOutlined,
  TeamOutlined,
  BellOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Badge, Button, Popover } from "antd";
import Navbar from "../../components/static/navbar";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../components/dynamic/Avatar";
import Logout from "../auth/Logout";
import userInfoStore from "../../store/user/userInfoStore";
import NotificationsList from "./notifications/notifications-list";
import { useState, useEffect } from "react";

function AccountNavbar() {
  const links = [
    {
      title: "teams",
      href: "/teams",
      icon: <TeamOutlined />,
    },
    {
      title: "events",
      href: "/events",
      icon: <CompassOutlined />,
    },
    {
      title: "blog",
      href: "/blog",
      icon: <FormOutlined />,
    },
  ];

  const { username, gender } = userInfoStore();

  // State to control popover visibility
  const [open, setOpen] = useState(false);

  // Disable body scroll when popover is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Clean up on unmount or when popover closes
    };
  }, [open]);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const profile = (
    <div className="flex items-center gap-4">
      <Link to={"/profile"} className="leading-[.5rem]" onClick={hide}>
        <ProfileAvatar
          username={username}
          gender={gender}
          size={40}
          className="overflow-hidden"
        />
      </Link>
      <Popover
        content={<NotificationsList hide={hide} />}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Badge dot offset={[-5, 8]}>
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<BellOutlined />}
            className="!bg-white/20 hover:!bg-white/30"
          />
        </Badge>
      </Popover>
    </div>
  );

  return <Navbar startBtn={profile} items={links} endBtn={<Logout />} />;
}

export default AccountNavbar;
