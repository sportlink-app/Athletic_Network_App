import { Button, Divider, Popover, Switch } from "antd";
import ProfileContent from "./ProfileContent";
import ProfileAvatar from "../../../components/Avatar";
import {
  MenuOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import Text from "../../../components/Text";
import EditProfile from "./modals/edit";
import userInfoStore from "../../../store/user/userInfoStore";

function MyProfile() {
  const { username, gender, isAvailable, setAvailability } = userInfoStore();
  const profileAside = (
    <div className="md:w-40 lg:w-48 lg:sticky top-20 self-center md:self-start flex flex-col items-center gap-3 mt-4 md:mt-0">
      <ProfileAvatar username={username} gender={gender} size={140} />
      <h2 className="text-gray-600 text-3xl font-medium capitalize text-center md:w-40 lg:w-48 text-ellipsis overflow-hidden mt-4">
        {username}
      </h2>
      <li className="self-end flex gap-3 items-center mr-6">
        <Text
          text={`${isAvailable ? "Available" : "Unavailable"}`}
          type="subtitle"
          className={`${
            !isAvailable && "text-red-400"
          }  "font-medium capitalize "`}
        />
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={() => setAvailability()}
          checked={isAvailable}
        />
      </li>
    </div>
  );

  const more = (
    <Button
      type="primary"
      size="large"
      shape="circle"
      icon={<MenuOutlined />}
      className="self-end md:self-start md:order-last bg-green hover:!bg-green/70"
    />
  );
  const moreContent = (
    <ul className="flex flex-col gap-2">
      <EditProfile />
      <Link to={`/explore/${username}`}>
        <Button
          type="text"
          shape="round"
          size="large"
          className=" text-gray-700"
          icon={<EyeOutlined size={16} />}
          iconPosition="start"
        >
          Preview
        </Button>
      </Link>
    </ul>
  );
  return (
    <div className="container mx-auto px-4 mt-10 lg:mt-14 xl:mt-16 w-full flex flex-col md:flex-row md:gap-6 lg:gap-12 xl:gap-16 ">
      <Popover
        content={moreContent}
        trigger="click"
        placement="bottomRight"
        arrow={false}
        style={{ borderRadius: "15px" }}
      >
        {more}
      </Popover>
      {profileAside}
      <Divider type="horizontal" className="w-full border-gray-200 md:hidden" />
      <Divider
        type="vertical"
        className="h-96 xl:h-[30rem] border-gray-200 hidden md:block self-center"
      />
      <ProfileContent />
    </div>
  );
}
export default MyProfile;
