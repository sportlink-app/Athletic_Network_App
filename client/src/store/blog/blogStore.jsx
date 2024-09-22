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
  totalItems: 0, // Track total items

  setTitle: (title) => set({ title }),
  setSport: (sport) => set({ sport }),
  setContent: (content) => set({ content }),

  clearFields: () => set({ title: "", sport: "", content: "" }),

  getBlogs: async () => {
    const { currentPage, isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true });
    try {
      const response = await axios.get(
        `/blogs?page=${currentPage}&per_page=9`,
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set((state) => ({
        blogs: [...state.blogs, ...response.data.items],
        currentPage: state.currentPage + 1,
        isLoading: false,
        totalItems: response.data.total_items,
      }));
      console.log(response.data.items);
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  createBlog: async () => {
    const { title, sport, content, clearFields } = get();

    try {
      const response = await axios.post(
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

      return response.data;
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
