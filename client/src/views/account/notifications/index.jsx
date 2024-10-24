import { Button, message, Spin } from "antd";
import { useState } from "react";
import ProfileAvatar from "../../../components/dynamic/Avatar";
import { getRandomColor } from "../../../components/utils/randomColor";
import { Link, useParams } from "react-router-dom";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Tags from "../../../components/static/Tags";
import Footer from "../../../components/static/Footer";

export default function Notifications() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false);

  const city = "casablanca";
  const date = "Mon, 21 Oct 2024 00:00:00 GMT";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, nesciunt! Dolorem, rerum. Quas sit maxime inventore necessitatibus ut harum iusto eum exercitationem ducimus nisi, corporis atque recusandae voluptatum explicabo cum.";
  // const invite_id = 6;
  const owner = { username: "sakawa", gender: "female" };
  const members = [
    { username: "sakawa", availability: true, gender: "female" },
    { username: "sabaka", availability: true, gender: "female" },
    { username: "samaka", availability: false, gender: "male" },
  ];
  const sport = "Surfing";
  // const team_id = 28;
  const team_name = "test team";

  return (
    <>
      {contextHolder}
      <div className="min-h-screen container mx-auto px-4 my-10">
        <div className="w-full mx-auto">
          {isLoading ? (
            <Spin size="small" className="green-spin" />
          ) : (
            <div className="w-full mx-auto p-5 flex flex-col gap-4 lg:gap-5">
              <div className="w-full flex flex-col md:flex-row-reverse gap-5 justify-between">
                <div className="flex gap-2 md:gap-4 self-end">
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="!bg-red-500 disabled:bg-red-500 hover:!bg-red-500 hover:brightness-105 w-fit"
                    icon={<CloseOutlined size={16} />}
                  >
                    Reject
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="!bg-green disabled:bg-green hover:!bg-green hover:brightness-105 w-fit"
                    icon={<CheckOutlined size={16} />}
                  >
                    Accept
                  </Button>
                </div>
                <h3 className="text-lg xl:text-2xl font-medium text-gray-900 capitalize">
                  {team_name} by {owner.username} {id}
                </h3>
              </div>
              <Tags list={sport} className="py-1 px-4 text-sm" />

              <p className="text-base text-gray-600 sm:max-w-lg lg:max-w-2xl">
                {description}
              </p>

              <div className="flex flex-wrap items-end gap-4 lg:gap-5">
                {members.map((member) => (
                  <Link
                    to={`/explore/${member.username}`}
                    key={member.username}
                    className={`${
                      member.username === owner.username
                        ? "h-[80px]"
                        : " h-[58px]"
                    }`}
                  >
                    <ProfileAvatar
                      username={member.username}
                      gender={member.gender}
                      size={member.username === owner.username ? 80 : 58}
                      dot={member.username !== owner.username}
                      count={"Owner"}
                      color={member.availability ? "green" : "red"}
                      offset={
                        member.username === owner.username
                          ? [-16, 68]
                          : [-8, 46]
                      }
                      bgColor={getRandomColor(member.username, member.gender)}
                    />
                  </Link>
                ))}
              </div>

              <div className="flex items-start flex-col md:flex-row gap-4 lg:gap-8 xl:gap-10 mt-4">
                <span className="flex justify-center items-center gap-2 text-gray-500">
                  <CalendarOutlined className="text-lg" />
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
                <span className="flex justify-center items-center gap-2 text-gray-500">
                  <EnvironmentOutlined className="text-lg" />
                  <p className="text-base  capitalize">{city}</p>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
