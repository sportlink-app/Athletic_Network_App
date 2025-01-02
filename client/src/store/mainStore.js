import { create } from "zustand";
const mainStore = create((set) => ({
  // navbar toggle
  isNavbarOpen: false,
  setIsNavbarOpen: () => {
    const { isNavbarOpen } = mainStore.getState();
    set({ isNavbarOpen: !isNavbarOpen });
  },
  closeNavbar: () => {
    const { isNavbarOpen } = mainStore.getState();
    isNavbarOpen ? set({ isNavbarOpen: false }) : "";
  },
}));

export default mainStore;
