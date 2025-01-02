import axios from "axios";
import { create } from "zustand";
import authStore from "../user/authStore";
import dayjs from "dayjs";

const createTeamStore = create((set, get) => ({
  teamForm: {
    name: "",
    sportId: "",
    membersCount: "",
    description: "",
    date: "",
    location: "",
  },
  errors: {
    membersCountError: "",
    sportError: "",
    dateError: "",
  },
  teamId: "",

  setLocation: (location) =>
    set((state) => ({
      teamForm: {
        ...state.teamForm,
        location, // Updates the location field in the form
      },
    })),

  setTeamForm: (formData) =>
    set((state) => ({
      teamForm: {
        ...state.teamForm,
        ...formData, // Updates the team form with new data
      },
    })),

  clearFields: () =>
    set({
      teamForm: {
        // Resets all form fields to their initial values
        name: "",
        sportId: "",
        membersCount: "",
        description: "",
        date: "",
        location: "",
      },
      errors: {
        // Resets all error messages
        membersCountError: "",
        dateError: "",
        sportError: "",
      },
    }),

  handleInputChange: (name, value) => {
    const setTeamForm = get().setTeamForm;
    const { errors } = get();

    setTeamForm({ [name]: value });

    // Validate members count range
    if (name === "membersCount") {
      const membersCount = parseInt(value, 10);
      if (membersCount > 22 || membersCount < 2) {
        set({
          errors: {
            ...errors,
            membersCountError: "Members count must be between 2 and 22",
          },
        });
      } else {
        set({
          errors: {
            ...errors,
            membersCountError: "",
          },
        });
      }
    }

    // Validate date to ensure it's not in the past
    if (name === "date") {
      const selectedDate = dayjs(value);
      if (selectedDate.isBefore(dayjs(), "day")) {
        set({
          errors: {
            ...errors,
            dateError: "Date must not be in the past.",
          },
        });
      } else {
        set({
          errors: {
            ...errors,
            dateError: "",
          },
        });
      }
    }
  },

  handleSearch: (text, sports) => {
    const filteredOptions = sports
      .filter((sport) => sport.name.toLowerCase().includes(text.toLowerCase()))
      .map((sport) => ({ value: sport.name, id: sport.id }));

    // Show error if no valid sport found
    if (!filteredOptions.length) {
      set({
        errors: {
          ...get().errors,
          sportError: "Please select a valid sport from the list.",
        },
      });
    } else {
      set({
        errors: {
          ...get().errors,
          sportError: "",
        },
      });
    }

    return filteredOptions;
  },

  isFormInvalid: () => {
    const { teamForm, errors } = get();
    const { name, sportId, membersCount, description, date, location } =
      teamForm;

    // Check if any field is empty or has errors
    const isFieldEmpty =
      !name || !sportId || !membersCount || !description || !date || !location;

    // Return true if the form is invalid (either empty or errors present)
    const hasErrors =
      errors.sportError || errors.membersCountError || errors.dateError;

    return isFieldEmpty || hasErrors;
  },

  createTeam: async () => {
    const { name, sportId, membersCount, description, date, location } =
      get().teamForm;

    try {
      // Create team via API call
      const response = await axios.post(
        "/team",
        {
          name,
          sport_id: sportId,
          members_count: Number(membersCount),
          description,
          date,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`, // Pass token for auth
            "Content-Type": "application/json", // Specify content type for the request
          },
        }
      );
      set({ teamId: response.data.team_id }); // Save the team ID in state

      get().clearFields(); // Clear the form fields after successful submission
    } catch (error) {
      // Handle different error responses from the API
      if (error.response && error.response.status === 404) {
        throw new Error("Team name already exists");
      } else if (error.response && error.response.status === 400) {
        throw new Error("Description is too long, max 500 characters allowed");
      } else {
        throw new Error(
          "Failed to create team, please refresh the page or try again later"
        );
      }
    }
  },
}));

export default createTeamStore;
