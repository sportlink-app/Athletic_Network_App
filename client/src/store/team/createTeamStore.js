import axios from "axios";
import { create } from "zustand";
import authStore from "../user/authStore";

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
  },

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

    const hasErrors =
      errors.sportError !== "" || errors.membersCountError !== "";

    return isFieldEmpty || hasErrors;
  },

  createTeam: async () => {
    const { name, sportId, membersCount, description, city, date } =
      get().teamForm;

    try {
      await axios.post(
        "/team",
        {
          name,
          sport_id: sportId,
          members_count: Number(membersCount),
          description,
          city,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      get().clearFields();
    } catch (error) {
      throw new Error("Failed to create team");
    }
  },
}));

export default createTeamStore;
