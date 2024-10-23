import { Button, Divider, Popover, Spin, message } from "antd";
import ProfileContent from "./ProfileContent";
import { MenuOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import EditProfile from "./edit-profile";
import userInfoStore from "../../../store/user/userInfoStore";
import { useEffect, useState } from "react";
import ProfileAside from "./ProfileAside";

function MyProfile() {
  const { getProfile, username, gender, bio, sports, email, city, tel } =
    userInfoStore();

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        await getProfile(); // Fetch profile data
      } catch (error) {
        messageApi.error("Error fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [getProfile, messageApi]);

  const moreContent = (
    <ul className="flex flex-col gap-2">
      <EditProfile />
      <Link to={`/user/${username}`}>
        <Button
          type="link"
          shape="round"
          size="large"
          className="!text-gray-700 hover:!bg-slate-100"
          icon={<EyeOutlined size={16} />}
          iconPosition="start"
        >
          Preview
        </Button>
      </Link>
    </ul>
  );

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <div className="h-[calc(100vh-59.19px)] grid place-items-center">
          <Spin size="large" className="green-spin" />
        </div>
      ) : (
        <div className="container mx-auto px-4 mt-10 lg:mt-14 xl:mt-16 w-full flex flex-col md:flex-row md:gap-6 lg:gap-12 xl:gap-16">
          <Popover
            content={moreContent}
            trigger="click"
            placement="bottomRight"
            arrow={false}
            style={{ borderRadius: "15px" }}
          >
            <Button
              type="primary"
              size="large"
              shape="circle"
              icon={<MenuOutlined />}
              className="self-end md:self-start md:order-last !bg-green hover:!bg-green hover:brightness-105"
            />
          </Popover>
          <ProfileAside username={username} gender={gender} />
          <Divider
            type="horizontal"
            className="w-full border-gray-200 md:hidden"
          />
          <Divider
            type="vertical"
            className="h-96 xl:h-[30rem] border-gray-200 hidden md:block self-center"
          />

          <ProfileContent
            bio={bio}
            sports={sports}
            email={email}
            city={city}
            tel={tel}
          />
        </div>
      )}
    </>
  );
}

export default MyProfile;
