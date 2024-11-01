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
} from "@ant-design/icons";
import { Avatar, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function TeamCard({
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

  // Handle button click without triggering the link navigation
  const handleInviteClick = (e) => {
    e.stopPropagation(); // Prevent link from being triggered
    e.preventDefault(); // Prevent default link behavior
    console.log("Invite button clicked!");
  };

  return (
    <Card className="h-full rounded-2xl p-5 flex flex-col gap-5">
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

      <div className="flex md:flex-col xl:flex-row justify-between  gap-4 ">
        <div className="flex flex-col  items-start gap-[.35rem]">
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
        <Button
          disabled={isMember}
          onClick={handleInviteClick}
          type="primary"
          shape="round"
          size="large"
          className="w-fit self-end !bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
          icon={<UserAddOutlined size={16} />}
        >
          {isMember ? "Member" : "Join"}
        </Button>
      </div>
    </Card>
  );
}

TeamCard.propTypes = {
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  description: PropTypes.string,
  city: PropTypes.string,
  date: PropTypes.string,
  members: PropTypes.array,
  rest: PropTypes.number,
  sport: PropTypes.arrayOf(PropTypes.string),
  isMember: PropTypes.bool,
};
