import axios from "axios";
import { create } from "zustand";
import authStore from "../user/authStore";
import notificationStore from "../notificationStore";

const teamStore = create((set) => ({
  teamInvite: async (teamId, userId) => {
    try {
      await axios.post(
        `/team/invite?team_id=${teamId}`,
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("User has already been invited");
      } else {
        throw new Error(
          "Failed to invite user, please refresh the page or try again later"
        );
      }
    }
  },
  inviteRespond: async (referenceId, action) => {
    try {
      await axios.post(
        `/team/invite/response?reference_id=${referenceId}`,
        { action: action },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await notificationStore.getState().getNotifications();
    } catch (error) {
      throw new Error(error.status);
    }
  },

  teamJoin: async (teamId) => {
    try {
      await axios.post(
        `/team/join?team_id=${teamId}`,
        {}, // Leave data empty if there's no payload
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 400) {
        throw new Error("Join request already sent and is pending");
      } else if (error.response && error.response.status === 401) {
        throw new Error("You are already a member of this team");
      } else {
        throw new Error(
          "Failed to invite user, please refresh the page or try again later"
        );
      }
    }
  },

  joinRespond: async (referenceId, action) => {
    try {
      await axios.post(
        `/team/join/response?reference_id=${referenceId}`,
        { action: action },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await notificationStore.getState().getNotifications();
    } catch (error) {
      console.log(error);
    }
  },

  teams: [],
  totalTeams: 0,
  currentPage: 1,
  perPage: 9,
  searchedSport: "",

  fetchTeams: async (page = 1, perPage = 9, sport = "", sortBy = "date") => {
    try {
      const response = await axios.get(
        `/teams?page=${page}&per_page=${perPage}&sport=${sport}&sort_by=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { total_teams, teams } = response.data;
      set({
        teams,
        totalTeams: total_teams,
        currentPage: page,
        perPage,
        searchedSport: sport,
      });
    } catch (error) {
      throw new Error(error.response ? error.response.status : "Network Error");
    }
  },
  setSportFilter: (sport) => set({ searchedSport: sport }),
}));

export default teamStore;
