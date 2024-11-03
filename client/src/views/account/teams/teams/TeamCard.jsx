import ProfileAvatar from "../../../../components/dynamic/Avatar";
import Card from "../../../../components/static/Card";
import Tags from "../../../../components/static/Tags";
import {
  darkenColor,
  getRandomColor,
  lightenColor,
} from "../../../../components/utils/randomColor";
import {
  UserAddOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Avatar, Button, message, Tag } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import userInfoStore from "../../../../store/user/userInfoStore";

export default function TeamCard({
  teamId,
  name,
  description,
  sport,
  members,
  rest,
  city,
  date,
  isMember,
}) {
  const avatarGroupRandomColor = getRandomColor(name);
  const avatarGroupColor = darkenColor(avatarGroupRandomColor, 30);
  const avatarGroupBgColor = lightenColor(avatarGroupRandomColor, 5);

  const [messageApi, contextHolder] = message.useMessage();
  const availability = userInfoStore((state) => state.availability);

  // Handle button click without triggering the link navigation
  const handleJoinClick = (e) => {
    e.stopPropagation(); // Prevent link from being triggered
    e.preventDefault(); // Prevent default link behavior
    if (!availability) {
      messageApi.open({
        type: "warning",
        content:
          "You must be available to create a team. Please update your availability in your profile.",
        duration: 5,
      });
    } else {
      console.log("Invite button clicked!");
    }
  };

  return (
    <>
      {contextHolder}
      <Card className="h-full rounded-2xl p-5 lg:p-6 flex flex-col gap-5">
        <div className="w-full flex justify-between">
          <h3 className="text-base xl:text-lg font-medium text-gray-900 capitalize">
            {name}
          </h3>
          <Tags list={[sport]} />
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <Avatar.Group
          max={{
            count: 3,
            style: {
              color: `${avatarGroupColor}`,
              backgroundColor: `${avatarGroupBgColor}`,
              height: "58px",
              width: "58px",
            },
          }}
        >
          {members.map((member) => (
            <Link to={`/user/${member.username}`} key={member.username}>
              <ProfileAvatar
                username={member.username}
                gender={member.gender}
                size={58}
                bgColor={getRandomColor(member.username, member.gender)}
              />
            </Link>
          ))}
        </Avatar.Group>

        <Tag
          bordered={false}
          color="success"
          className="w-fit rounded-full text-base"
        >
          -{rest} <span className="ml-1">Members</span>
        </Tag>

        <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row justify-between gap-4">
          <div className="flex flex-col items-start gap-[.35rem]">
            <span className="flex justify-center items-center gap-1 md:gap-2 text-gray-500">
              <CalendarOutlined className="text-sm" />
              <p className="text-xs">
                {new Date(date).toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </span>
            <span className="flex justify-center items-center gap-1 md:gap-2 text-gray-500">
              <EnvironmentOutlined className="text-sm" />
              <p className="text-xs capitalize">{city}</p>
            </span>
          </div>
          {isMember ? (
            <Link to={`/team/${teamId}`} className="self-end">
              <Button
                type="primary"
                shape="round"
                size="large"
                className="w-fit  !bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
                icon={<ArrowRightOutlined size={16} />}
                iconPosition="end"
              >
                View
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleJoinClick}
              type="primary"
              shape="round"
              size="large"
              className="w-fit self-end !bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
              icon={<UserAddOutlined size={16} />}
            >
              Join
            </Button>
          )}
        </div>
      </Card>
    </>
  );
}

TeamCard.propTypes = {
  teamId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  city: PropTypes.string,
  date: PropTypes.string,
  members: PropTypes.array.isRequired,
  rest: PropTypes.number,
  sport: PropTypes.string,
  isMember: PropTypes.bool,
};
