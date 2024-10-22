import { message, Spin } from "antd";
import { useState } from "react";
import EmptyData from "../../../../components/static/EmptyData";
import NotificationCard from "./Notification";
import Notification from "./Notification";

export default function NotificationsList() {
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const notifications = [
    {
      city: "casablanca",
      date: "Mon, 21 Oct 2024 00:00:00 GMT",
      description:
        "       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, nesciunt! Dolorem, rerum. Quas sit maxime inventore necessitatibus ut harum iusto eum exercitationem ducimus nisi, corporis atque recusandae voluptatum explicabo cum.",
      invite_id: 6,
      owner_id: 60,
      owner: { username: "sakawa", gender: "female" },
      members: [
        { username: "sakawa", availability: true, gender: "female" },
        { username: "safaka", availability: false, gender: "male" },
        { username: "sabaka", availability: true, gender: "female" },
        { username: "samaka", availability: false, gender: "male" },
        { username: "salaka", availability: false, gender: "female" },
        { username: "safaka", availability: false, gender: "male" },
        { username: "sabaka", availability: true, gender: "female" },
        { username: "samaka", availability: false, gender: "male" },
        { username: "salaka", availability: true, gender: "female" },
        { username: "safaka", availability: false, gender: "male" },
        { username: "sabaka", availability: true, gender: "female" },
      ],
      sport: "Surfing",
      team_id: 28,
      team_name: "test team",
    },
  ];
  const notificationsList = notifications.length > 0 && (
    <div className="flex flex-col gap-4">
      {notifications.map((user, index) => (
        <Notification
          key={index}
          teamName={user.team_name}
          description={user.description}
          sport={user.sport}
          owner={user.owner}
          members={user.members}
          inviteId={user.invite_id}
          city={user.city}
          date={user.date}
        />
      ))}
    </div>
  );
  return (
    <>
      {contextHolder}
      <div className="min-h-screen container mx-auto px-4 my-10">
        <div className="w-full sm:max-w-lg md:max-w-xl lg:md:max-w-2xl mx-auto">
          {isLoading && <Spin size="small" className="white-spin" />}
          {!isLoading && isDataFetched && notifications.length === 0 ? (
            <EmptyData text="You don't have any notification" />
          ) : (
            notificationsList
          )}
        </div>
      </div>
    </>
  );
}
