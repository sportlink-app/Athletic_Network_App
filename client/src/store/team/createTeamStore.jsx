import axios from "axios";
import { create } from "zustand";
import authStore from "../user/authStore";

const createTeamStore = create((set, get) => ({
  teamForm: {
    name: "",
    sport: "",
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
        sport: "",
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

    // Validate members count
    if (
      (name === "membersCount" && parseInt(value, 10) > 22) ||
      parseInt(value, 10) < 2
    ) {
      set({
        errors: {
          ...errors,
          membersCountError: "Members count between 2 and 22",
        },
      });
    } else if (name === "membersCount") {
      set({
        errors: {
          ...errors,
          membersCountError: "",
        },
      });
    }
  },

  handleSearch: (text, sports) => {
    const filteredOptions = sports
      .filter((name) => name.toLowerCase().includes(text.toLowerCase()))
      .map((name) => ({ value: name }));

    // Validate sport input
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
    const { name, sport, membersCount, description, city, date } = teamForm;

    const isFieldEmpty =
      !name || !sport || !membersCount || !description || !city || !date;

    const hasErrors =
      errors.sportError !== "" || errors.membersCountError !== "";

    return isFieldEmpty || hasErrors;
  },

  createTeam: async () => {
    const { name, sport, membersCount, description, city, date } =
      get().teamForm;

    try {
      await axios.post(
        "/team",
        {
          name,
          sport_id: 1,
          members_count: membersCount,
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
      console.log(get().teamForm);

      get().clearFields();
    } catch (error) {
      throw new Error("Failed to create team");
    }
  },
}));

export default createTeamStore;
