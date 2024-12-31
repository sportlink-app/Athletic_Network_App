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
        {},
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      throw new Error(error.status);
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
      throw new Error(error.status);
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

  name: "",
  createdAt: "",
  sport: "",
  description: "",
  date: "",
  city: "",
  location: "",
  isCompleted: false,
  isMember: false,
  members: [],
  owner: {},
  rest: "",
  isRequested: false,
  isDateDeprecated: false,

  setTeamData: (data) => set({ ...data }), // Method to set team data

  getTeam: async (id) => {
    try {
      const response = await axios.get(`/team?team_id=${id}`, {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });

      const teamData = response.data;

      return {
        name: teamData.name,
        createdAt: teamData.created_at,
        sport: teamData.sport_name,
        description: teamData.description,
        date: teamData.date,
        city: teamData.city,
        location: teamData.location,
        isCompleted: teamData.is_completed,
        isMember: teamData.is_member,
        members: teamData.members,
        owner: teamData.owner,
        rest: teamData.rest,
        isRequested: teamData.is_requested,
        isDateDeprecated: teamData.is_date_deprecated,
      };
    } catch (error) {
      throw new Error(error.response ? error.response.status : error.message);
    }
  },
}));

export default teamStore;
