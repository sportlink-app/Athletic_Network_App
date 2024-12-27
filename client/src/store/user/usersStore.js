import { create } from "zustand";
import axios from "axios";
import authStore from "./authStore";

const usersStore = create((set) => ({
  id: "",
  username: "",
  gender: "",
  bio: "",
  sports: [],
  city: "",
  email: "",
  tel: "",

  // Fetch user data based on username
  getUser: async (username) => {
    try {
      const response = await axios.get(`/user/${username}`, {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });

      const {
        id,
        username: fetchedUsername,
        gender,
        bio,
        sports,
        city,
      } = response.data;

      // Set user data in the store
      set({
        id,
        username: fetchedUsername,
        gender,
        bio,
        sports,
        city,
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error("An unexpected error occurred, please try again later");
      }
    }
  },

  users: [],
  totalUsers: 0,
  currentPage: 1,
  perPage: 12,
  searchedUsername: "",

  // Fetch user data with pagination and username filter
  fetchUsers: async (teamId, page = 1, perPage = 12, username = "") => {
    try {
      const response = await axios.get(
        `/users?team_id=${teamId}&page=${page}&per_page=${perPage}&username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { total_items, items } = response.data;

      set({
        users: items,
        totalUsers: total_items,
        currentPage: page,
        perPage: perPage,
        searchedUsername: username,
      });
    } catch (error) {
      throw new Error(error.status);
    }
  },
}));

export default usersStore;
