import { Avatar, Button, Divider, Spin, Tag, Tooltip } from "antd";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import Tags from "../../../../../components/static/Tags";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../../../components/static/Footer";
import ProfileAvatar from "../../../../../components/dynamic/Avatar";
import {
  getRandomColor,
  lightenColor,
} from "../../../../../components/utils/randomColor";
import timeAgo from "../../../../../components/utils/timeAgo";
import Text from "../../../../../components/static/Text";

export default function Team() {
  const { teamId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [team, setTeam] = useState("null");
  //   const formattedDate = createdAt
  //     ? formatDistanceToNow(parseISO(createdAt), { addSuffix: true })
  //     : "Date not available";

  const members = [
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
    {
      username: "ssss",
      gender: "male",
    },
  ];

  const avatarGroupRandomColor = getRandomColor(name);

  const avatarGroupBgColor = lightenColor(avatarGroupRandomColor, 5);

  const locationAddress =
    "Aïn Sebaâ, Préfecture d'arrondissements d'Aïn Sebaâ-Hay Mohammadi عمالة مقاطعات عين السبع الحي المحمدي, Casablanca, Pachalik de Casablanca باشوية الدار البيضاء, Prefecture of Casablanca, Morocco";

  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(
    locationAddress
  )}`;

  return (
    <>
      <div className="min-h-screen container mx-auto px-4 my-10">
        {isLoading ? (
          <div className="w-full h-[70vh] flex justify-center items-center">
            <Spin size="large" className="green-spin mx-auto my-20" />
          </div>
        ) : team ? (
          <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:justify-between ">
              <div className="flex flex-col gap-2">
                <Text
                  type="title"
                  text={team.title || "Title not available"}
                  className="mb-2"
                />
                <span className="flex items-center gap-2 text-gray-500">
                  <CarryOutOutlined className="text-sm pb-1 " />
                  <p className="text-base ">Created {timeAgo("joinedAt")}</p>
                </span>
              </div>
              <Tag
                // bordered={false}
                color="success"
                className="w-fit rounded-full text-base py-1 md:py-2 px-3 md:px-4 self-end lg:self-start"
              >
                <CheckCircleOutlined />
                <span className="ml-1">Team is Completed</span>
              </Tag>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="w-full lg:w-1/2 flex flex-col gap-2 xl:gap-3 ">
                <Tags list={["Sport"]} className="py-1 px-4 text-sm mb-2" />
                <p className="text-base text-gray-600 sm:max-w-lg lg:max-w-2xl">
                  {/* {team.description || "Description not available"} */}
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus consectetur commodi, consequuntur veritatis
                  necessitatibus et obcaecati corrupti! Dolores aliquid illum
                  voluptate eaque distinctio eligendi ipsum consectetur ex eius.
                  Eum, pariatur!
                </p>
                <div className="mt-4 flex lg:flex-col gap-8 lg:gap-2">
                  <span className="flex items-center gap-2 text-gray-500">
                    <CalendarOutlined className="text-sm pb-1 pb-1" />
                    <p className="text-base">
                      {team.date
                        ? new Date(team.date).toLocaleString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Date not available"}
                    </p>
                  </span>
                  <span className="flex items-center gap-2 text-gray-500">
                    <EnvironmentOutlined className="text-sm pb-1 pb-1" />
                    <p className="text-base capitalize">
                      {team.city || "City not available"}
                    </p>
                  </span>
                </div>

                <Link to={`/team/${teamId}`} className="mt-2">
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="!bg-cyan hover:!bg-cyan hover:brightness-105 w-fit"
                    icon={<ArrowRightOutlined />}
                  >
                    View Location
                  </Button>
                </Link>
              </div>
              <Divider
                type="vertical"
                className="h-64 border-gray-200 hidden lg:block mx-4 xl:mx-8
              "
              />
              <div className="w-full lg:w-1/2 flex flex-col gap-2 xl:gap-3 mt-4 lg:mt-0 ">
                <span className="flex items-center gap-2 text-gray-500">
                  <TeamOutlined className="text-sm pb-1" />
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
                      >
                        <ProfileAvatar
                          username={member.username}
                          gender={member.gender}
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
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-600">Team details not found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
