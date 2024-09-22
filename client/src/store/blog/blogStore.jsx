import { create } from "zustand";
import axios from "axios";
import authStore from "../user/authStore";

const blogStore = create((set, get) => ({
  title: "",
  sport: "",
  content: "",
  blogs: [],
  topCreators: [],
  currentPage: 1,
  isLoading: false,
  totalItems: 0,

  setTitle: (title) => set({ title }),
  setSport: (sport) => set({ sport }),
  setContent: (content) => set({ content }),

  clearFields: () => set({ title: "", sport: "", content: "" }),

  getBlogs: async (reset = false) => {
    const { currentPage, isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true });
    try {
      const response = await axios.get(
        `/blogs?page=${reset ? 1 : currentPage}&per_page=9`,
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({
        blogs: reset
          ? response.data.items
          : [...get().blogs, ...response.data.items],
        currentPage: reset ? 2 : currentPage + 1,
        isLoading: false,
        totalItems: response.data.total_items,
      });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  createBlog: async () => {
    const { title, sport, content, clearFields, getBlogs } = get();

    try {
      await axios.post(
        "/blogs",
        { title, sport, content },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      clearFields();

      // Fetch the updated blog list after creating a blog
      await getBlogs(true); // Reset and fetch the latest blogs
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create blog");
    }
  },

  getTopCreators: async () => {
    try {
      const response = await axios.get("/top_creators", {
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
