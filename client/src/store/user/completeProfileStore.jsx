import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import authStore from "./authStore";

// Minimum bio word count validation
const bioMinWords = 10;
// Phone number validation regex
const telRegex = /^0\d{8,}$/;

const completeProfileStore = create((set, get) => ({
  token: authStore.getState().token || null,

  updateForm: {
    gender: "",
    bio: "",
    sports: [],
    city: "",
    tel: "",
  },

  isFormComplete: () => {
    const { bio, tel, sports, city } = get().updateForm;
    const bioValid = bio.split(/\s+/).length >= bioMinWords; // Check for minimum word count
    const telValid = telRegex.test(tel);
    const sportsValid = sports.length > 0; // Ensure sports is not empty
    const cityValid = city.trim() !== ""; // Ensure city is not empty

    return bioValid && telValid && sportsValid && cityValid;
  },

  updateValidationErrors: () => {
    const { bio, tel, sports, city } = get().updateForm;

    const errors = {
      bio: bio
        ? bio.split(/\s+/).length >= bioMinWords
          ? ""
          : `Bio must be at least ${bioMinWords} words long.`
        : "",
      tel: tel
        ? telRegex.test(tel)
          ? ""
          : "Phone number must start with 0 and contain at least 8 digits."
        : "",
      sports: sports.length > 0 ? "" : "Please select at least one sport.",
      city: city.trim() !== "" ? "" : "City field cannot be empty.",
    };

    return errors;
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      },
    }));
  },

  handleSportsChange: (selectedSports) => {
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        sports: selectedSports,
      },
    }));
  },

  completeProfile: async () => {
    try {
      const { updateForm } = get();

      const response = await axios.post(
        "http://127.0.0.1:5000/complete-profile",
        {
          gender: updateForm.gender,
          bio: updateForm.bio,
          sports: updateForm.sports,
          city: updateForm.city,
          tel: updateForm.tel,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Cookies.set("token", response.data.token, { expires: 7 });

      set({
        updateForm: {
          gender: "",
          bio: "",
          sports: [],
          city: "",
          tel: "",
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("Failed to update your profile");
      } else if (error.response && error.response.status === 500) {
        throw new Error("Update profile failed, please try again");
      } else {
        throw new Error("An unexpected error occurred, please try again later");
      }
    }
  },
}));

export default completeProfileStore;
