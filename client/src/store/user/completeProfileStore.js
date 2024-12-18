import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import authStore from "./authStore";

// Minimum bio word count validation
const bioMinWords = 10;
// Phone number validation regex
const telRegex = /^\d{6,}$/;

const completeProfileStore = create((set, get) => ({
  token: authStore.getState().token || null,
  selectedCode: "###",
  setSelectedCode: (code) => {
    set({ selectedCode: code });
  },
  phoneVerified: false,
  updateForm: {
    gender: null,
    bio: "",
    sports: [],
    city: null,
    tel: null,
  },

  isFormComplete: () => {
    const { bio, tel, sports, city, gender } = get().updateForm;

    const bioValid = bio.split(/\s+/).length >= bioMinWords; // Check for minimum word count
    const telValid = tel && telRegex.test(tel); // Check if phone number is valid using regex
    const sportsValid = sports.length > 0; // Ensure sports is not empty
    const cityValid = city !== null; // Ensure city is not empty
    const genderValid = gender !== null; // Ensure gender is selected

    return bioValid && telValid && sportsValid && cityValid && genderValid;
  },

  updateValidationErrors: () => {
    const { bio, tel, sports, city, gender } = get().updateForm;

    const errors = {
      bio: bio
        ? bio.split(/\s+/).length >= bioMinWords
          ? ""
          : `Bio must be at least ${bioMinWords} words long.`
        : "",
      tel: tel
        ? telRegex.test(tel)
          ? ""
          : "Phone number must contain at least 6 digits."
        : "",
      sports: sports.length > 0 ? "" : "Please select at least one sport.",
      city: city !== null ? "" : "City field cannot be empty.",
      gender: gender !== null ? "" : "Gender field cannot be empty.",
    };

    return errors;
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target; // Correctly destructure the value
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value, // Dynamically update the field
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
      const { updateForm, selectedCode } = get();
      console.log(selectedCode + updateForm.tel);

      const response = await axios.post(
        "/complete-profile",
        {
          gender: updateForm.gender,
          bio: updateForm.bio,
          sports: updateForm.sports.map((sport) => sport.id), // Send only the sport IDs
          city: updateForm.city, // Apply the correction here
          tel: selectedCode + updateForm.tel,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Save token in a cookie with expiration of 7 days
      Cookies.set("token", response.data.token, { expires: 7 });

      // Reset updateForm state after profile completion
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
      // Handle different error statuses
      if (error.response && error.response.status === 400) {
        throw new Error("Failed to update your profile");
      } else if (error.response && error.response.status === 500) {
        throw new Error("Update profile failed, please try again");
      } else {
        throw new Error(
          "An unexpected error occurred, please refresh the page or try again later"
        );
      }
    }
  },
}));

export default completeProfileStore;
