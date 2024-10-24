import { useState, useEffect } from "react";
import { Badge, Button, Popover, message, Spin } from "antd";
import { BellOutlined } from "@ant-design/icons";
import NotificationsList from "./notifications-list";
import { io } from "socket.io-client";
import notificationStore from "../../../store/notificationStore";
import authStore from "../../../store/user/authStore";

export default function NotificationBadge() {
  const { count, getUnreadCount, getNotifications } = notificationStore();
  const { authenticatedId } = authStore();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(count);
  const [isLoading, setIsLoading] = useState(false); // State for loading notifications
  const [messageApi, contextHolder] = message.useMessage();

  // Handle popover open/close state
  const hide = () => setOpen(false);
  const handleOpenChange = async (newOpen) => {
    setOpen(newOpen);

    // Fetch notifications when the popover is opened
    if (newOpen) {
      try {
        setIsLoading(true);
        await getNotifications();
      } catch (error) {
        messageApi.error("Failed to load notifications.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fetch initial unread count when the component mounts
  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        await getUnreadCount();
        setUnreadCount(count); // Ensure unreadCount is set based on the fetched count
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchInitialCount();
  }, [count, getUnreadCount]);

  // Establish socket connection once authenticatedId is available
  useEffect(() => {
    if (authenticatedId) {
      const newSocket = io("http://localhost:5001", {
        transports: ["websocket"],
        query: { user_id: authenticatedId },
      });

      // Listen for unread notifications count updates from the server
      newSocket.on("unread_notifications_count", (data) => {
        setUnreadCount(data.count);
      });

      // Clean up the listener and disconnect socket when the component unmounts
      return () => {
        newSocket.off("unread_notifications_count");
        newSocket.disconnect();
      };
    }
  }, [authenticatedId]);

  // Disable body scroll when popover is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Clean up on unmount or when popover closes
    };
  }, [open]);

  return (
    <>
      {contextHolder}
      <Popover
        title="Your notifications"
        content={
          <div className="p-1 sm:p-2 w-80 md:w-96 min-h-32 max-h-96 overflow-y-auto flex justify-center items-center">
            {isLoading ? (
              <Spin size="large" className="green-spin" />
            ) : (
              <NotificationsList hide={hide} />
            )}
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Badge count={unreadCount} offset={[0, 6]}>
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
