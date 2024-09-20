import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import authStore from "./authStore";

const userInfoStore = create(
  persist(
    (set, get) => ({
      username: "",
      gender: "",
      bio: "",
      sports: [],
      email: "",
      city: "",
      tel: "",
      availability: null,

      // Fetch user profile
      getProfile: async () => {
        try {
          if (!get().username) {
            const response = await axios.get("http://127.0.0.1:5000/profile", {
              headers: {
                Authorization: `Bearer ${authStore.getState().token}`,
                "Content-Type": "application/json",
              },
            });

            const { username, gender, bio, sports, email, city, tel } =
              response.data;
            set({ username, gender, bio, sports, email, city, tel });
          }
        } catch (error) {
          console.error("Error in getProfile:", error.message);
          throw error;
        }
      },

      // Fetch user availability
      getAvailability: async (username) => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/availability/${username}`,
            {
              headers: {
                Authorization: `Bearer ${authStore.getState().token}`,
                "Content-Type": "application/json",
              },
            }
          );

          set({ availability: response.data.availability });
          return response.data;
        } catch (error) {
          console.error("Error in getAvailability:", error.message);
          throw error;
        }
      },

      // Update availability
      updateAvailability: async (newAvailability) => {
        try {
          const response = await axios.put(
            "http://127.0.0.1:5000/availability",
            { availability: newAvailability },
            {
              headers: {
                Authorization: `Bearer ${authStore.getState().token}`,
                "Content-Type": "application/json",
              },
            }
          );

          set({ availability: response.data.availability });
        } catch (error) {
          console.error("Error updating availability:", error.message);
          throw error;
        }
      },

      // Method to delete user profile
      deleteProfile: async () => {
        try {
          await axios.delete("http://127.0.0.1:5000/profile", {
            headers: {
              Authorization: `Bearer ${authStore.getState().token}`,
              "Content-Type": "application/json",
            },
          });

          // Clear user data after successful deletion
          set({
            username: "",
            gender: "",
            bio: "",
            sports: [],
            email: "",
            city: "",
            tel: "",
            availability: null,
          });

          // Remove from localStorage
          localStorage.removeItem("user-info");

          console.log("Profile deleted successfully");
        } catch (error) {
          console.error("Error deleting profile:", error.message);
          throw error;
        }
      },

      // Clear user info on logout or profile deletion
      clearUserInfo: () => {
        set({
          username: "",
          gender: "",
          bio: "",
          sports: [],
          email: "",
          city: "",
          tel: "",
          availability: null,
        });

        // Clear the localStorage entry for user-info
        localStorage.removeItem("user-info");
      },
    }),
    {
      name: "user-info",
      getStorage: () => localStorage,
    }
  )
);

export default userInfoStore;
