import { create } from "zustand";
import axios from "axios";
import authStore from "./user/authStore";

const blogStore = create((set, get) => ({
  blogForm: {
    title: "",
    sportId: "",
    content: "",
  },
  blogs: [],
  currentPage: 1,
  totalItems: 0,
  topCreators: [],

  setBlogForm: (formData) =>
    set((state) => ({
      blogForm: {
        ...state.blogForm,
        ...formData,
      },
    })),

  clearFields: () =>
    set({
      blogForm: {
        title: "",
        sportId: "",
        content: "",
      },
    }),

  getBlogs: async (reset = false) => {
    const { currentPage } = get();
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
        totalItems: response.data.total_items,
      });
    } catch (error) {
      throw new Error(
        "Failed to get blogs, please refresh the page or try again later"
      );
    }
  },

  userGender: 1,
  userBlogs: [],
  userBlogsCurrentPage: 1,
  userBlogsTotalItems: 0,

  getUserBlogs: async (username, reset = false) => {
    try {
      const response = await axios.get(
        `/blogs/${username}?page=${
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
      throw new Error(
        "Failed to get blogs, please refresh the page or try again later"
      );
    }
  },

  createBlog: async () => {
    const { blogForm, clearFields, getBlogs } = get();
    try {
      await axios.post(
        "/blog",
        {
          title: blogForm.title,
          sport_id: blogForm.sportId,
          content: blogForm.content,
        },
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
      throw new Error(
        "Failed to create blog, please refresh the page or try again later"
      );
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
      throw new Error(
        "Failed to delete blog, please refresh the page or try again later"
      );
    }
  },

  getTopCreators: async () => {
    try {
      const response = await axios.get("/top-creators", {
        headers: {
          Authorization: `Bearer ${authStore.getState().token}`,
          "Content-Type": "application/json",
        },
      });
      set({ topCreators: response.data });
    } catch (error) {
      throw new Error(
        "Failed to fetch top creators, please refresh the page or try again later"
      );
    }
  },
}));

export default blogStore;
