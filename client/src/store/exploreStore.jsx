import { create } from "zustand";

const exploreStore = create((set) => ({
  // ************************** Filter *************************
  // Availability filter
  availabilityList: [
    { key: "1", label: "All" },
    { key: "2", label: "Available" },
    { key: "3", label: "Unavailable" },
  ],
  availabilityFilter: "All",
  setAvailabilityFilter: (value) => set({ availabilityFilter: value }),

  // Sport filter
  sportFilter: "",
  setSportFilter: (value) => set({ sportFilter: value }),

  // Sport filter
  cityFilter: "",
  setCityFilter: (value) => set({ cityFilter: value }),
}));

export default exploreStore;
