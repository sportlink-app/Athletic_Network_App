import { useState, useEffect, useCallback } from "react";
import { Badge, Button, Popover, message, Spin } from "antd";
import { BellOutlined } from "@ant-design/icons";
import NotificationsList from "./notifications-list";
import { io } from "socket.io-client";
import notificationStore from "../../../store/notificationStore";
import authStore from "../../../store/user/authStore";

export default function NotificationBadge() {
  const {
    count,
    getUnreadCount,
    setCount,
    getNotifications,
    markNotificationAsRead,
  } = notificationStore();
  const { authenticatedId } = authStore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCountUpdate = useCallback(
    async (newCount) => {
      await setCount(newCount);
    },
    [setCount]
  );

  useEffect(() => {
    if (authenticatedId) {
      // Fetch unread count on login
      getUnreadCount();

      const socket = io(import.meta.env.VITE_SERVER_URL, {
        transports: ["websocket"],
        query: { user_id: authenticatedId },
      });

      socket.on("unread_notifications_count", (data) => {
        handleCountUpdate(data.count);
      });

      // Fetch notifications when the badge is opened
      socket.on("new_notification", () => {
        getUnreadCount(); // Update count whenever a new notification is received
      });

      return () => {
        socket.off("unread_notifications_count");
        socket.off("new_notification"); // Clean up the listener
        socket.disconnect();
      };
    }
  }, [authenticatedId, handleCountUpdate, getUnreadCount]);

  const handleOpenChange = async (newOpen) => {
    setOpen(newOpen);

    if (newOpen) {
      setIsLoading(true);
      try {
        await getNotifications();
        await markNotificationAsRead();
      } catch (error) {
        messageApi.error("Failed to load notifications.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Popover
        title="Your notifications"
        content={
          <div className="p-1 sm:p-2 w-80 md:w-96 h-80 overflow-y-auto flex justify-center">
            {isLoading ? (
              <Spin size="large" className="green-spin my-6" />
            ) : (
              <NotificationsList hide={() => setOpen(false)} />
            )}
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Badge count={count} offset={[0, 6]}>
          <Button
            type="primary"
            shape="circle"
            icon={<BellOutlined />}
            size="large"
            className="!bg-white/20 hover:!bg-white/30"
          />
        </Badge>
      </Popover>
    </>
  );
}
