import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import authStore from "./authStore";

const userInfoStore = create(
  persist(
    (set) => ({
      username: "",
      gender: "",
      bio: "",
      sports: [],
      email: "",
      city: "",
      tel: "",
      availability: null,

      getProfile: async () => {
        try {
          const response = await axios.get("/profile", {
            headers: {
              Authorization: `Bearer ${authStore.getState().token}`,
              "Content-Type": "application/json",
            },
          });
          set({ ...response.data });
        } catch (error) {
          console.error("Error in getProfile:", error.message);
        }
      },

      getAvailability: async (username) => {
        try {
          const response = await axios.get(`/availability/${username}`, {
            headers: {
              Authorization: `Bearer ${authStore.getState().token}`,
              "Content-Type": "application/json",
            },
          });
          set({ availability: response.data.availability });
        } catch (error) {
          console.error("Error fetching availability:", error.message);
        }
      },

      updateAvailability: async (newAvailability) => {
        try {
          const response = await axios.put(
            "/availability",
            { availability: newAvailability },
            {
              headers: {
                Authorization: `Bearer ${authStore.getState().token}`,
                "Content-Type": "application/json",
              },
            }
          );

          set((state) => ({
            ...state,
            availability: response.data.availability || newAvailability,
          }));
        } catch (error) {
          console.error("Error updating availability:", error.message);
        }
      },

      deleteProfile: async () => {
        try {
          await axios.delete("/profile", {
            headers: {
              Authorization: `Bearer ${authStore.getState().token}`,
              "Content-Type": "application/json",
            },
          });
          // Clear all state after deletion
          set({
            username: "",
            gender: "",
            bio: "",
            sports: [],
            email: "",
            city: "",
            tel: "",
            availability: false,
          });
          userInfoStore.persist.clearStorage();
        } catch (error) {
          console.error("Error deleting profile:", error.message);
        }
      },

      clearUserInfo: () => {
        set({
          username: "",
          gender: "",
          bio: "",
          sports: [],
          email: "",
          city: "",
          tel: "",
          availability: false,
        });
      },
    }),
    {
      name: "user-info",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null; // Parse the JSON data if it exists
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value)); // Stringify the value before saving
          return Promise.resolve(); // Return a resolved promise
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
          return Promise.resolve(); // Return a resolved promise
        },
      },
    }
  )
);

export default userInfoStore;
