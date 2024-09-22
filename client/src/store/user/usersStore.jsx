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
      const response = await axios.get(`/users/${username}`, {
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
  selectedSport: "", // Added to track sport filter

  // Fetch user data with pagination and sport filter
  fetchUsers: async (page = 1, perPage = 12, sport = "") => {
    try {
      const response = await axios.get(
        `/users?page=${page}&per_page=${perPage}&sport=${sport}`,
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
        selectedSport: sport, // Update selected sport
      });
    } catch (error) {
      console.error("Error fetching users:", error); // Added for debugging
      throw new Error(
        error.response?.status === 404
          ? "Users not found"
          : "An unexpected error occurred"
      );
    }
  },
}));

export default usersStore;
