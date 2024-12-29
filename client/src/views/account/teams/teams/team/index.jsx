import { Avatar, Button, Divider, Spin, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  EnvironmentOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  UserOutlined,
  UserAddOutlined,
  ScheduleOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../../../components/static/Footer";
import ProfileAvatar from "../../../../../components/dynamic/Avatar";
import {
  getRandomColor,
  lightenColor,
} from "../../../../../components/utils/randomColor";
import timeAgo from "../../../../../components/utils/timeAgo";
import Text from "../../../../../components/static/Text";
import teamStore from "../../../../../store/team/teamStore";
import BackButton from "../../../../../components/static/BackButton";
import ContactsModal from "./ContactsModal";
import Tags from "../../../../../components/static/Tags";

export default function Team() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [isJoinLoading, setJoinLoading] = useState(false);

  const {
    name,
    createdAt,
    sport,
    description,
    date,
    city,
    location,
    isCompleted,
    isMember,
    members,
    owner,
    rest,
    isRequested,
    setTeamData,
  } = teamStore((state) => ({
    name: state.name,
    createdAt: state.createdAt,
    sport: state.sport,
    description: state.description,
    date: state.date,
    city: state.city,
    location: state.location,
    isCompleted: state.isCompleted,
    isMember: state.isMember,
    members: state.members,
    owner: state.owner,
    rest: state.rest,
    isRequested: state.isRequested,
    setTeamData: state.setTeamData,
  }));

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const teamData = await teamStore.getState().getTeam(teamId); // Call the store's `getTeam` method
        setTeamData(teamData); // Update the store with fetched data
      } catch (error) {
        console.error("Error fetching team data:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId, navigate, setTeamData]);

  const avatarGroupRandomColor = getRandomColor(name);
  const avatarGroupBgColor = lightenColor(avatarGroupRandomColor, 5);

  return (
    <>
      <div className="min-h-screen container mx-auto px-4 my-10">
        {isLoading ? (
          <div className="w-full h-[70vh] flex justify-center items-center">
            <Spin size="large" className="green-spin mx-auto my-20" />
          </div>
        ) : (
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex justify-between gap-4">
              <BackButton />
              {isCompleted ? (
                <Tag
                  bordered={false}
                  color="success"
                  className="w-fit rounded-full text-base py-1 md:py-2 px-3 md:px-4"
                >
                  <CheckCircleOutlined />
                  <span className="ml-1">Team is Completed</span>
                </Tag>
              ) : (
                <Button
                  disabled={isRequested || isMember || isJoinLoading}
                  type="primary"
                  shape="round"
                  size="large"
                  className="w-fit self-end !bg-green disabled:bg-green hover:!bg-green hover:brightness-105"
                  icon={
                    isRequested ? (
                      <ClockCircleOutlined size={16} />
                    ) : (
                      <UserAddOutlined size={16} />
                    )
                  }
                >
                  {isRequested && "Requested"}
                  {isMember && "Member"}
                  {!isRequested && !isMember && "Join Team"}
                </Button>
              )}
            </div>

            {/* Main Team Details */}
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="w-full lg:w-1/2 flex flex-col gap-2 xl:gap-3">
                <Text type="title" text={name} className="mb-2" />
                <span className="flex items-center gap-2 text-gray-500">
                  <CarryOutOutlined className="text-sm pb-[.15rem]" />
                  <p className="text-base">Created {timeAgo(createdAt)}</p>
                </span>
                <Tags list={[sport]} className="py-1 px-4 text-sm mb-2" />
                <p className="text-base text-gray-600 sm:max-w-lg lg:max-w-2xl">
                  {description}
                </p>
                <div className="mt-4 flex lg:flex-col gap-8 lg:gap-2">
                  <span className="flex items-center gap-2 text-gray-500">
                    <ScheduleOutlined className="text-base pb-[.15rem]" />
                    <p className="text-base">
                      {new Date(date).toLocaleString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </span>
                  <span className="flex items-center gap-2 text-gray-500">
                    <EnvironmentOutlined className="text-sm pb-[.15rem]" />
                    <p className="text-base capitalize">{city}</p>
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="!bg-cyan hover:!bg-cyan hover:brightness-105 w-fit"
                    icon={<ArrowRightOutlined />}
                  >
                    View Location
                  </Button>
                </a>
              </div>

              {/* Team Members */}
              <Divider
                type="vertical"
                className="h-64 border-gray-200 hidden lg:block mx-4 xl:mx-8"
              />
              <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-col gap-4 xl:gap-6 mt-4 lg:mt-0">
                {isCompleted && isMember && <ContactsModal />}
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-gray-500">
                    <UserOutlined className="text-[.8rem] pb-1" />
                    <p className="text-base capitalize">Owner</p>
                  </span>
                  <Tooltip
                    title={owner.username}
                    color="#00e8ba"
                    className="w-fit"
                  >
                    <Link
                      to={`/user/${owner.username}`}
                      className="w-fit cursor-pointer leading-[.5rem]"
                    >
                      <ProfileAvatar
                        username={owner.username || "undefined"}
                        gender={owner.gender || "undefined"}
                        size={58}
                        bgColor={getRandomColor(owner.username, owner.gender)}
                      />
                    </Link>
                  </Tooltip>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-gray-500">
                    <TeamOutlined className="text-sm pb-[.15rem]" />
                    <p className="text-base capitalize">Members</p>
                  </span>
                  <Avatar.Group
                    className="mt-2 lg:max-w-lg 2xl:max-w-xl flex-wrap gap-y-2"
                    max={{
                      count: 22,
                      style: {
                        color: `${avatarGroupBgColor}`,
                        backgroundColor: `${avatarGroupBgColor}`,
                        height: "58px",
                        width: "58px",
                        maxWidth: "200px",
                      },
                    }}
                  >
                    {members.map((member) => (
                      <Tooltip
                        title={member.username}
                        color="#00e8ba"
                        key={member.username}
                      >
                        <Link
                          to={`/user/${member.username}`}
                          key={member.username}
                          className="w-fit cursor-pointer leading-[.5rem]"
                        >
                          <ProfileAvatar
                            username={member.username || "undefined"}
                            gender={member.gender || "undefined"}
                            size={58}
                            bgColor={getRandomColor(
                              member.username,
                              member.gender
                            )}
                          />
                        </Link>
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </div>
                {!isCompleted && (
                  <Tag
                    bordered={false}
                    color="success"
                    className="w-fit rounded-full text-base py-1 md:py-2 px-3 md:px-4"
                  >
                    <span className="ml-1">- {rest} Members</span>
                  </Tag>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
