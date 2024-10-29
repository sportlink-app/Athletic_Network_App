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
    city: "",
    date: "",
  },
  errors: {
    membersCountError: "",
    sportError: "",
    dateError: "",
  },
  teamId: "",

  setTeamForm: (formData) =>
    set((state) => ({
      teamForm: {
        ...state.teamForm,
        ...formData,
      },
    })),

  clearFields: () =>
    set({
      teamForm: {
        name: "",
        sportId: "",
        membersCount: "",
        description: "",
        city: "",
        date: "",
      },
      errors: {
        membersCountError: "",
        sportError: "",
      },
    }),

  handleInputChange: (name, value) => {
    const setTeamForm = get().setTeamForm;
    const { errors } = get();

    setTeamForm({ [name]: value });

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

    // Validate the date
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
    const { name, sportId, membersCount, description, city, date } = teamForm;

    const isFieldEmpty =
      !name || !sportId || !membersCount || !description || !city || !date;

    // Check if any error messages are set
    const hasErrors =
      errors.sportError || errors.membersCountError || errors.dateError;

    // Button should be disabled if any field is empty or there are errors
    return isFieldEmpty || hasErrors;
  },

  createTeam: async () => {
    const { name, sportId, membersCount, description, city, date } =
      get().teamForm;

    try {
      const response = await axios.post(
        "/team",
        {
          name,
          sport_id: sportId,
          members_count: Number(membersCount),
          description,
          city: city.toLowerCase(),
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );
      set({ teamId: response.data.team_id });

      get().clearFields();
    } catch (error) {
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
