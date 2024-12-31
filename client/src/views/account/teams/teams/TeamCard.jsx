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
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, message, Tag } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import userInfoStore from "../../../../store/user/userInfoStore";
import teamStore from "../../../../store/team/teamStore";
import { useState } from "react";

export default function TeamCard({
  teamId,
  name,
  sport,
  members,
  rest,
  city,
  date,
  isMember,
  isRequested,
  onJoinSuccess,
}) {
  const avatarGroupRandomColor = getRandomColor(name);
  const avatarGroupColor = darkenColor(avatarGroupRandomColor, 30);
  const avatarGroupBgColor = lightenColor(avatarGroupRandomColor, 5);

  const [messageApi, contextHolder] = message.useMessage();
  const availability = userInfoStore((state) => state.availability);

  const { teamJoin } = teamStore();

  const [isLoading, setLoading] = useState(false);

  // Handle button click without triggering the link navigation
  const handleJoinClick = async (e) => {
    e.stopPropagation(); // Prevent link from being triggered
    e.preventDefault(); // Prevent default link behavior
    if (!availability) {
      messageApi.open({
        type: "warning",
        content:
          "You must be available to join a team. Please update your availability in your profile.",
        duration: 5,
      });
    } else {
      setLoading(true);
      try {
        await teamJoin(teamId);
        messageApi.success("Join request sent!");
        onJoinSuccess(teamId);
      } catch (error) {
        if (error.message === "400") {
          messageApi.error("Join request already sent and is pending");
        } else if (error.message === "401") {
          messageApi.warning("The team is already completed");
        } else {
          messageApi.error(
            "Failed to join team, please refresh the page or try again later"
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Link
        to={`/team/${teamId}`}
        className="cursor-pointer hover:scale-[1.01] duration-500 hover:shadow-sm rounded-2xl"
      >
        <Card className="h-full rounded-2xl p-5 lg:p-6 flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <h3 className="text-base xl:text-lg font-medium text-gray-900 capitalize">
              {name}
            </h3>
            <Tags list={[sport]} />
          </div>
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
          {rest && (
            <Tag
              bordered={false}
              color="success"
              className="w-fit rounded-full text-base"
            >
              -{rest} <span className="ml-1">Members</span>
            </Tag>
          )}

          <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row justify-between gap-4">
            <div className="flex flex-col items-start gap-[.35rem]">
              <span className="flex justify-center items-center gap-1 md:gap-2 text-gray-500">
                <CalendarOutlined className="text-sm" />
                <p className="text-xs">
                  {new Date(date).toLocaleString(undefined, {
                    month: "short", // Abbreviated month (e.g., "Dec")
                    day: "numeric", // Day of the month (e.g., "17")
                    year: "numeric", // Year (e.g., "2024")
                    hour: "2-digit", // Hour in 12-hour format
                    minute: "2-digit", // Minute with leading zero if necessary
                    hour12: true, // 12-hour clock format (with AM/PM)
                  })}
                </p>
              </span>
              <span className="flex justify-center items-center gap-1 md:gap-2 text-gray-500">
                <EnvironmentOutlined className="text-sm" />
                <p className="text-xs capitalize">{city}</p>
              </span>
            </div>
            {!isMember && (
              <Button
                onClick={handleJoinClick}
                disabled={isRequested || isLoading}
                type="primary"
                shape="round"
                size="large"
                className="w-fit self-end !bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
                icon={
                  !isRequested ? (
                    <UserAddOutlined size={16} />
                  ) : (
                    <ClockCircleOutlined size={16} />
                  )
                }
              >
                {isRequested ? "Requested" : "Join"}
              </Button>
            )}
          </div>
        </Card>
      </Link>
    </>
  );
}

TeamCard.propTypes = {
  teamId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  date: PropTypes.string,
  members: PropTypes.array.isRequired,
  rest: PropTypes.number,
  sport: PropTypes.string,
  isMember: PropTypes.bool,
  isRequested: PropTypes.bool,
  onJoinSuccess: PropTypes.func,
};
