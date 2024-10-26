// notificationStore.js
import { create } from "zustand";
import axios from "axios";
import authStore from "./user/authStore";

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = authStore.getState().token;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const notificationStore = create((set) => ({
  count: 0,
  notifications: [],

  initializeCount: (newCount = 0) => {
    set({ count: newCount });
  },

  getUnreadCount: async () => {
    try {
      const response = await axios.get("/notifications/count", {
        headers: getAuthHeaders(),
      });
      set({ count: response.data.unread_count });
      await notificationStore.getState().getNotifications(); // Fetch notifications after count update
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  },

  setCount: async (newCount) => {
    set({ count: newCount });
    await notificationStore.getState().getNotifications(); // Fetch notifications when count is set
  },

  getNotifications: async () => {
    try {
      const response = await axios.get("/notifications", {
        headers: getAuthHeaders(),
      });
      set({ notifications: response.data });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },

  deleteNotification: async (id) => {
    try {
      await axios.delete(`/notification/${id}`, {
        headers: getAuthHeaders(),
      });

      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id
        ),
      }));
    } catch (error) {
      throw new Error("Failed to delete notification");
    }
  },

  markNotificationAsRead: async () => {
    try {
      await axios.put(`/notifications/mark-as-read`, null, {
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.log(error);
    }
  },

  notification: null,
  getNotification: async (id) => {
    try {
      const response = await axios.get(`/notification/${id}`, {
        headers: getAuthHeaders(),
      });
      set({ notification: response.data });
    } catch (error) {
      console.error("Failed to get notification details:", error);
      throw new Error("Failed to get notification details");
    }
  },
}));

export default notificationStore;
