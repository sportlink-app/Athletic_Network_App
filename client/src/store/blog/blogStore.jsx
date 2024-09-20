import { create } from "zustand";
import axios from "axios";
import authStore from "../user/authStore";

const blogStore = create((set, get) => ({
  title: "",
  sport: "",
  content: "",
  blogs: [],
  topCreators: [],

  setTitle: (title) => set({ title }),
  setSport: (sport) => set({ sport }),
  setContent: (content) => set({ content }),

  clearFields: () => set({ title: "", sport: "", content: "" }),

  createBlog: async () => {
    const { title, sport, content, clearFields } = get();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/blogs",
        { title, sport, content },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      clearFields(); // Clear fields after creating
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create blog");
    }
  },

  getBlogs: async (page = 1, perPage = 9) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/blogs?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({ blogs: response.data.items });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch blogs");
    }
  },

  getTopCreators: async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/top_creators", {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });
      set({ topCreators: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch top creators");
    }
  },
}));

export default blogStore;
