import { create } from "zustand";
import axios from "axios";
import authStore from "../user/authStore";

const blogStore = create((set, get) => ({
  title: "",
  sport: "",
  content: "",
  blogs: [],
  currentPage: 1,
  totalItems: 0,
  topCreators: [],

  setTitle: (title) => set({ title }),
  setSport: (sport) => set({ sport }),
  setContent: (content) => set({ content }),

  clearFields: () => set({ title: "", sport: "", content: "" }),

  getBlogs: async (reset = false) => {
    const { currentPage } = get();
    try {
      const response = await axios.get(
        `/blog?page=${reset ? 1 : currentPage}&per_page=9`,
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
        totalItems: response.data.total_items,
      });
    } catch (error) {
      throw new Error("Failed to get blogs");
    }
  },

  userGender: 1,
  userBlogs: [],
  userBlogsCurrentPage: 1,
  userBlogsTotalItems: 0,

  getUserBlogs: async (username, reset = false) => {
    try {
      const response = await axios.get(
        `/blog/${username}?page=${
          reset ? 1 : get().userBlogsCurrentPage
        }&per_page=9`,
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({
        userGender: response.data.gender,
        userBlogs: reset
          ? response.data.items
          : [...get().userBlogs, ...response.data.items],
        userBlogsTotalItems: response.data.total_items,
        userBlogsCurrentPage: reset ? 2 : get().userBlogsCurrentPage + 1,
      });
    } catch (error) {
      throw new Error("Failed to get blogs");
    }
  },

  createBlog: async () => {
    const { title, sport, content, clearFields, getBlogs } = get();
    try {
      await axios.post(
        "/blog",
        { title, sport, content },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
      clearFields();
      await getBlogs(true); // Reset and fetch the latest blogs
    } catch (error) {
      throw new Error("Failed to create blog");
    }
  },

  deleteBlog: async (id) => {
    try {
      await axios.delete(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });

      set((state) => ({
        userBlogs: state.userBlogs.filter((blog) => blog.id !== id),
        // Decrease the total number of items after deletion
        userBlogsTotalItems: state.userBlogsTotalItems - 1,
      }));
    } catch (error) {
      throw new Error("Failed to delete blog");
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
    } catch (error) {
      throw new Error("Failed to fetch top creators");
    }
  },
}));

export default blogStore;
