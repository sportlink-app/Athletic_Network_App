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

      getProfile: async () => {
        try {
          if (!get().username) {
            const response = await axios.get("/profile", {
              headers: {
                Authorization: `Bearer ${authStore.getState().token}`,
                "Content-Type": "application/json",
              },
            });

            set({ ...response.data });
          }
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
          return response.data;
        } catch (error) {
          console.error("Error in getAvailability:", error.message);
          throw error;
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
          set({ availability: response.data.availability });
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

          // Clear state
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

          // Properly clear zustand-persist localStorage
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
          availability: null,
        });
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
