import EmptyData from "../../../../components/static/EmptyData";
import NotificationCard from "./NotificationCard";
import notificationStore from "../../../../store/notificationStore";
import PropTypes from "prop-types";

export default function NotificationsList({ hide }) {
  const { notifications } = notificationStore();

  const notificationsList = notifications.length > 0 && (
    <div className="flex flex-col gap-4">
      {notifications.map((notification, index) => (
        <NotificationCard
          key={index}
          id={notification.id}
          isVisited={notification.is_visited}
          type={notification.type}
          teamName={notification.team_name}
          createdAt={notification.created_at}
          sender={notification.sender}
          referenceId={notification.reference_id}
          hide={hide}
        />
      ))}
    </div>
  );

  return (
    <>
      {notifications.length === 0 ? (
        <EmptyData
          text="You don't have any notifications"
          className="!h-fit my-8"
        />
      ) : (
        notificationsList
      )}
    </>
  );
}

NotificationsList.propTypes = {
  hide: PropTypes.func,
};
