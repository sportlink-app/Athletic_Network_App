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

  teamId: "",
  name: "Power Rangers",
  createdAt: "Sat, 28 Dec 2024 01:01:14 GMT",
  sport: "Basketball",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit voluptatibus ipsam mollitia adipisci repellendus aspernatur dolorem. Quas velit deleniti amet neque vero, quam, eos iure assumenda tempore molestiae, ipsa ab.",
  date: "Sun, 29 Dec 2024 23:00:00 GMT",
  city: "casablanca",
  location:
    "Aïn Sebaâ, Préfecture d'arrondissements d'Aïn Sebaâ-Hay Mohammadi عمالة مقاطعات عين السبع الحي المحمدي, Casablanca, Pachalik de Casablanca باشوية الدار البيضاء, Prefecture of Casablanca, Morocco",
  isCompleted: false,
  isMember: true,
  members: [
    {
      gender: "male",
      username: "seifAz",
    },
    {
      gender: "female",
      username: "seifAza",
    },
    {
      gender: "male",
      username: "seifAzaa",
    },
  ],
  owner: {
    gender: "male",
    username: "seifAz",
  },
  membersCount: 2,

  // teamId: "",
  // name: "",
  // createdAt: "",
  // sport: "",
  // description: "",
  // date: "",
  // city: "",
  // location: "",
  // isCompleted: "",
  // isMember: "",
  // members: [],
  // owner: {},
  // membersCount: "",

  // Get team data based on id
  getTeam: async (id) => {
    try {
      const response = await axios.get(`/team?team_id=${id}`, {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.status);
    }
  },
}));

export default teamStore;
