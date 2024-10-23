import { message, Spin } from "antd";
import { useState } from "react";
import EmptyData from "../../../../components/static/EmptyData";
import NotificationCard from "./NotificationCard";

export default function NotificationsList({ hide }) {
  const [isLoading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const notifications = [
    {
      city: "casablanca",
      date: "Mon, 21 Oct 2024 00:00:00 GMT",
      invite_id: 6,
      owner: { username: "sakawa", gender: "female" },
      sport: "Surfing",
      team_id: 28,
      team_name: "test team",
    },
    {
      city: "casablanca",
      date: "Mon, 21 Oct 2024 00:00:00 GMT",
      invite_id: 6,
      owner: { username: "sakawa", gender: "female" },
      sport: "Surfing",
      team_id: 28,
      team_name: "test team",
    },
    {
      city: "casablanca",
      date: "Mon, 21 Oct 2024 00:00:00 GMT",
      invite_id: 6,
      owner: { username: "sakawa", gender: "female" },
      sport: "Surfing",
      team_id: 28,
      team_name: "test team",
    },
  ];
  const notificationsList = notifications.length > 0 && (
    <div className="flex flex-col gap-4">
      {notifications.map((user, index) => (
        <NotificationCard
          key={index}
          teamName={user.team_name}
          sport={user.sport}
          owner={user.owner}
          inviteId={user.invite_id}
          city={user.city}
          date={user.date}
          hide={hide}
        />
      ))}
    </div>
  );
  return (
    <>
      {contextHolder}

      <div className="p-1 sm:p-2">
        {isLoading && <Spin size="small" className="white-spin" />}
        {notifications.length === 0 ? (
          <EmptyData
            text="You don't have any notification"
            className="!h-fit"
          />
        ) : (
          notificationsList
        )}
      </div>
    </>
  );
}
