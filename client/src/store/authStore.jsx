import { create } from "zustand";
// import axios from "axios";
// import Cookies from "js-cookie";

const authStore = create((set) => ({
  isAuthenticated: true,
}));

export default authStore;
