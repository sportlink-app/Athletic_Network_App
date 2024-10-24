import { create } from "zustand";
import axios from "axios";
import authStore from "./user/authStore";

const notificationStore = create((set) => ({
  count: 0,

  getUnreadCount: async () => {
    try {
      const response = await axios.get("/notifications/count", {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });
      set({ count: response.data.unread_count });
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  },

  notifications: [],

  getNotifications: async () => {
    try {
      const response = await axios.get("/notifications", {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });
      set({ notifications: response.data });
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  },
}));

export default notificationStore;
