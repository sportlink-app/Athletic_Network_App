import { create } from "zustand";
import axios from "axios";

const sportStore = create((set) => ({
  sports: [],

  getSports: async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/sports");
      set({ sports: response.data });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        throw new Error("Failed to get sports, please try again");
      } else {
        throw new Error("An unexpected error occurred, please try again later");
      }
    }
  },
}));

export default sportStore;
