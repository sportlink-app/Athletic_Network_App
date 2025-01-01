import axios from "axios";
import { create } from "zustand";
import authStore from "../user/authStore";

const upcomingStore = create((set) => ({
  teams: {}, // Store data for each filter separately

  fetchUpcoming: async (filter) => {
    try {
      const response = await axios.get(`/upcoming?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });

      const { teams } = response.data;
      set((state) => ({
        teams: {
          ...state.teams,
          [filter]: teams, // Maintain data for each filter
        },
      }));
    } catch (error) {
      throw new Error(error);
    }
  },

  // Fetch countdown for the nearest team
  fetchCountdown: async () => {
    try {
      const response = await axios.get("/countdown", {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });

      const { countdown, id, name } = response.data;
      const countdownData = { countdown, id, name };

      // Store the countdown data
      set({ countdown: countdownData });
    } catch (error) {
      throw new Error(error);
    }
  },
}));

export default upcomingStore;
