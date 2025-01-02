import { create } from "zustand";
import axios from "axios";

const sportStore = create((set) => ({
  sports: [], // State to store sports data

  getSports: async () => {
    try {
      const response = await axios.get("/sports"); // Fetch sports data from API
      set({ sports: response.data }); // Update the state with the fetched data

      return response.data; // Return the fetched data
    } catch (error) {
      if (error.response && error.response.status === 500) {
        throw new Error(
          "Failed to get sports, please refresh the page or try again later"
        ); // Specific error message for server issues
      } else {
        throw new Error(
          "An unexpected error occurred, please try again later "
        ); // General error message for other errors
      }
    }
  },
}));

export default sportStore;
