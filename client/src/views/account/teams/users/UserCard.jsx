import ProfileAvatar from "../../../../components/dynamic/Avatar";
import Card from "../../../../components/static/Card";
import Tags from "../../../../components/static/Tags";
import {
  getRandomColor,
  lightenColor,
} from "../../../../components/utils/randomColor";
import { Link } from "react-router-dom";
import { UserAddOutlined, EnvironmentOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button, message, Spin } from "antd";
import teamStore from "../../../../store/team/teamStore";
import { useState } from "react";

export default function UserCard({
  id,
  username,
  gender,
  city,
  sports,
  teamId,
  isInvited,
  isMember,
  onInviteSuccess,
}) {
  const avatarBgColor = getRandomColor(username, gender);
  const coverBgColor = lightenColor(avatarBgColor, 10);
  const { teamInvite } = teamStore();

  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleInviteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    try {
      await teamInvite(teamId, id);
      messageApi.success("User invited successfully");
      onInviteSuccess(id); // Call the callback to update state in Users component
    } catch (error) {
      messageApi.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Link to={`/user/${username}`}>
        <Card className="h-full p-0 rounded-2xl overflow-hidden hover:scale-[1.03] hover:shadow-xl duration-500 cursor-pointer">
          <div
            style={{ backgroundColor: coverBgColor }}
            className="relative w-full h-14 rounded-t-2xl border-4 border-white"
          >
            <ProfileAvatar
              username={username}
              gender={gender}
              size={58}
              bgColor={avatarBgColor}
              dot
              color="green"
              className="absolute -bottom-[29px] left-[8%]"
            />
            <Button
              disabled={isLoading || isInvited || isMember}
              onClick={handleInviteClick}
              type="primary"
              shape="round"
              size="middle"
              className="absolute -bottom-4 right-5 !bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
              icon={
                isLoading ? (
                  <Spin size="small" className="white-spin" />
                ) : (
                  <UserAddOutlined size={16} />
                )
              }
            >
              {isMember ? "Member" : isInvited ? "Invited" : "Invite"}
            </Button>
          </div>
          <div className="mt-10 p-5 pt-0">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium text-gray-900 capitalize">
                {username}
              </h3>
              <span className="flex justify-center items-center gap-1 text-gray-500">
                <EnvironmentOutlined className="text-xs pb-[.15rem]" />
                <p className="text-sm  capitalize">{city}</p>
              </span>
            </div>
            <div className="flex flex-wrap gap-y-2 mt-4">
              <Tags list={sports} />
            </div>
          </div>
        </Card>
      </Link>
    </>
  );
}

UserCard.propTypes = {
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  username: PropTypes.string,
  gender: PropTypes.string,
  city: PropTypes.string,
  sports: PropTypes.arrayOf(PropTypes.string),
  availability: PropTypes.bool,
  teamId: PropTypes.string,
  isInvited: PropTypes.bool,
  isMember: PropTypes.bool,
  onInviteSuccess: PropTypes.func,
};
